// constants for requirements
const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  app = express(),
  PORT = 3700

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/styles', express.static('styles'))

// -------------------- CONNECTION TO DATA FILES -------------------------
// Requires the data / waitlist and current reservations files
var tableData = require('./data/current-reservations.js')
var waitData = require('./data/wait-list.js')

// Gets data from the two data js files "current-reservations" and "wait-list"
// returns "Invalid endpoint if something other than tables or waitlist is passed after /api/"
app.get('/api/:endpoint', (req, res) => {
  switch (req.params.endpoint) {
    case 'tables':
      return res.json(tableData)
    case 'waitlist':
      return res.json(waitData)
    default:
      return res.send('Invalid endpoint')
  }
})

// handle all routes in one call
// anything that's not reserve or tables will be sent to home
app.get("*", (req, res) => {
  let pageName = ''
  switch (req.url) {
    case '/reserve':
    case '/tables':
      pageName = req.url + '.html'
      break
    default:
      pageName = 'home.html'
  }
  res.sendFile(path.join(__dirname, pageName))
})

// Displays a single selected table, or returns false
app.get("/api/tables/:uniqueID", function (req, res) {
  // try to find the passed in uniqueID in either tableData or waitData (concatenated together)
  var selectedTable = tableData.concat(waitData).find(table => table.uniqueID == req.params.uniqueID)

  // if selectedTable is found, send that, otherwise, send false
  res.json(selectedTable || false)
})

// Posts data to either the waitlist or the current resverations, depending on amount of tables available in current reservations
app.post('/api/tables', function (req, res) {

  // Sends to the current table list if there is space
  if (tableData.length < 5) {
    tableData.push(req.body)
    res.json(true)
  }
  // or sends to the wait list if there isn't any space
  else {
    waitData.push(req.body)
    res.json(false)
  }

})

// Functionality to empty out the existing table data    
app.post('/api/clear', function (req, res) {
  tableData = []
  waitData = []
  res.end()
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT)
})