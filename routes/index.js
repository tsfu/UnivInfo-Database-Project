 var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('oracledb');



var connection = oracledb.createConnection({
  host: 'ENTER HOST HERE',
  user: 'ENTER USER HERE',
  password: 'ENTER PSW HERE',
  database: 'ENTER DB NAME HERE'
});


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'template.html'));
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/



// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
