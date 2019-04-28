var express = require('express');

// connect mongoose
//mongoose.connect("mongodb+srv://Janice:123abc@cluster0-eendv.mongodb.net/test?retryWrites=true");


var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'fling.seas.upenn.edu',
  user: 'kengpian',
  password: '550project!',
  database: 'test'
});


// Connect string to MySQL

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));

});


router.get('/results', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'results.html'));
});

router.get('/uprofile', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'uprofile.html'));
});


router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});


// oracle version
/*
var oracledb = require('oracledb');


router.get('/dashboard/:school', function(req, res){
  var school = req.params.school;
  console.log("school="+school+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // var query = "SELECT A1.chronname as name, website, control, yearlevel, LH.tuition as tuition, LH.city as city, avg_housing_rate from (SELECT chronname, unitid, yearlevel, control, website FROM university WHERE chronname = '%"+ school +"%' as A1, awards_tuition AT, (SELECT * from location L , housing H where L.city = H.city and L.statename = H.statename) as LH where A1.unitid = AT.unitid and A1.unitid = LH.unitid;";
  // connection.query(query, function(err, rows) {
  //   console.log("rows="+rows+"!!!");
  //   if (err) console.log(err);
  //   else {
  //        res.json(rows);
     
  //     }
  // });

  oracledb.getConnection(
 {
  user: 'kengpian',
  password: 'project550',
  connectString: 'cis550project.czgstkqm3tfs.us-east-2.rds.amazonaws.com:1521/PENNTR'
 },
 
 function(err, connection)
 {
   if (err) { console.error(err); return; }
   console.log("Connected!!!!!!!!!!!!!!!!");
   connection.execute(
     "select * from (select unitid, chronname, website, control from university where UPPER(chronname) like UPPER('%"+school+"%')) A natural join location L;",
     function(err, result)
     {
       if (err) { console.error(err); return; }
       console.log(result);
       res.json(result);
      
     });
 }
 );
});
*/

router.get('/dashboard/:school', function(req, res){
  res.json({
        result: 'success'
      });
})

router.get('/results/:school', function(req, res){
  var school = req.params.school;
  console.log("school="+school+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  var query =  "select * from (select unitid, chronname, website, control from university where UPPER(chronname) like UPPER('%"+school+"%')) A natural join location L;";
  connection.query(query, function(err, rows) {
    console.log("rows="+rows+"!!!");
    if (err) console.log(err);
    else {
         res.json(rows);
     
      }
  });
});












// To add a new page, use the templete below






// // template for GET requests
// /*
// router.get('/routeName/:customParameter', function(req, res) {

//   var myData = req.params.customParameter;    // if you have a custom parameter
//   var query = '';

//   // console.log(query);

//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }
//   });
// });
// */


module.exports = router;
