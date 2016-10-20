angular.module('Auxiliary', []);


angular.module('Auxiliary').directive('modal', function(){
	return {
		restrict: 'A', 
		scope: {
			modal: '@',
		},
		link: function($scope, element, attrs) {
			$scope.$watch('modal', function(oldvalue, newvalue){
				if(oldvalue =='yes'){
					element[0].style.left='14px';
				} else {
					element[0].style.left='-225px';
				}

			})
			
		}
	};
});

angular.module('Auxiliary').directive('slider',function(){
	return {
		scope: {
			slider: '@'
		},
		restrict: 'A',
	
		link: function($scope, element, attrs, controller) {
			$scope.$watch('slider', function(newvalue, oldvalue){
				if(newvalue<3){
					element[0].children[newvalue].children[0].style.display="block";
				}
				if(newvalue!==oldvalue && oldvalue!=='' && oldvalue<3){
					element[0].children[oldvalue].children[0].style.display="none";
				}	

			})
		}
	};
});

angular.module('Auxiliary').directive('animate',function(){
	return {
		scope: {
			animate: '@'
		},
		restrict: 'A',
	
		link: function($scope, element, attrs, controller) {
			$scope.$watch('animate', function(newvalue, oldvalue){
				if(newvalue!==''){
					switch(newvalue){
						case '0':
						element[0].style.opacity = '0';
						break;
						case '1':
						element[0].style.opacity = '1';
						break;
					}			
				}
			})
		}
	};
});


angular.module('Auxiliary').directive('pagination',function(){
	return {
		scope: {
			pagination: '@'
		},
		 restrict: 'A',
	
		link: function($scope, element, attrs, controller) {
			$scope.$watch('pagination', function(newvalue, oldvalue){
				if(newvalue!=='' && newvalue!='false'){
					element[0].children[newvalue].classList.add('selected');
				}
				if(newvalue!==oldvalue && oldvalue!=='' && oldvalue!=='false'){
					element[0].children[oldvalue].classList.remove('selected');
				}
				
			})
		}
	};
});


angular.module('Auxiliary').directive('formerror', function(){
	// Runs during compile
	return {

		scope: {
			formerror: '@'
		},
		restrict: 'A',
		link: function($scope, element, Attrs, controller) {
			$scope.$watch('formerror', function(newvalue, oldvalue){
				var form = element.find('div');
				switch(newvalue){
					case 'message_error':
						form[1].classList.add("has-error");
						form[0].classList.remove("has-error");
						break;
					case 'name_error':
						form[1].classList.remove("has-error");
						form[0].classList.add("has-error");
						break;
					case 'message_name_error':
						form[0].classList.add("has-error");
						form[1].classList.add("has-error");
						break;
				}
			})	
		}
	};
});


angular.module('Auxiliary').factory('Contactsfactory', ['$http','$q', function($http, $q){
	return { 
		Validate: function(e,a,data){
		    if(e===true && a===true && data!==''){
		    	var defer=$q.defer();
				var data1 = {name:data.name, message: data.message};
				$http.post("ajax/contacts.php",data1).
				success(function(data) {
					defer.resolve(data);
				});
				return defer.promise;
			}else if (e===false && a===true) {
				return 'message_error';
			} else if(e===true && a===false){
				return 'name_error';
			}else if(e===false && a===false){
				return 'message_name_error';
			}
		}

	}

}]);

angular.module('Auxiliary').service('Mainservice', ['$http','$q', function($http, $q){
	this.Pagination = function(){
		var nums=[];
		var defer=$q.defer();
		$http.post("ajax/num.php").
    	then(function(response) {
			for (var i=1;i<=response.data;i++){
				nums.push(i);
			}
			defer.resolve(nums);
		});
		return defer.promise;
	}

	this.Query = function(e=0,sleep='false'){
		var data={num:e, sleep: sleep};
		var defer=$q.defer();
		$http.post("ajax/cats.php",data).
        then(function(response) {
		    defer.resolve(response);
		});
		return defer.promise;
	}

}]);



