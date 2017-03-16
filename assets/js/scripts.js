var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        controller: 'registerController',
        templateUrl: 'partials/register.html'
    }).when('/chat', {
        controller: 'chatController',
        templateUrl: 'partials/chat.html'
    }).otherwise({
        controller: 'sidebarController',
        templateUrl: 'partials/login.html'
    });
}]);

app.controller('sidebarController', ['$scope', function($scope){
	$scope.username = 'Somebody';
	$scope.tab = 1;
	$scope.online = 'green';
	$scope.offline = 'red';

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.users = [{
	    name: 'user',
	    password: 'xxxxx',
	    avatar: 'assets/img/test.jpg',
	    online: true
	  },
	  {
		name: 'user1',
		password: 'xxxxx',
		avatar: 'assets/img/test.jpg',
	    online: true
	  },
	  {
		name: 'user2',
		password: 'xxxxx',
		avatar: 'assets/img/test.jpg',
	    online: false
	  },
	  {
		name: 'user3',
		password: 'xxxxx',
		avatar: 'assets/img/test.jpg',
	    online: false
	  }
	];		
}]);

app.controller('chatController', [function(){
	
}]);

app.controller('loginController', [function(){
	
}]);


app.controller('registerController', ['$scope', function($scope){
 /*
  $scope.RegistrationController = function() {
    var model = this;

    model.message = "";

    model.user = {
      username: "",
      password: "",
      confirmPassword: ""
    };

    model.submit = function(isValid) {
      console.log("h");
      if (isValid) {
        model.message = "Submitted " + model.user.username;
      } else {
        model.message = "There are still invalid fields below";
      }
    };

  };

  var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  };

  regapp.directive("compareTo", compareTo);
  regapp.controller("RegistrationController", RegistrationController);
	*/
}]);









