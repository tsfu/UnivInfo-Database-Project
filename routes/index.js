var express = require('express');
var now = require("performance-now");
var fs = require('fs');
// var mongoose = require('mongoose');

// var mongoUtil = require( './routes/mongoUtil' );
// var db = mongoUtil.getDb();

// console.log(db.collection('Major').find());// // connect mongoose
// mongoose.connect("mongodb+srv://Janice:123abc@cluster0-eendv.mongodb.net/test?retryWrites=true");

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://550:JK123@cluster0-eendv.mongodb.net/test?retryWrites=true";
 
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("550Project");
   
//     // var data = dbo.collection("Major").find({"UNITID":100654});
//     // console.log("mongo data:" + data);

// });
const client = new MongoClient(uri, { useNewUrlParser: true });


var router = express.Router();
var path = require('path');
var mysql = require('mysql');
// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'project550.czgstkqm3tfs.us-east-2.rds.amazonaws.com',
//   user     : 'kengpian',
//   password : '550project!',
//   port     : '3306'
// });


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

router.get('/dashboard', function(req, res) {
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

// var oracledb = require('oracledb');


// router.get('/dashboard/:school', function(req, res){
//   var school = req.params.school;
//   console.log("school="+school+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // var query = "SELECT A1.chronname as name, website, control, yearlevel, LH.tuition as tuition, LH.city as city, avg_housing_rate from (SELECT chronname, unitid, yearlevel, control, website FROM university WHERE chronname = '%"+ school +"%' as A1, awards_tuition AT, (SELECT * from location L , housing H where L.city = H.city and L.statename = H.statename) as LH where A1.unitid = AT.unitid and A1.unitid = LH.unitid;";
  // connection.query(query, function(err, rows) {
  //   console.log("rows="+rows+"!!!");
  //   if (err) console.log(err);
  //   else {
  //        res.json(rows);
     
  //     }
  // });

//   oracledb.getConnection(
//  {
//   user: 'kengpian',
//   password: 'project550',
//   connectString: 'cis550project.czgstkqm3tfs.us-east-2.rds.amazonaws.com'
//  },
 
//  function(err, connection)
//  {
//    if (err) { console.error(err); return; }
//    console.log("Connected!!!!!!!!!!!!!!!!");
//    connection.execute(
//      "select * from (select unitid, chronname, website, control from university where UPPER(chronname) like UPPER('%"+school+"%')) A natural join location L;",
//      function(err, result)
//      {
//        if (err) { console.error(err); return; }
//        console.log(result);
//        res.json(result);     
//      });
//  }
//  );
// });


router.post('/login', function(req, res) {
  // For now:
  var username = req.body.username;
  var password = req.body.password;
  res.json({result: 'success'});

  // var query = "INSERT IGNORE INTO User VALUES('" + req.body.username + "','" + req.body.password + "');";   
  // connection.query(query, function(err, rows, fields) {
  //   console.log("rows", rows);
  //   console.log("fields", fields);
  //   if (err) console.log('insert error: ', err);
  //   else {
  //     res.json({
  //       result: 'success'
  //     });
  //   }
  // });
});


router.get('/showResults/:school', function(req, res){
  var school = req.params.school;
  console.log("school="+school+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  var query =  "select * from (select unitid, chronname, website, control from test.university where UPPER(chronname) like UPPER('%"+school+"%')) A natural join test.location L;";
  connection.query(query, function(err, rows) {
    console.log("rows="+rows+"!!!");
    if (err) console.log(err);
    else {
      res.json(rows);
      }
  });
  var date = new Date().toLocaleString();
  fs.appendFile('QueryOpt.txt', 'Now Date ='+ date+'\n', function (err) {
      if (err) throw err;
      console.log('advSearch Saved!');
  });
});


router.get('/advResults', function(req, res){
  var type = req.query.t;
  var state = req.query.l;
  var cost = req.query.c;
  var ranking = req.query.r;
  console.log("filter set = "+ type + state + cost + ranking + "!!!!!!!!!");


  // quert parts
  var str1 = "SELECT * FROM ( SELECT * FROM university "
  var str2 = "NATURAL JOIN (SELECT unitid, chronname, flagship, website FROM test.university WHERE flagship = " + type + ")AS F1 "
  var str3 = "NATURAL JOIN (SELECT * FROM test.location WHERE statename = '" + state + "')AS F2 "
  var str4 = "NATURAL JOIN (SELECT unitid, chronname, tuition FROM test.award_tuition WHERE tuition < " + cost + ")AS F3 "
  var str5 = "NATURAL JOIN (SELECT * FROM test.rank WHERE Rank < " + ranking + ")AS F4 "
  var str6 = ")AS F LIMIT 5;"

  // if user leave some filter as blank:
    if(type == null){
    str2 = "";
  }
    if(state == null){
    str3 = "";
  }
    if(cost == null){
    str4 = "";
  }
    if(ranking == null){
    str5 = "";
  }

  // final query 
  var query = str1 + str2 + str3 + str4 + str5 + str6;
  var t0 = now();
  connection.query(query, function(err, rows) {
    console.log("!!!!!Picked Results!!!!!! = " + rows);
    if (err) console.log(err);
    else {
      res.json(rows);
      }
  });

   var date = new Date().toLocaleString();
  fs.appendFile('QueryOpt.txt', 'Now Date ='+ date+'\n', function (err) {
      if (err) throw err;
      console.log('advSearch Saved!');
  });
  var t1 = now();

  fs.appendFile('QueryOpt.txt', 'advSearch query execution time ='+ (t1-t0)+'\n', function (err) {
      if (err) throw err;
      console.log('advSearch Saved!');
  });
 

});
  

router.get('/showProfile/:uid', function(req, res){
  var school = req.params.uid;
  
  var query =  "SELECT L.unitid, city, statename, L.chronname, website, control, avg_housing_rate, tuition FROM (SELECT L1.unitid, L1.city, L1.statename, L1.chronname, website, control, avg_housing_rate FROM (SELECT * FROM (SELECT * FROM test.university WHERE unitid = "+school+") A1 NATURAL JOIN test.location) L1 left outer join test.housing H on H.city=L1.city and H.statename=L1.statename) L left outer join award_tuition T on L.unitid=T.unitid;";
  var t0=now();
  connection.query(query, function(err, rows) {
    console.log("rows="+rows+"!!!");
    if (err) console.log(err);
    else {
      client.connect(err => {
         var db = client.db("550Project");
         var mquery= {UNITID:Number(school)};

          db.collection("Major"). find(mquery).toArray(function(err, result) { 
              if (err) throw err;
              var array = ["Biology", "Business Administration", "Communications", "Computer Science", "Criminal Justice", "Marketing", "Economics"];
              if(result.length != 0){
                  console.log("result="+result[0]);
                  array = result[0].allmajor;
              }
              
              // console.log("!!!!!array="+array[0]);
              var Jrows = JSON.stringify(rows);
              var myrows = JSON.parse(Jrows);
              myrows[0].allmajor=array;
              res.send(myrows);
              //myrows["allmajor"]=array;
              
              //client.close();
          });
      });
      //res.json(rows);
      
      }
  });

  var t1 = now();
  console.log("!! showProfile query execution time ="+ (t1-t0));
});


router.get('/getTuition/:uid', function(req, res){
  var uid = req.params.uid;
  var query =  "SELECT * FROM test.award_tuition where unitid= "+uid+"";
  connection.query(query, function(err, rows) {
    console.log("tuition");
    if (err) console.log(err);
    else {
      res.json(rows);
      }
  });
});


router.get('/tuitionRec/:tuition/:uid', function(req, res){
  var uid = req.params.uid;
  var tuition = req.params.tuition;
  var query =  "SELECT * FROM(SELECT * FROM test.university u NATURAL JOIN test.award_tuition a WHERE a.tuition between 0.98* '"+tuition+"' AND 1.02* '"+tuition+"' AND u.unitid != '"+uid+"') tmp LIMIT 1;";
  var t0=now();
  connection.query(query, function(err, rows) {
    console.log("rows="+rows+"!!!");
    if (err) console.log(err);
    else {
      res.json(rows);
      }
  });

  var t1 = now();
  fs.appendFile('QueryOpt.txt', 'getTuition query execution time ='+ (t1-t0)+'\n', function (err) {
      if (err) throw err;
      console.log('advSearch Saved!');
  });
  console.log("!! recomTuition query execution time ="+ (t1-t0));
});


router.get('/getLocation/:uid', function(req, res){
  var uid = req.params.uid;
  console.log(uid+"!!");

    var query1 = 'SELECT * FROM test.university natural join test.location where unitid='+uid+';';
    connection.query(query1, function(err, rows){
      console.log("Recom2 rows="+rows+"!!!");
      if (err) console.log(err);
      else {
        res.json(rows);
        }
    });
    
  
  
});



router.get('/showRecom22/:state/:city/:uid', function(req, res){

    var uid = req.params.uid;
    var city = req.params.city;
    var state = req.params.state;
    console.log(uid);
    console.log(city);
    console.log(state);

    console.log("city: "+city+" state:"+state + " uid: "+ uid);
    var query2 =  'SELECT * FROM (SELECT * FROM test.university u NATURAL JOIN test.location l WHERE l.city = "'+city+'" AND l.statename = "'+state+'" AND u.unitid != "'+ uid +'") tmp;';
    var t0=now();
    connection.query(query2, function(err, rows) {
      console.log(rows);
      if (err) console.log(err);
      else {
          res.json(rows);
        }
    });
     var date = new Date().toLocaleString();
  fs.appendFile('QueryOpt.txt', 'Now Date ='+ date+'\n', function (err) {
      if (err) throw err;
      console.log('advSearch Saved!');
  });
    var t1 = now();
  fs.appendFile('QueryOpt.txt', 'recomLocation query execution time ='+ (t1-t0)+'\n', function (err) {
      if (err) throw err;
      console.log('advSearch Saved!');
  });
});



router.get('/getRank/:uid', function(req, res){
  var uid = req.params.uid;
  console.log(uid+"!!");

    var query1 = 'SELECT * FROM test.university natural join test.rank where unitid='+uid+';';
    connection.query(query1, function(err, rows){
      console.log("Recom2 rows="+rows+"!!!");
      if (err) console.log(err);
      else {
        res.json(rows);
        }
    });
  
  
  
});

router.get('/showRecom33/:uid/:rank', function(req, res){

    var uid = req.params.uid;
    var rank = req.params.rank;
    
    var query2 = "SELECT * FROM test.university natural join test.rank r where r.Rank BETWEEN "+rank+"-5 AND "+rank+"+5 and unitid!="+uid+";";
    connection.query(query2, function(err, rows) {
      console.log(rows);
      if (err) console.log(err);
      else {
          res.json(rows);
        }
    });
});

/*

router.get('/showRecom3/:uid/:rank', function(req, res){
  var uid = req.params.uid;
  var rank = req.params.rank;
  var query1 = "SELECT * FROM test.university natural join test.rank r where r.Rank BETWEEN "+rank+"-5 AND "+rank+"+5 and unitid!="+uid+";";
  connection.query(query1, function(err, rows){
    if (err) console.log(err);
    else {
        console.log("Recom3 ");
        console.log(rows[0]);
        //rank=Number(rows[0]);
        //console.log(rank+"!!!!!!!!!!!!!!!");
        res.json(rows[0]);
      }
  });

});

router.get('/showRecom3/:uid', function(req, res){
  var uid = req.params.uid;

  var query1 = "SELECT * FROM test.university natural join test.rank r where r.Rank BETWEEN 32 AND 40 and unitid!="+uid+";";
  connection.query(query1, function(err, rows){
    if (err) console.log(err);
    else {
        console.log("Recom3 ");
        console.log(rows[0]);
        //rank=Number(rows[0]);
        //console.log(rank+"!!!!!!!!!!!!!!!");
        res.json(rows[0]);
      }
  });

});

*/


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
