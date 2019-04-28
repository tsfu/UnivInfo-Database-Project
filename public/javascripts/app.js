var app = angular.module('angularjsNodejsTutorial', []);



// app.factory('myService', function() {
//  var savedData = {}
//  function set(data) {
//    savedData = data;
//  }
//  function get() {
//   return savedData;
//  }

//  return {
//   set: set,
//   get: get
//  }

// });

// Implement this controller for every HTML body!
/* app.controller('TemplateController', function($scope, $http) {  
  
  $scope.users = {};
  $scope.message="";
  
  var request = $http({
    url: 'INSERT URL HERE',
    method: "GET",
    data: {}
  });

  request.success(function(response){
    $scope.dummy = response;
  });
  
  request.error(function(err) {
    console.log("error: ", err);
  });

}); */

app.controller('submitSearchController', function($scope, $http, $rootScope) {

  $scope.beginSearch = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);


     var request = $http.get('http://localhost:8081/dashboard/'+$scope.school);
    request.success(function(data){
    console.log(data+"log!!!!log");

    $rootScope.school=$scope.school;
   
    //console.log($rootScope.data+"!!!!!!!!!!!!scope");
    window.location.pathname='../views/results.html';
    window.location.href = "http://localhost:8081/results/"+$scope.school;

    // $scope.data=data;

  });
  request.error(function(data, status){
    console.log('err', data, status);
  });
  }
});


app.controller('searchController', function($scope, $http, $rootScope) {
  // normal variables

    var request = $http.get('http://localhost:8081/results/'+$rootScope.school);
  request.success(function(data){
    console.log($rootScope.school+"rootScope!!!!!!!!!!!!!!!!!");
    //console.log(myService.get()+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!myService");
    console.log(data+"!!!!!!!!!!!!scope");
     $scope.data=data;
  });
  request.error(function(data, status){
    console.log('err', data, status);
  });
  
  
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
