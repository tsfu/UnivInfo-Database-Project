
var app = angular.module('angularjsNodejsTutorial', []);

// Dashboard controller - submit search, get result, and store in localStorage:
app.controller('submitSearchController', function($scope, $http, $window) {
  
  $scope.beginSearch = function() {   
    console.log("school input is: " + $scope.school);
    var request = $http.get('http://localhost:8081/showResults/' + $scope.school);   
    
    request.success(function(response){
    $window.localStorage.setItem("rows", JSON.stringify(response));
    window.location.href = "http://localhost:8081/results";      
    });
  
    request.error(function(response, status){
      console.log('err', data, status);
    });
  }

  $scope.advSearch = function(){
    console.log("TYPE --" + $scope.typeSelected);
    console.log("LOCATION --" + $scope.stateSelected);
    console.log("COST --" + $scope.costSelected);
    console.log("RANKING --" + $scope.rankingSelected);

    var advRequest = $http.get('/advResults', {params:{
        't': $scope.typeSelected, 
        'l': $scope.stateSelected, 
        'c': $scope.costSelected , 
        'r': $scope.rankingSelected
      }
    });
    
    advRequest.success(function(response){
      console.log("REQUEST PROCESSED SUCCESSFULLY!!!")
      $window.localStorage.setItem("rows", JSON.stringify(response));
      window.location.href = "http://localhost:8081/results";      
    });
  
    advRequest.error(function(response, status){
      console.log('err', response, status);
    });
  }

});


app.controller('searchController', function($scope, $http, $window) {
    $scope.shared = JSON.parse($window.localStorage.getItem("rows"));

    console.log("Service: " + $scope.shared);
    $scope.data = $scope.shared;
    console.log($scope.data);

    $scope.submit = function(x){
    console.log("function x = "+x);
   var request = $http.get('http://localhost:8081/showProfile/'+x);
  
    request.success(function(response){
       $window.localStorage.setItem("uprofile", JSON.stringify(response));
       var request2 = $http.get('http://localhost:8081/showRecom1/'+x);

     request2.success(function(response){
      console.log("help recom 1!");
       $window.localStorage.setItem("recom1", JSON.stringify(response));         
    });
  
    request2.error(function(data, status){
      console.log('err', data, status);
    });
 var request3 = $http.get('http://localhost:8081/showRecom2/'+x);
    request3.success(function(response){
      console.log("help recom 2!");
       $window.localStorage.setItem("recom2", JSON.stringify(response));         
    });
  
    request3.error(function(data, status){
      console.log('err', data, status);
    });

 var request4 = $http.get('http://localhost:8081/showRecom3/'+x);
    request4.success(function(response){
      console.log("help recom 3!");
       $window.localStorage.setItem("recom3", JSON.stringify(response));         
    });
  
    request4.error(function(data, status){
      console.log('err', data, status);
    });


       window.location.href = "http://localhost:8081/uprofile";
        
    });
  
    request.error(function(data, status){
      console.log('err', data, status);
    });

    

    // var request3 = $http.get('http://localhost:8081/showRecom2/'+x);

    //  request3.success(function(response){
    //   console.log("help recom 2!");
    //    $window.localStorage.setItem("recom2", JSON.stringify(response));

       
        
    // });
  
    // request3.error(function(data, status){
    //   console.log('err', data, status);
    // });



  }



  // var request = $http.get('/showResults/' + $scope.school);
  // request.success(function(response){
  //   console.log("SCOPE SENT!!!!!!!!!!!!!!!!!");
  //   console.log(response + "!!!!!!!!!!!!DATA GOTTTT!!!!");
  //   $scope.data = response;
  // });

  // request.error(function(data, status){
  //   console.log('err', data, status);
  // });
});


app.controller('searchProController', function($scope, $http, $window) {
    var i = JSON.parse($window.localStorage.getItem("uprofile"));
    $scope.d = i[0];
    console.log("Uprofile: " + $scope.d);
    


  // var request = $http.get('/showResults/' + $scope.school);
  // request.success(function(response){
  //   console.log("SCOPE SENT!!!!!!!!!!!!!!!!!");
  //   console.log(response + "!!!!!!!!!!!!DATA GOTTTT!!!!");
  //   $scope.data = response;
  // });

  // request.error(function(data, status){
  //   console.log('err', data, status);
  // });
});


app.controller("recomController",function($scope, $http, $window){
    var i = JSON.parse($window.localStorage.getItem("recom1"));
    if(i!=null){
    $scope.r1 = i[0];
    console.log("Recom1: " + $scope.r1);}

    var j = JSON.parse($window.localStorage.getItem("recom2"));
    if(j!=null){
    $scope.r2 = j[0];
    console.log("Recom2: " + $scope.r2);}

     var k = JSON.parse($window.localStorage.getItem("recom3"));
    if(k!=null){
    $scope.r3 = k[0];
    console.log("Recom3: " + $scope.r3);}

});

