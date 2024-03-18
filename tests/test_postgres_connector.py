"""
Module Dockstring
tests postgres_connector
"""
from postgres_connector import postgres_connector
from unittest.mock import MagicMock, patch

@patch("psycopg2.connect")
def test_get_all_systems(mock_connect):
    mock_conn = mock_connect.return_value
    mock_cur = MagicMock()
    mock_conn.cursor.return_value = mock_cur
    mock_cur.fetchall.return_value = [("System1",), ("System2",)]

    connector = postgres_connector()
    result = connector.get_all_systems()

    mock_cur.execute.assert_called_once_with("SELECT * FROM public.data")
    assert len(result) == 2
    assert result[0][0] == "System1"
    assert result[1][0] == "System2"

@patch("psycopg2.connect")
def test_get_system(mock_connect):
    mock_conn = mock_connect.return_value
    mock_cur = MagicMock()
    mock_conn.cursor.return_value = mock_cur
    mock_cur.fetchall.return_value = [("SpecificSystem",)]

    connector = postgres_connector()
    result = connector.get_system("SpecificLabel")

    mock_cur.execute.assert_called_once_with(
        "SELECT * FROM public.data WHERE label = 'SpecificLabel'"
        )
    assert len(result) == 1
    assert result[0][0] == "SpecificSystem"

@patch("psycopg2.connect")
def test_get_selected_systems(mock_connect):
    mock_conn = mock_connect.return_value
    mock_cur = MagicMock()
    mock_conn.cursor.return_value = mock_cur
    mock_cur.fetchall.return_value = (
        [("SelectedSystem1",), ("SelectedSystem2",)]
    )

    connector = postgres_connector()
    labels = ["Label1", "Label2"]
    result = connector.get_selected_systems(labels)

    labels_str = "('Label1', 'Label2')"
    mock_cur.execute.assert_called_once_with(
        f"SELECT * FROM public.data WHERE label in {labels_str}"
        )
    assert len(result) == 2
    assert result[0][0] == "SelectedSystem1"
    assert result[1][0] == "SelectedSystem2"

@patch("psycopg2.connect")
def test_get_statistics(mock_connect):
    mock_conn = mock_connect.return_value
    mock_cur = MagicMock()
    mock_conn.cursor.return_value = mock_cur
    mock_cur.fetchall.side_effect = [
        [(10,)],  # Maps
        [(2.5,)],  # AUT
        [(5,)],  # PCF
        [(3.0,)],  # Average Height
        [(100,)]  # Average Resultant
    ]

    connector = postgres_connector()
    filters = {"degree": [2], "N": [4]}
    result = connector.get_statistics(filters)

    assert len(result) == 5
    assert result[0][0][0] == 10  # Maps count
    assert result[1][0][0] == 2.5  # AUT
    assert result[2][0][0] == 5  # PCF
    assert result[3][0][0] == 3.0  # Average Height
    # assert result[4][0][0] == 100  # Average Resultant

@patch("psycopg2.connect")
def test_build_where_text():
    connector = postgres_connector()

    filters = {
        "dimension": [2],
        "degree": [3, 4],
        "is_polynomial": [True],
        "is_Lattes": [],
        "is_Chebyshev": [False],
        "is_Newton": [True],
        "is_pcf": [True],
        "customDegree": "",
        "customDimension": "",
        "automorphism_group_cardinality": "5",
        "base_field_label": "",
        "base_field_degree": "2",
        "indeterminacy_locus_dimension": ""
    }

    where_clause = connector.build_where_text(filters)
    expected_clause = (
        " WHERE dimension IN (2) AND degree IN (3, 4) AND is_polynomial"
        " IN (True) AND is_Chebyshev IN (False) AND is_Newton IN (True) "
        "AND is_pcf IN (True) AND CAST(automorphism_group_cardinality AS "
        "integer) IN (5) AND CAST(base_field_degree AS integer) IN (2)"
    )
    assert where_clause == expected_clause
