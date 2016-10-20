angular.module('App', ['ngRoute', 'ngAnimate', 'Auxiliary'])

angular.module('App').config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/photos', {
        	templateUrl: 'view/photos.html',
			controller: 'PhotosCtrl'
      })
        .when('/contacts', {
        	templateUrl: 'view/contacts.html',
			controller: 'ContactsCtrl'
      })	
	  	.when('/Catpage', {
       		templateUrl: 'view/catpage.html',
			controller:  'CatpageCtrl'
		
      })
	  	.when('/main', {
        	templateUrl: 'view/main.html', 
			controller: 'MainCtrl'
      });
    $routeProvider.otherwise({redirectTo: '/main'});
    $locationProvider.html5Mode(true);
}]);


/* Controller PhotosCtrl*/

angular.module('App').controller('PhotosCtrl',['$scope','$rootScope','Mainservice', function($scope, $rootScope, Mainservice){
	$rootScope.title = 'Photos';
	var number=0;
	$scope.button=true;
	$scope.page='false';
	$scope.loader=false;

	var pagination = Mainservice.Pagination();
	pagination.then(function(value){
		$scope.nums=value;
		$scope.page=0;
	});

	var cats = Mainservice.Query();
	cats.then(function(value){
		$scope.cats=value.data;
	});
            		
	$scope.Query = function(e){
		var page=e.target.innerHTML-1;
		if($scope.page!==page){
			$scope.loader=true;
			$scope.page=page;
			var cats=Mainservice.Query($scope.page,'true');
			cats.then(function(value){
				$scope.cats=value.data;
				$scope.loader=false;
			});
		}
		

	};
		
	$scope.Querymobile=function(){
		number++;
		var cats=Mainservice.Query(number);
		cats.then(function(value){
			$scope.cats=$scope.cats.concat(value.data);
		});
		if(number==$scope.nums.length-1){
			$scope.button=false;
		}
	};
}]);




/* Controller Catpage*/


angular.module('App').controller('CatpageCtrl',['$rootScope', function($rootScope){
  	$rootScope.title= 'Catpage';
}]);




/* Controller MainCtrl*/



angular.module('App').controller('MainCtrl',['$scope','$rootScope','$interval','$timeout', function($scope, $rootScope, $interval, $timeout){
  	$rootScope.title= 'Main';
	var urls=['/img/slide.jpg','/img/slide1.jpg','/img/slide2.jpg'];
	$scope.url= urls[0];
	$scope.index=0;
	$scope.animate=1;


	var Animation = function(){
		if($scope.animate===0){
			if($scope.cancel!=='true'){
				if($scope.index==2){
					$scope.index=0;
				}else {
					$scope.index++;
				}
			}
			$scope.url = urls[$scope.index];
			$scope.cancel='false';
			var timeout2 =$timeout(function(){$scope.animate=1;},200);
		}else {
			$scope.animate=0;
			var timeout = $timeout(Animation,800);
		}

	};

	$scope.animation_interval = $interval(Animation,6000);
	
	$scope.Slider = function(e){
		if(e!==$scope.index){
			$scope.index=e;
			$scope.cancel='true';
			Animation();
			$scope.animation_interval = $interval(Animation,6000);
		}
	};
	
	
	$scope.Clearinterval=function(e,q){
		if(e.which==1 && q!==$scope.index){
			$interval.cancel($scope.animation_interval);
			$scope.animation_interval=undefined;
		}
	}
	$rootScope.Clear= function(){
		$interval.cancel($scope.animation_interval);
		$scope.animation_interval=undefined;
	};
}]);


angular.module('App').controller("Main2Ctrl",['$scope','$location', function($scope, $location){
	$scope.modal='no';

	$scope.Modalmenu=function(){
		if($scope.modal=='yes'){
			$scope.modal='no';
		}else {
			$scope.modal='yes';
		}
	};
	
	$scope.Route=function(a){
		$location.path(a);
	};
}]);


angular.module('App').controller("ContactsCtrl",['$rootScope','$scope','$http','Contactsfactory', function($rootScope, $scope, $http, Contactsfactory){
	$scope.message=true;
  	$rootScope.title = 'Contacts';

	$scope.Inspection = function(e,a,data){
		var promise = Contactsfactory.Validate(e,a,data);
		if(typeof(promise) === 'object'){
			$scope.message=false;
		}else {
			$scope.error=promise;
		}
		
	};
	
}]);
