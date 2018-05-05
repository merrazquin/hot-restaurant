// constants for requirements
const express = require("express"), 
      bodyParser = require("body-parser"), 
      path = require("path");

var app = express();
var PORT = 3700;
      
// Sets up the Express app to handle data parsing
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
// Data 
    var tables = [
      {
        table_key_ID: 1,
        name: "testuser1",
        email: "donotreply@gmail.com",
        phone: "123-45-123",
        uniqueID: "me"
      },
      {
        table_key_ID: 2,
        name: "testuser2",
        email: "donotreply@gmail.com",
        phone: "789-12-2365",
        uniqueID: "ccccc"
      },
      {
        table_key_ID: 3,
        name: "testuser3",
        phone: "dontreply@gmail.com",
        phone: "553-45-6989",
        uniqueID: "fhdfhdjd"
      }
    ];



// Route Handling to send users to the Various Pages
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  


  // Displays all tables on the api/tables page
  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });
  


  // Displays a single selected table, or returns false
  app.get("/api/tables/:table", function(req, res) {
    var selectedTable = req.params.table_key_ID;
  
    console.log(selectedTable);
  
    for (var i = 0; i < table.length; i++) {
      if (selectedTable === table[i].routeName) {
        return res.json(table[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Tables - takes in JSON input
  app.post("/api/tables", function(req, res) {

    var newtable = req.body;

    console.log(newtable);
  
    tables.push(newtable);
  
    res.json(newtable);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });