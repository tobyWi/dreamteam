  var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");
	$stateProvider.state( {
		name: 'login',
		url: '/login',
		templateUrl: 'partials/login.html',
		controller: 'loginController',
		css: 'css/style.css'
	}).state( {
		name: 'register',
		url: '/register',
		templateUrl: 'partials/register.html',
		controller: 'registerController',
		css: 'css/style.css'
	}).state('chat', {
		url: '/chat',
		templateUrl: 'partials/chat.html',
		controller: 'chatController',
		css: 'css/style.css'
	}).state('chat.private', {
		url: '/private',
		templateUrl: 'partials/private.html',
		css: 'css/style.css'
	}).state('chat.public', {
		url: '/public',
		templateUrl: 'partials/public.html',
		css: 'css/style.css'
	});
}]);

app.controller('mainController', ['$scope', '$location', function($scope, $location){
	$scope.currentPath = $location.path();
}]);

app.controller('sidebarController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
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
}]);

app.controller('chatController', ['$scope', '$location', '$http', function($scope, $location, $http){
	$scope.messages = [];
	$scope.sendMessage = function(){
		if ($scope.text) {
			$scope.messages.push({
				text: $scope.text,
				imgUser: 'assets/img/test.jpg',
				imgFriend: ''
			}); 
		$scope.text = '';
		}
	};

	var chatLoad = function() {

		$http.get('/chatdatabase').then(function(response) {
			console.log("FUCK YEAH!");
			$scope.userList = response.data;
		});
	}

	chatLoad();


	$scope.logout = function() {

		

		$location.path('/login');
	};
}]);

app.controller('loginController', ['$scope', '$location', '$http', function($scope, $location, $http){

	$scope.submit = function () {
		
		$scope.errorMessagePassword = false;
		$scope.errorMessageUsername = false;
		// $scope.users.id = 
		//so rootscope users for a match, else, show error message where the match fails
		$http.get('/chatdatabase').then(function(response){

			for ( var i = 0; i < response.data.length; i++ ) {
				if ( $scope.users.username === response.data[i].username ) {
					if ( $scope.users.password === response.data[i].password ) {
						// $location.path('/chat/public');
						$scope.errorMessageUsername = false;	
						$scope.users.id = response.data[i]._id;
						// console.log($scope.users.id);
						break;
					} else {
						$scope.errorMessageUsername = false;
						$scope.errorMessagePassword = true;
						break;
					}
				} else {
					$scope.errorMessageUsername = true;
				}
			}
		console.log($scope.users.id);
		});
		

	};

		


    // $scope.edit = function(id) { 
    // 	console.log(id);
    // 	$http.get('/contacts/' + id).then(function(response) {
    // 		$scope.contact = response.data;
    // 		// refresh();
    // 	});
    // };


}]);

app.controller('registerController', ['$scope','$location', '$http', function($scope, $location, $http){
	// Messages for username validation
	$scope.$watch('users.username', function(newValue, oldValue){
		if (newValue) {
			// Username too short
			if (newValue.length < 5) {
				$scope.tooShort = true;
			} else{
				$scope.tooShort = false;
			}

			// Username is too long
			if (newValue.length > 20) {
				$scope.tooLong = true;
			} else {
				$scope.tooLong = false;
			}

			// Username contains invalid symbols
			var letters = /^[0-9a-zA-Z]+$/;
			if (letters.test(newValue)){
				$scope.regex = false;
			} else {
				$scope.regex = true;
			}

			// Check if a username is already taken
			$scope.usernameIsTaken = false;
			$http.get('/chatdatabase').then(function(response){
				for ( var i = 0; i < response.data.length; i++ ) {
					if ( newValue == response.data[i].username ) {
						return $scope.usernameIsTaken = true;
					} else {
						$scope.usernameIsTaken = false;			
					}
				}
			});
		}

		$scope.$watch('users.password', function(newValue, oldValue){
			if (newValue) {
				// Password too short
				if (newValue.length < 6) {
					$scope.tooShortPassword = true;
				} else{
					$scope.tooShortPassword = false;
				}

				// Password is too long
				if (newValue.length > 30) {
					$scope.tooLongPassword = true;
				} else {
					$scope.tooLongPassword = false;
				}

				// Password regex
				var validPassword = /^[0-9a-zA-Z]+$/;
				if(validPassword.test(newValue)) {
					$scope.passwordRegex = false;
				} else {
					$scope.passwordRegex = true;
				}
				
			}
		});
	});

	$scope.avatars = [
		{name: 'Avatar 01', src:'assets/img/av01.png'},
		{name: 'Avatar 02', src:'assets/img/av02.png'},
		{name: 'Avatar 03', src:'assets/img/av03.png'},
		{name: 'Avatar 04', src:'assets/img/av04.png'},
		{name: 'Avatar 05', src:'assets/img/av05.png'},
		{name: 'Avatar 06', src:'assets/img/av06.png'}
    ];
    $scope.users = {};
    $scope.users.avatar = $scope.avatars[0];

	// Can't be able to log in if username is taken or is passwords don't match
	$scope.users.online = false;
	$scope.registerSubmit = function() {
			$http.post('/chatdatabase', $scope.users).then(function(response) {
				console.log(response);
			});

			$location.path('login');  //  Modal with welcome message (Daniels idea)
			console.log('registered');
	};
}]);


