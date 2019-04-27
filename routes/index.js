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
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});




router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});


router.get('/recommendations/:movie', function(req, res){
 
  var movie = req.params.movie;
  var query = "select distinct genre from genres g where g.movie_id=? ";
  connection.query(query, movie, function(err, rows){
    if(err){
      console.log(err);
    }
    else{
      console.log(rows.length);
      var lim = Math.floor(10 / Math.min(rows.length, 10)); 
      var rem = 10 - lim * rows.length;
       var result=[];
       var size = rows.length;
       
      for (var i = 0; i < Math.min(rows.length, 10); i++) {
       if(i == rows.length - 1){
          lim = rem + lim;
       }
       var list=[movie, rows[i].genre, lim];
       console.log(list);
        var query2 = "select title, genre from movies m, genres g where m.id=g.movie_id and m.id <> ? and g.genre = ? order by rand() limit ?";
        connection.query(query2, list, function(err, rows2, fields) {
               if (err) {
                 console.log( err );
               }
                 for(var x in rows2){
                  result.push(rows2[x]);
                 }
                 //push query output to this variable
                 if(0 === --size){
                    res.json(result);
                 }               
           });
      }   

    }

  });

});

router.get('/dashboard/:school', function(req, res){
  var school = req.params.school;
  var query = 'SELECT from University';
  connection.query(query, function(err, rows) {
    console.log("rows="+rows+"!!!");
    if (err) console.log(err);
    else {
      res.json(rows);
     
      }
  });
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
