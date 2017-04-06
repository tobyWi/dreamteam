var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngStorage', 'luegg.directives']);

//------------------------------------------------ CONFIG -------------------------------------------//
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

//------------------------------------------------ MAINCONTROLLER -------------------------------------------//

app.controller('mainController', ['$scope', '$location', function($scope, $location){
	$scope.currentPath = $location.path();
}]);

//------------------------------------------------ SIDEBARCONTROLLER -------------------------------------------//

app.controller('sidebarController', ['$scope', '$location', '$sessionStorage', function($scope, $location, $sessionStorage){
	$scope.username = $sessionStorage.username;
	$scope.avatar = $sessionStorage.avatar;
	
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

//------------------------------------------------ CHATCONTROLLER -------------------------------------------//

app.controller('chatController', ['$scope', '$location', '$http', '$sessionStorage', '$interval', function($scope, $location, $http, $sessionStorage, $interval){

	$scope.isUserSender = function(sender) {
		return sender === $sessionStorage.username;
	}

	// Get all messages in public chat
	var allMessages = function() {
		$http.get('/conversations').then(function(response){
			$scope.allMessages = response.data;
		});
	}
	allMessages(); // To load all messages in the beginning


	$scope.sendMessage = function(){
		if ($scope.conversations) {
			$scope.conversations.messages.sender = $sessionStorage.username;
			$scope.conversations.messages.senderavatar = $sessionStorage.avatar;
			
			$http.post('/conversations', $scope.conversations).then(function(response) {
				$scope.conversations.messages.content = ''; // Empty the textarea after sending the message
			});
		}

		var chat = document.getElementById('chat-area');
		console.log(chat);



		// chat.scrollBy(0,100);

	};

	// Needs to update frequently, if you update when you send a message, 
	// it doesn't update when someone else send a message
	$interval(function(){
		allMessages();
	}, 500);

	//Sidebar list all users
	var chatLoad = function() {
		$http.get('/users').then(function(response) {
			$scope.userList = response.data;
		});
	}
	chatLoad();

	$scope.logout = function() {
		$http.put('/users/1/' + $sessionStorage.id, $scope.users).then(function(response) {

    		console.log('Logout: ' + response.data.username + ' ' + response.data.online);
    	});
		delete $sessionStorage.id;
		delete $sessionStorage.username;
		delete $sessionStorage.avatar;
		
		
		// app.directive('LogoutAnimate', function() {
		// 	return {
		// 		restrict: 'A',
		// 		scope: true,

		// 	}
		// });

		// $scope.logout = function()

		// !function($){

		// 	$("#logout2").click(function(){
		// 		$(this).addCLass("animated hinge");
		// 	});

		// }(jQuery);

		// $interval(function(){
			$location.path('/login');
		// }, 2000);
			
		
		

		
	};

	$scope.adminUserList = function() {
		$location.path('/adminuserlist');
	}
}]);

//------------------------------------------------ADMINUSERCONTROLLER -------------------------------------------//

app.controller('adminuserlistController', ['$scope', '$location', '$http', '$sessionStorage', function($scope, $location, $http, $sessionStorage){
	
	var refreshList = function() {
    	$http.get('/users').then(function(response) {
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

		$http.get('/users/' + id).then(function(response) {
			$scope.users = response.data;
		});

	};

	$scope.modalDelete = function() {
		var id = $scope.id;
		$http.delete('/users/' + id).then(function(reponse) {
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

//------------------------------------------------ LOGINCONTROLLER -------------------------------------------//

app.controller('loginController', ['$scope', '$location', '$http', '$sessionStorage', function($scope, $location, $http, $sessionStorage){

	$scope.logIn = function () {
		if ($scope.users) {	
			$scope.errorMessagePassword = false;
			$scope.errorMessageUsername = false;
			//check database users for a match, else, show error message where the match fails
			$http.get('/users').then(function(response){
				for ( var i = 0; i < response.data.length; i++ ) {
					if ( $scope.users.username === response.data[i].username ) {
						if ( $scope.users.password === response.data[i].password ) {
							$location.path('/chat/public');
							$scope.errorMessageUsername = false;	
							$sessionStorage.id = response.data[i]._id;
							$sessionStorage.username = response.data[i].username;
							$sessionStorage.avatar = response.data[i].avatar.src;
							$http.put('/users/' + $sessionStorage.id, $scope.users).then(function(response) {
								console.log($sessionStorage.id);
					    		console.log('Login: ' + response.data.username + ' ' + response.data.online);
					    	});
							return;   // Here shit happens
						} else {
							$scope.errorMessageUsername = false;
							$scope.errorMessagePassword = true;
							return;
						}
					} else {
						$scope.errorMessageUsername = true;
					}
				}

			});
		};
	};
}]);

//------------------------------------------------ REGISTERCONTROLLER -------------------------------------------//

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
			$http.get('/users').then(function(response){
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
		{name: 'Weird unicorn', src:'assets/img/av05.png'},
		{name: 'Fly', src:'assets/img/av06.png'},
		{name: 'Leopard', src:'assets/img/av07.png'},
		{name: 'Rico Tequila', src:'assets/img/av08.png'},
		{name: 'Mr. french fries', src:'assets/img/av09.png'},
		{name: 'coco crayfish', src:'assets/img/av10.png'},
		{name: 'Doggy style', src:'assets/img/av11.png'}
    ];
    $scope.users = {};
    $scope.users.avatar = $scope.avatars[10];

	// Can't be able to log in if username is taken or is passwords don't match
	$scope.users.online = false;
	$scope.registerSubmit = function() {
		$http.post('/users', $scope.users).then(function(response) {

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
