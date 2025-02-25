# Installation Guide for DADS: A Database of Arithmetical Dynamic Systems


## Prerequisites:

Before installing the DADS application, you need to ensure your system has the following software installed:


**Python** - The backend of our application is developed using Python. Download and install the latest version of Python from Python Official Website.
https://www.python.org/downloads/

**Node.js and NPM** - The frontend of our application is built with React, which requires Node.js and npm for dependency management and to run the application locally. 
Download and install Node.js from Node.js Official Website. Installing Node.js will also install npm automatically.
https://nodejs.org/en/download/current

**PostgreSQL** - Our application uses PostgreSQL for the database. Download and install PostgreSQL from PostgreSQL Official Website.
https://www.postgresql.org/download/

**Beekeeper Studio** - For managing the database and making SQL queries, we recommend Beekeeper Studio. Download and install Beekeeper Studio from Beekeeper Studio Official Website.
https://www.beekeeperstudio.io/get


## Installation Steps

**Database Configuration** - 

Use Beekeeper Studio to connect to your PostgreSQL database using the connection parameters provided in the README file.

Clone the Repository using <code>git clone https://github.com/oss-slu/dads.git</code>
Navigate to the repository using <code>cd dads</code>

In the <code>Backend</code> folder, you need to create a <code>database.ini</code> file with a section called <code>[postgresql_local]</code> that contains the connection information to connect to the database (remote or your own local copy).

**Setup the Backend** - 

Navigate to the Backend directory using <code>cd Backend</code>
Install the necessary Python dependencies by running <code>pip install -r requirements.txt</code>

**Setup the Frontend** - 

Navigate to the Frontend directory using <code>cd Frontend</code>
Install necessary node modules by running <code>npm install</code>
- Note: You may need to run <code>npm install --force</code> for the command to work properly.


**Running the Application** - 

Start the backend server by navigating to the backend folder (<code>cd Backend</code>) and running <code>python server.py</code>  

In a separate terminal, navigate to the frontend folder (<code>cd Frontend</code>) and run <code>npm start</code>

The application should now be running on localhost with the frontend accessible via your web browser.
