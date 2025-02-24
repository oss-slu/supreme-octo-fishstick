/*
This page is responsible for providing additional details about a system.
To access it through the UI, click the red ID of a System.
It fetches the data from the backend and displays it in a table format.
In ExploreSystems, the current pagination and filter state is saved when navigating to this page.
Future work: adding a diagram of the System to the page.
*/

import { get_system } from '../api/routes';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import InfoTable from '../components/FunctionDetail/InfoTable';
import RationalPointsTable from '../components/FunctionDetail/RationalPointsTable';
import CriticalPointsTable from '../components/FunctionDetail/CriticalPointsTable';
import CriticalPointPortraitTable from '../components/FunctionDetail/CriticalPointPortraitTable';
import ModelsTable from '../components/FunctionDetail/ModelsTable';
import CitationsTable from '../components/FunctionDetail/CitationsTable';
import AutomorphismGroupTable from '../components/FunctionDetail/AutomorphismGroupTable';
import FunctionAttributes from '../components/FunctionDetail/FunctionAttributes';
import RationalTwistsTable from '../components/FunctionDetail/RationalTwistsTable';

function SystemDetails() {
    const [data, setData] = useState({});
    const label = useParams().label;

    useEffect(() => {
        fetchDataForCSV();
    }, []);

    const fetchDataForCSV = async () => {
        try {
            const result = await get_system({ id: label });
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="info-container">
                <div className="row">
                    <InfoTable data={data} />
                </div>
                <div className="row">
                    <FunctionAttributes data={data} />
                </div>
                <div className="row">
                    <div className="col">
                        <RationalPointsTable data={data} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <RationalTwistsTable />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CriticalPointsTable data={data} />
                    </div>
                    <div className="col">
                        <CriticalPointPortraitTable data={data} />
                    </div>
                </div>
                <div className="row">
                    <ModelsTable data={data} />
                </div>
                <div className="row">
                    <AutomorphismGroupTable data={data} />
                </div>
                <div className="row">
                    <CitationsTable data={data} />
                </div>
            </div>
        </div>
    );
}

export default SystemDetails;