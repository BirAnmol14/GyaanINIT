# GyaanINIT
An app to make online education seamless and comprehensive with content sharing and video calling features.

## Updates:
- Automate_BBB_download_All directory has the script to download all files from BBB server at once
- server directory has logic.py file that is a script which can be triggered by the GyaanInit / ChatShalla server (currently can be tested by going to /api/record/)
(convert it to a function and call it when BBB send the URL)
- Recordings folder for the BBB recordings, these files can be downloaded by the client by visiting /api/download/:filename

**Client**: Runs the REACT app and sends call to backend server
- To run client, cd into client folder and run npm install
- Run npm start to run the client on localhost:3000

**Server:** Manages database, API calls and responds to client requests
- To run server cd into server folder and run npm install
- Create .env file and type PORT=8080, hit Enter/Return type REACT_URL='http://localhost:3000' hit Enter/Return and save the file (You can use any other ports also)
- Read sercets_example.js and follow the instructions mentioned
- Documentation.txt has been made available to give an idea about the api functioning
- Run node app.js to run this server on localhost:8080
- You can "npm install nodemon" to run a development server and following this you can use nodmeon app.js instead of node app.js

**To run the complete application, run both i.e. the server followed by the client on your pc.**

Currently the app is just a mere idea of 4 enthusiastic BITS undergrads who are ready to challenge COVID-19 pandemic with a new way to incorporate online education in our lives and spreading knowledge.  
