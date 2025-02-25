## DADS: A Database of Arithmetical Dynamic Systems
DADS is a web application designed for researchers to access information about a vast array of arithmetical dynamical systems that would otherwise take a long time to compute independently. This project was developed by the SLU Capstone Project team under Open Source with SLU in collaboration with Dr. Benjamin Hutz, a professor of mathematics and statistics at Saint Louis University.

### Features
* Home Page: A description of the application and a link to the GitHub repository.
* Explore Systems Page: Allows users to filter and query through the database for various properties like automorphism group cardinality and degree. The results are displayed in a paginated data table with a statistics summary to the right which shows metrics about the returned systems, such as average height.
* System Details Page: Each system in the paginated table has a label which can be selected to show a page with additional information about the system.

### Tech Stack
* Frontend: React
* Backend: Python
* Database: PostgreSQL

### Getting Started
For detailed instruction on how to setup the application on your local machine, please refer to the [installation guide](Installation_Guide.md).

### Contributing
We welcome contributions from the community. Please refer to the Contributing Guide for more information.
https://github.com/oss-slu/dads/blob/main/Contributing_Guide.txt

### Key Files

#### Backend - 
- <code>postgres_connector.py</code>- Contains methods to select systems and build SQL query text
- <code>server.py</code> - Contains Flask server initialization and API routes

#### Frontend - 
- <code>ExploreSystems.js</code> - This page allows users to filter and search through the dynamical systems database using various properties.
- <code>SystemDetails.js</code> - Displays detailed information about a specific system when selected from the results in the Explore Systems page, uses component tables and data passed from postgres_connector
- <code>AboutPage.js</code> - Contains static information about the site
- <code>newDataTable.js</code> - Renders a dynamic table that displays systems based on the search and filter criteria, complete with pagination functionality.
- <code>Topbar.js</code> - Contains navigation logic for the site 

### License
This project is licensed under the terms of the MIT license.

### Contact
For any queries, please contact the SLU Capstone Project team or Dr. Hutz at Saint Louis University.
