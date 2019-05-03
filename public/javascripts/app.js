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



// Result page controller
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

    // load images:======================== Bing Image Search API ================================
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
    // ====================================== image loading part END ==========================================
    
    // click on logo and direct to profile page:
    $scope.submit = function(x){
      console.log("function x = "+x);
      var request = $http.get('http://localhost:8081/showProfile/'+x);
  
      request.success(function(response){
        console.log("response[0]"+response[0]);
        $window.localStorage.setItem("uprofile", JSON.stringify(response[0]));
        $window.localStorage.setItem("uid", x);
        // $scope.d=response[0];
        window.location.href = "http://localhost:8081/uprofile";        
      });
  
      request.error(function(data, status){
        console.log('err', data, status);
      });
    }  
});



// Profile Page controller
app.controller('searchProController', function($scope, $http, $window) {
    // Get profile university JSON object from localStorage
    var i = JSON.parse($window.localStorage.getItem("uprofile"));
    $scope.d = i; 
    // get university name for image API
    var Uname = i['chronname'];
    
    // ==================== Fetch profile image ==========================
    var apiKey = 'dbe754370f4442359fac9044521ce3be';
    var altImgSrc = "https://penntoday.upenn.edu/sites/default/files/2018-05/penn_trees.jpg";
    $scope.imgSrc = "";

    var requestImg = $http({ 
        headers: {'Ocp-Apim-Subscription-Key': apiKey,},
        url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="' + Uname + '"library',
        method: "GET",
        data: {} 
    });

    requestImg.success(function(response, imgSrc, imgSrcs){
      imgSrc = response.value[0].contentUrl;
      $scope.imgSrc = imgSrc;
      console.log("!!!IMG RECEIVED!!!" + $scope.imgSrc);
    });
      
    requestImg.error(function(err) {
      console.log("error: ", err);
      $scope.imgSrc = altImgSrc;
    });
    //========================== image received ============================
    
    if(i["avg_housing_rate"] == null){
       i["avg_housing_rate"]=2000;
    }
    if(i["tuition"] == null){
      i["tuition"]=30000;
    }
    $scope.d = i; // university Object
});



// profile page recommendation controller
app.controller("recomController",function($scope, $http, $window){
 
    // Prepare to get recommended schools' images
    var apiKey = 'dbe754370f4442359fac9044521ce3be';
    var altImgSrc = "https://diylogodesigns.com/wp-content/uploads/2016/01/the-networked-university-logo.png";
    $scope.imgSrc1 = "";
    $scope.imgSrc2 = "";
    $scope.imgSrc3 = "";

    var uid = $window.localStorage.getItem("uid");
    $scope.uid = uid;
    
    // Rec 0(1) : By Tuition
    var request0 = $http.get('http://localhost:8081/getTuition/'+ $scope.uid);
    
    request0.success(function(response){         
      var tuition = response[0].tuition;
      $scope.tuition = tuition;
      var request1 = $http.get('http://localhost:8081/tuitionRec/'+ $scope.tuition + '/'+  $scope.uid);
      
      request1.success(function(response){        
        console.log("yeah!!!!!!!!!!!!")
        console.log(response[0]);
        $scope.r1 = response[0];

        var Uname = $scope.r1.chronname;
        var requestImg1 = $http({ 
          headers: {'Ocp-Apim-Subscription-Key': apiKey,},
          url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="' + Uname + '"logo',
          method: "GET",
          data: {} 
        });
        requestImg1.success(function(response, imgSrc, imgSrcs){
          imgSrc1 = response.value[0].contentUrl;
          $scope.imgSrc1 = imgSrc1;
          console.log("!!!IMG-1 RECEIVED!!!" + $scope.imgSrc1);
        });
        requestImg1.error(function(err) {
          console.log("error: ", err);
          $scope.imgSrc1 = altImgSrc;
        });
      });
    
      request1.error(function(data, status){
        console.log('err', data, status);
      });
    });
    
    request0.error(function(data, status){
      console.log('err', data, status);
    });


    // Rec 2: By Location
    var request2 = $http.get('http://localhost:8081/getLocation/'+ uid); 
    request2.success(function(response){
      console.log("help recom 2!");
      city = response[0].city;
      state = response[0].statename;
      $scope.city = city;
      $scope.state = state;
      console.log($scope.city);
      console.log($scope.state);
      var request22 = $http.get('http://localhost:8081/showRecom22/'+$scope.state+'/'+$scope.city+'/'+$scope.uid);
      
      request22.success(function(rows){
        console.log("help recom 22!");
        
        if(rows.length == 0){
           rows = [{"unitid":"154590","city":"Oskaloosa","statename":"IA","chronname":"William Penn University","website":"www.wmpenn.edu","control":"Private not-for-profit"}];
        }
        $scope.r2 = rows[0]; 
        console.log($scope.r2);  
        
        var Uname = $scope.r2.chronname 
        var requestImg2 = $http({ 
          headers: {'Ocp-Apim-Subscription-Key': apiKey,},
          url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="' + Uname + '"logo',
          method: "GET",
          data: {} 
        });
        requestImg2.success(function(response, imgSrc, imgSrcs){
          imgSrc2 = response.value[0].contentUrl;
          $scope.imgSrc2 = imgSrc2;
          console.log("!!!IMG-2 RECEIVED!!!" + $scope.imgSrc2);
        });
        requestImg2.error(function(err) {
          console.log("error: ", err);
          $scope.imgSrc2 = altImgSrc;
        });     
      });

      request22.error(function(data, status){
        console.log('err', data, status);
      });
    })
      
    request2.error(function(data, status){
      console.log('err', data, status);
    });



    // Rec 3: By Ranking
    var request3 = $http.get('http://localhost:8081/getRank/'+ uid);
      
    request3.success(function(response){  
      var rank = 200;
      console.log(response);
      if (response.length != 0){
          rank = response[0].Rank;
      }                 

      var request33 = $http.get('http://localhost:8081/showRecom33/'+ uid + '/'+  rank);
      
      request33.success(function(response){        
        console.log("Recom33!!!!!!!!!!!!")           
        $scope.r3 = response[0];
        
        // Get image for rec 3 
        var Uname = $scope.r3.chronname 
        var requestImg3 = $http({ 
          headers: {'Ocp-Apim-Subscription-Key': apiKey,},
          url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="' + Uname + '"logo',
          method: "GET",
          data: {} 
        });
        requestImg3.success(function(response, imgSrc, imgSrcs){
          imgSrc3 = response.value[0].contentUrl;
          $scope.imgSrc3 = imgSrc3;
          console.log("!!!IMG-3 RECEIVED!!!" + $scope.imgSrc3);
        });
        requestImg3.error(function(err) {
          console.log("error: ", err);
          $scope.imgSrc3 = altImgSrc;
        });     
      });
      
      request33.error(function(data, status){
        console.log('err', data, status);
      });
    });

    request3.error(function(data, status){
      console.log('err', data, status);
    });

        // var JObj =  JSON.parse($window.localStorage.getItem("uprofile"));
        // console.log("Rank Recom3");
        // var rank = JObj["Rank"];
        // console.log(JObj);
        // console.log("rank!!="+rank);

        // var request3 = $http.get('http://localhost:8081/showRecom3/'+uid+'/'+rank);
        
        // request3.success(function(response){
        //   console.log("help recom 3!");
        //   $scope.r3=response;
        //    //$window.localStorage.setItem("recom3", JSON.stringify(response));         
        // });
      
        // request3.error(function(data, status){
        //   console.log('err', data, status);
        // });


    $scope.recomPro=function(x){
      console.log("Reom3 function x = " + x);
      var request = $http.get('http://localhost:8081/showProfile/'+ x);

      request.success(function(response){
        $window.localStorage.setItem("uprofile", JSON.stringify(response[0]));
        $window.localStorage.setItem("uid", x);
        window.location.href = "http://localhost:8081/uprofile";
      });

      request.error(function(data, status){
        console.log('err', data, status);
      });
    }

    // var i = JSON.parse($window.localStorage.getItem("recom1"));
    // if(i!=null){
    // $scope.r1 = i[0];
    // console.log("Recom1: " + $scope.r1);}

    // var j = JSON.parse($window.localStorage.getItem("recom2"));
    // if(j!=null){
    // $scope.r2 = j[0];
    // console.log("Recom2: " + $scope.r2);}

    //  var k = JSON.parse($window.localStorage.getItem("recom3"));
    // if(k!=null){
    // $scope.r3 = k[0];
    // console.log("Recom3: " + $scope.r3);}
});

