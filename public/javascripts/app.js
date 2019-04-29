
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



app.controller('profileController', function($scope, $http) {
  // normal variables
  $scope.submit = function(){
   var request = $http.get('http://localhost:8081/?uid='+$scope.school);
  request.success(function(data){
    console.log(data);
     $scope.data=data;
  });
  request.error(function(data, status){
    console.log('err', data, status);
  });
  }
  
});




// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
"use strict";
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



app.controller('profileController', function($scope, $http) {
  // normal variables
  $scope.submit = function(){
   var request = $http.get('http://localhost:8081/?uid='+$scope.school);
  request.success(function(data){
    console.log(data);
     $scope.data=data;
  });
  request.error(function(data, status){
    console.log('err', data, status);
  });
  }
  
});




// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
