var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

app.controller('sidebarController', ['$scope', function($scope){
	$scope.username = 'Somebody';
	$scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.x = false;
    $scope.toggle = function() {
        $scope.x = !$scope.x;
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

app.service('testUser', function() {
	var user = [{
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
    online: true
  },
  {
	name: 'user3',
	password: 'xxxxx',
	avatar: 'assets/img/test.jpg',
    online: true
  }
  ];
});

//

app.controller('sidebarController', ['$scope', function($scope){
	$scope.username = 'Somebody';
}]);

(function() {

  var regapp = angular.module("validation", ["ngMessages"]);

  var RegistrationController = function() {
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

}());	








