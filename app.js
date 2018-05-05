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
    // Table Array: Table_Num, Name, Email, Phone, UniqueID




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
    var selectedTable = req.params.table;
  
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
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newtable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newtable
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newtable.routeName = table.name.replace(/\s+/g, "").toLowerCase();

    console.log(newtable);
  
    tabless.push(newtable);
  
    res.json(newtable);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });