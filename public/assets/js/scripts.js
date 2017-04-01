  var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngStorage']);

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
	}).state('adminuserlist', {
		url: '/adminuserlist',
		templateUrl: 'partials/adminuserlist.html',
		controller: 'adminuserlistController',
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

app.value('loggedInUser', {id: '', username: '', avatar: ''});

app.controller('mainController', ['$scope', '$location', function($scope, $location){
	$scope.currentPath = $location.path();
}]);

app.controller('sidebarController', ['$scope', '$location', '$sessionStorage', function($scope, $location, $sessionStorage){
	$scope.username = $sessionStorage.username;
	$scope.avatar = $sessionStorage.avatar;
	console.log($sessionStorage);
	
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

app.controller('chatController', ['$scope', '$location', '$http', 'loggedInUser', '$sessionStorage', function($scope, $location, $http, loggedInUser, $sessionStorage){

	$scope.messages = [];
	$scope.sendMessage = function(){
		if ($scope.conversations.messages.content) {
			$scope.messages.push({
				text: $scope.conversations.messages.content,
				imgUser: $sessionStorage.avatar,
				imgFriend: ''
			}); 
		$scope.conversations.messages.content = '';
		}
	};

	var chatLoad = function() {
		$http.get('/chatdatabase').then(function(response) {
			$scope.userList = response.data;
		});
	}
	chatLoad();

	$scope.logout = function() {
		$location.path('/login');
	};

	$scope.adminUserList = function() {
		$location.path('/adminuserlist');
	}
}]);

app.controller('adminuserlistController', ['$scope', '$location', '$http', 'loggedInUser', '$sessionStorage', function($scope, $location, $http, loggedInUser, $sessionStorage){
	
	var refreshList = function() {
    	$http.get('/chatdatabase').then(function(response) {
	    	console.log("Japp I got the shit I wanted.  All the users in the database.");
	    	$scope.userList = response.data;
	    	$scope.users = null;
	    });
    };

	refreshList();

	$scope.removeUser = function(id) {
		
		var modal = document.getElementById('delete-modal');

		modal.style.display = "block";

		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		$scope.id = id;

		$http.get('/chatdatabase/' + id).then(function(response) {
			$scope.users = response.data;
		});

	};

	$scope.modalDelete = function() {
		var id = $scope.id;
		

		$http.delete('/chatdatabase/' + id).then(function(reponse) {
			$scope.users = reponse.data;
			refreshList();
		});

		var modal = document.getElementById('delete-modal');

		modal.style.display = "none";
	};

	$scope.cancel = function() {
		var modal = document.getElementById('delete-modal');
		modal.style.display = "none";
	}



	// BUTTONS

	$scope.registerBack = function() {
		$location.path('/register');
	};

	$scope.loginBack = function() {
		$location.path('/login');
	};

	$scope.chatBack = function() {
		$location.path('/chat');	
	}
}]);


app.controller('loginController', ['$scope', '$location', '$http', 'loggedInUser', '$sessionStorage', function($scope, $location, $http, loggedInUser, $sessionStorage){

	$scope.logIn = function () {	
		if ($scope.users) {	
			$scope.errorMessagePassword = false;
			$scope.errorMessageUsername = false;
			//check database users for a match, else, show error message where the match fails
			$http.get('/chatdatabase').then(function(response){
				for ( var i = 0; i < response.data.length; i++ ) {
					if ( $scope.users.username === response.data[i].username ) {
						if ( $scope.users.password === response.data[i].password ) {
							$location.path('/chat/public');
							$scope.errorMessageUsername = false;	
							$sessionStorage.id = response.data[i]._id;
							$sessionStorage.username = response.data[i].username;
							$sessionStorage.avatar = response.data[i].avatar.src;
							return loggedInUser;
						} else {
							$scope.errorMessageUsername = false;
							$scope.errorMessagePassword = true;
							break;
						}
					} else {
						$scope.errorMessageUsername = true;
					}
				}

			});
		};
	};
}]);

app.controller('registerController', ['$scope','$location', '$http', function($scope, $location, $http){
	//Messages for username validation
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
		{name: 'Zombie', src:'assets/img/av02.png'},
		{name: 'Zebra', src:'assets/img/av01.png'},
		{name: 'Worm', src:'assets/img/av03.png'},
		{name: 'Cool Giraffe', src:'assets/img/av04.png'},
		{name: 'Ugly Fish', src:'assets/img/av05.png'},
		{name: 'Fly', src:'assets/img/av06.png'},
		{name: 'Leopard', src:'assets/img/av07.png'}
    ];
    $scope.users = {};
    $scope.users.avatar = $scope.avatars[0];

	// Can't be able to log in if username is taken or is passwords don't match
	$scope.users.online = false;
	$scope.registerSubmit = function() {
		$http.post('/chatdatabase', $scope.users).then(function(response) {

			var modal = document.getElementById('login-modal');

			modal.style.display = "block";

			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
			}	
		});
	};

	$scope.modalLogin = function(){
		$location.path('login');  
		console.log('registered');
	}

}]);


