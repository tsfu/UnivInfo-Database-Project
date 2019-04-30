"use strict";
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

    var advRequest = $http({
      url: '/advResults/',
      params: {t: $scope.typeSelected, l: $scope.stateSelected, c:$scope.costSelected , r:$scope.rankingSelected}, 
      method: "GET",
      data: {}
    });
    // var advRequest = $http.get('http://localhost:8081/advResults/' + $scope.typeSelected + '/' + $scope.stateSelected + '/' + 
    //   $scope.costSelected + '/' + $scope.rankingSelected);
    
    advRequest.success(function(response){
      console.log("REQUEST SENT SUCCESS!!!")
    //$window.localStorage.setItem("advRows", JSON.stringify(response));
    //window.location.href = "http://localhost:8081/results";      
    });
  
    advRequest.error(function(response, status){
      console.log('err', response, status);
    });
  }

});



// R
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
