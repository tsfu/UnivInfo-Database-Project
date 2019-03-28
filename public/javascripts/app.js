var app = angular.module('DBProject', []);

//Login Controller
app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function(response) {
      // success
      console.log(response);
      
        if (response.result === "success") {
        // After login, redirect user to page below:
        window.location.href = "http://localhost:8081/template"
      }
    });
    
      request.error(function(err) {
      console.log("error: ", err);
    });

  };
});


// Implement this controller for every HTML body!
app.controller('TemplateController', function($scope, $http) {  
  
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
