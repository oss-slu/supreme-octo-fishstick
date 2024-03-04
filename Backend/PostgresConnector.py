import psycopg2
import os

# important do not store password when dealing with real database
# might want to consider SQL injection down the line
# might want to use database entry ID instead of label for identifying specific systems

# gets all systems from the database

class PostgresConnector:

    def __init__(self):

        self.connection = psycopg2.connect(
                host= os.environ.get("DB_HOST_FOR_BACKEND", "localhost"), #"localhost", #"db",
                dbname= os.environ.get("POSTGRES_DB", "dad"), #"dad",
                user= os.environ.get("POSTGRES_USER", "dad_user"), #"dad_user",
                password= os.environ.get("POSTGRES_PASSWORD", "dad_pass"), #"dad_pass",
                port = os.environ.get("DB_PORT_FOR_BACKEND", 5432), #"5432")
        )
    
    def getAllSystems(self):
        columns = '*'
        sql = "SELECT " + columns + " FROM functions_dim_1_NF"
        try:
            with self.connection.cursor() as cur:
                cur.execute(sql)
                result = cur.fetchall()
        except Exception as e:
            self.connection.rollback()
            result = None
        finally:
            if cur:
                cur.close()
            return result

    # gets a system identified by its label, input is string
    def getSystem(self,label):
        columns = '*'
        sql = "SELECT " + columns + " FROM functions_dim_1_NF WHERE label = '" + label + "'"
        try:
            with self.connection.cursor() as cur:
                cur.execute(sql)
                result = cur.fetchall()
        except Exception as e:
            result = None
            self.connection.rollback()
        return result

    # gets systems that match the passed in filters, input should be json object
    def getFilteredSystems(self,filters):
        # return a list of strings of the form:
        #    label, dimension, degree, polynomials, field_label

        columns = 'label, degree, (original_model).coeffs, base_field_label'
        dims = filters['N']
        del filters['N']
        whereText = self.buildWhereText(filters)
        cur = None
        try:
            stats= self.getStatistics(whereText)
            result = []
            if dims == [] or 1 in dims:
                sql = "SELECT " + columns + " FROM functions_dim_1_NF" + whereText
                with self.connection.cursor() as cur:
                    cur.execute(sql)
                    # TODO: limit the total number that can be returned
                    mon_dict = {}
                    for row in cur:
                        d = int(row[1])
                        if d in mon_dict.keys():
                            mon = mon_dict[d]
                        else:
                            #create the monomial list
                            mon = []
                            for i in range(d+1):
                                if i == 0:
                                    mon.append('x^'+str(d))
                                elif i == d:
                                    mon.append('y^'+str(d))
                                else:
                                    if (d-i) == 1 and i == 1:
                                        mon.append('xy')
                                    elif i ==1:
                                        mon.append('x^'+str(d-i) + 'y')
                                    elif (d-i) == 1:
                                        mon.append('x' + 'y^' + str(i))
                                    else:
                                        mon.append('x^'+str(d-i) + 'y^'+str(i))
                            mon_dict[d] = mon
                        poly = '['
                        c = row[2]
                        for j in range(2):
                            first_term = True
                            for i in range(d+1):
                                if c[j][i] != '0':
                                    if c[j][i][0] != '-' and not first_term:
                                        poly += '+'
                                    if c[j][i] == '1':
                                        poly += mon[i]
                                    elif c[j][i] == '-1':
                                        poly += '-'+ mon[i]
                                    else:
                                        poly += c[j][i] + mon[i]
                                    first_term = False
                            if j == 0:
                                poly += ' : '
                        poly += ']'
                        result.append([row[0], '1', row[1], poly, row[3]])
                    
        except Exception as e:
            self.connection.rollback()
            result = []
            stats = []
            
        finally:
            if(cur):
                cur.close()
        return result,stats

    # gets a subset of the systems identified by the labels, input should be json list
    def getSelectedSystems(self,labels):
        labels = "(" + ", ".join(["'" + str(item) + "'" for item in labels]) + ")"
        columns = '*'
        sql = "SELECT " + columns + " FROM functions_dim_1_NF WHERE label in " + labels
        try:
            with self.connection.cursor() as cur:
                cur.execute(sql)
                result = cur.fetchall()
        except:
            self.connection.rollback()
            result = None
        finally:
            return result
    
    def getStatistics(self,whereText):
        # whereText = self.buildWhereText(filters)
        #number of maps
        cur = None
        try:
            with self.connection.cursor() as cur:
                sql = "SELECT COUNT( (original_model).height ) FROM functions_dim_1_NF" + whereText 
                cur.execute(sql)
                maps = cur.fetchall()
                #AUT
                sql = "SELECT AVG(automorphism_group_cardinality::int) FROM functions_dim_1_NF" + whereText 
                cur.execute(sql)
                aut = cur.fetchall()
                #number of PCF
                sql = "SELECT SUM(is_PCF::int) FROM functions_dim_1_NF" + whereText 
                cur.execute(sql)
                pcf = cur.fetchall()
                #Average Height
                sql = "SELECT AVG( (original_model).height ) FROM functions_dim_1_NF" + whereText 
                cur.execute(sql)
                height = cur.fetchall()
                #Average Resultant
                #sql = "SELECT AVG( (original_model).resultant ) FROM functions_dim_1_NF" + whereText 
                #cur.execute(sql)
                resultant = 0 #cur.fetchall()
        except Exception as e:
            self.connection.rollback()
            maps = 0
            aut = 0
            pcf = 0
            height = 0
            resultant = 0
        finally:
            return [maps, aut, pcf, height, resultant]

    def buildWhereText(self, filters):
        # remove empty filters
        #remove ILD because not currently in use
        for filter in filters.copy():
            if not filters[filter] or filters[filter] == [] or (filter =='indeterminacy_locus_dimension' and filters[filter] == "1"):
                del filters[filter]

        if len(filters) == 0:
            return ""

        filterText = " WHERE "
        conditions = []

        for filter, values in filters.items():
            if filter in ['indeterminacy_locus_dimension']:
                    conditions.append("CAST(" + filter + " AS integer) IN (" + values + ")")

            elif filter in ['base_field_degree', 'automorphism_group_cardinality']:
                conditions.append("CAST(" + filter + " AS integer) IN (" + values + ")")

            elif filter in ['base_field_label']:
                conditions.append(filter + " LIKE '%" + values + "%'")

            else:
                conditions.append(filter + " IN (" + ', '.join(str(e) for e in values) + ")")

        filterText += " AND ".join(conditions)
        return filterText
