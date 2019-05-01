
var app = angular.module('angularjsNodejsTutorial', []);

// Dashboard controller - submit search, get result, and store in localStorage:
app.controller('submitSearchController', function($scope, $http, $window) {
  
  // name search
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

  // advanced filter search
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
    // load serach result JSON from localStorage, show results cards
    $scope.shared = JSON.parse($window.localStorage.getItem("rows"));
    $scope.data = $scope.shared;
    console.log($scope.data);

    // extract scholl names as search keywords:
    var names = [];
    for(var i = 0; i<$scope.data.length; i++){
      names.push($scope.data[i].chronname)
    };

    // load images:================ Bing Image Search API =========================
    var apiKey = 'dbe754370f4442359fac9044521ce3be';
    var altImgSrc = "https://psmag.com/.image/t_share/MTI4NzE4MDAzMzE4NTk0MDE0/shutterstock_35935870jpg.jpg";
    $scope.imgs = [];
    
    for(var i = 0; i<$scope.data.length; i++){
      
      // Delay for API access limit..1 request per second..
      setTimeout(function(){console.log("HAHA+1S")}, 1000)

      var requestImg = $http({ 
        headers: {'Ocp-Apim-Subscription-Key': apiKey,},
        url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="' + names[i] + '"campus',
        method: "GET",
        data: {} 
      });

      requestImg.success(function(response, imgSrc, imgSrcs){
        imgSrc = response.value[0].contentUrl;
        $scope.imgs.push(imgSrc);
        console.log("!!!THIS ROW HAS GOT AN IMG!!!");
      });
      
      requestImg.error(function(err) {
        console.log("error: ", err);
        $scope.imgs.push(altImgSrc);
      });
    }
    //$scope.imgs.sort();
    console.log($scope.imgs);
    // ========================= image loading part END ==================================================================
    
    // click on logo and direct to profile page:
    $scope.submit = function(x){
      console.log("function x = "+x);
      var request = $http.get('http://localhost:8081/showProfile/'+x);
  
      request.success(function(response){
        $window.localStorage.setItem("uprofile", JSON.stringify(response));

        window.location.href = "http://localhost:8081/uprofile";

        var request1 = $http.get('http://localhost:8081/showRecom1/'+x);

        request1.success(function(response){
          console.log("help recom 1!");
          $window.localStorage.setItem("recom1", JSON.stringify(response));         
        });
    
        request1.error(function(data, status){
          console.log('err', data, status);
        });

        var request2 = $http.get('http://localhost:8081/showRecom2/'+x);
        
        request2.success(function(response){
          console.log("help recom 2!");
          var city = response[0].city;
          var state = response[0].statename;
          
          var request22 = $http.get('/showRecom22', {params:{
            'city': city, 
            'state': state,
            'uid': x
               }
          });
          
          request22.success(function(rows){
            console.log("help recom 22!");
            $window.localStorage.setItem("recom2", JSON.stringify(rows));         
          });
  
          request22.error(function(data, status){
            console.log('err', data, status);
          });
        });
  
        request2.error(function(data, status){
          console.log('err', data, status);
        });

        var request3 = $http.get('http://localhost:8081/showRecom3/'+x);
        
        request3.success(function(response){
          console.log("help recom 3!");
           $window.localStorage.setItem("recom3", JSON.stringify(response));         
        });
      
        request3.error(function(data, status){
          console.log('err', data, status);
        });
      });
  
      request.error(function(data, status){
        console.log('err', data, status);
      });
    }  
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

