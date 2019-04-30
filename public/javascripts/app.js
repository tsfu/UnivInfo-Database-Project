
var app = angular.module('angularjsNodejsTutorial', []);

app.controller('submitSearchController', function($scope, $http, $window) {
  $scope.beginSearch = function() {
    
    console.log("school input is: " + $scope.school);
    var request = $http.get('http://localhost:8081/showResults/' + $scope.school);   
    
    request.success(function(response){
    $window.localStorage.setItem("rows", JSON.stringify(response));
    window.location.href = "http://localhost:8081/results";      
    });
  
    request.error(function(data, status){
      console.log('err', data, status);
    });
  }
});


app.controller('searchController', function($scope, $http, $window) {
    $scope.shared = JSON.parse($window.localStorage.getItem("rows"));

    console.log("Service: " + $scope.shared);
    $scope.data = $scope.shared;
    console.log($scope.data);
    console.log("help!");

    $scope.submit = function(x){
    console.log("function x = "+x);
   var request = $http.get('http://localhost:8081/showProfile/'+x);


  
    request.success(function(response){
       $window.localStorage.setItem("uprofile", JSON.stringify(response));
       window.location.href = "http://localhost:8081/uprofile";
        
    });
  
    request.error(function(data, status){
      console.log('err', data, status);
    });

    var request2 = $http.get('http://localhost:8081/showRecom1/'+x);

     request2.success(function(response){
      console.log("help recom 1!");
       $window.localStorage.setItem("recom1", JSON.stringify(response));

       
        
    });
  
    request2.error(function(data, status){
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
    $scope.r1 = i[0];
    console.log("Recom1: " + $scope.r1);

    var j = JSON.parse($window.localStorage.getItem("recom2"));
    $scope.r2 = j[0];
    console.log("Recom2: " + $scope.r2);

});

