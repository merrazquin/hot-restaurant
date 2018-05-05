// constants for requirements
const express = require("express"),
      bodyParser = require("body-parser"),
      path = require("path"),
      app = express(),
      PORT = 3700;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/styles', express.static('styles'))

// -------------------- CONNECTION TO DATA FILES -------------------------
// Requires the data / waitlist and current reservations files
var tableData = require('./data/current-reservations.js');
var waitData = require('./data/wait-list.js');

// Gets data from the two data js files "current-reservations" and "wait-list"
app.get('/api/tables', function (req, res) {
  res.json(tableData);
});
app.get('/api/waitlist', function (req, res) {
  res.json(waitData);
});

// Posts data to either the waitlist or the current resverations, depending on amount of tables available in current reservations
app.post('/api/tables', function (req, res) {

  // Sends to the current table list if there is space
  if (tableData.length < 5) {
    tableData.push(req.body);
    res.json(true);
  }
  // or sends to the wait list if there isn't any space
  else {
    waitData.push(req.body);
    res.json(false);
  }

});


// Functionality to empty out the existing table data    
app.post('/api/clear', function (req, res) {
  tableData = [];
  waitData = [];
  console.log("Data Cleared: "+tableData);
  res.end();
})


// Route Handling to send users to the Various Pages
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});


// Displays a single selected table, or returns false
app.get("/api/tables/:table", function (req, res) {
  var selectedTable = req.params.uniqueID;

  console.log(selectedTable);

  for (var i = 0; i < table.length; i++) {
    if (selectedTable === table[i].uniqueID) {
      return res.json(table[i]);
    }
  }

  return res.json(false);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});