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
// ---------------------------------------------- AVATARS/VALUE ----------------------------------------------------//
app.value('avatars', [
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
    ]);

//------------------------------------------------ MAINCONTROLLER -------------------------------------------//

app.controller('mainController', ['$scope', '$location', function($scope, $location){
	$scope.currentPath = $location.path();
}]);

//------------------------------------------------ SIDEBARCONTROLLER -------------------------------------------//

app.controller('sidebarController', ['$scope', '$location', '$sessionStorage', function($scope, $location, $sessionStorage){
	$scope.username = $sessionStorage.username;
	$scope.avatar = $sessionStorage.avatar;
	
	$scope.tab = 1;
	$scope.setTab = function(newTab){
		$scope.tab = newTab;
	};
	$scope.isSet = function(tabNum){
		return $scope.tab === tabNum;
	};	
}]);

//------------------------------------------------ CHATCONTROLLER -------------------------------------------//

app.controller('chatController', ['$scope', '$location', '$http', '$sessionStorage', '$interval', 'avatars', 'validation', '$timeout', function($scope, $location, $http, $sessionStorage, $interval, avatars, validation, $timeout){
	$scope.username = $sessionStorage.username;
	$scope.avatar = $sessionStorage.avatar;
	$scope.id = $sessionStorage.id;
	$scope.password = $sessionStorage.password;
	$scope.avatars = avatars; // In order to display avatarlist in edit-profile modal

	// ---- Edit-profile modal 
	$scope.unregisterNow = false;
	$scope.unregisterAccountModal = function(){
		$scope.unregisterNow = !$scope.unregisterNow;
	};
	$scope.edit = false;
	$scope.editProfile = function(){
		$scope.edit = !$scope.edit;
	};
	$scope.changePassword = false;
	$scope.editPassword = function(){
		$scope.changePassword = !$scope.changePassword;
	};
	$scope.changeAvatarModal = false;
	$scope.editAvatar = function(){
		$scope.changeAvatarModal = !$scope.changeAvatarModal;
	};

	$scope.isUserSender = function(sender) {
		return sender === $sessionStorage.username;
	};

	$scope.successfyllyChangedPassword = false;
	$scope.changeYourPassword = function(id){
		if ($scope.users.password) {
			$http.get('/users/' + id).then(function(res, req){
			});
			$scope.users.username = $sessionStorage.username;
			$scope.users.id = $sessionStorage.id;
			$scope.users.avatar = $sessionStorage.avatar;
			$http.put('/users/password/' + id, $scope.users).then(function(res){
				// Show a message for the user that change was successful
				$scope.successfyllyChangedPassword = true;
				// Change sessionstorage to the current password
				$sessionStorage.password = $scope.users.password;
				// Return to editprofile modal
				$timeout(function(){
					$scope.confirmOldPassword = true; // Next time you press change passwords, this will show again
					$scope.chooseNewPassword = false;
					$scope.changePassword = false;
					$scope.successfyllyChangedPassword = false;
					$scope.users.password = '';
					$scope.confirmNewPassword = '';
				}, 1000);
			});
		}
	};

	$scope.changeAvatar = function(){
		
	};

	$scope.goodbye = false;
	$scope.unregisterAccount = function (id) {
		$scope.wrongPassword = false;
		if ( $scope.unregisterPasswordConfirm === $sessionStorage.password ) {
			$http.delete('/users/3/' + id).then(function(res){
				$scope.goodbye = true;
				$timeout(function() {
					delete $sessionStorage.id;
					delete $sessionStorage.username;
					delete $sessionStorage.avatar;
					$location.path('/login');
				}, 1500);
			});
		} else {
			$scope.wrongPassword = true;
		}
	};

	$scope.confirmOldPassword = true;
	$scope.correctPassword = function(){
		$scope.chooseNewPassword = false;
		$scope.incorrectPassword = false;
		if ($scope.oldPassword == $sessionStorage.password) {
			console.log('Correct!');
			$scope.chooseNewPassword = true;
			$scope.confirmOldPassword = false;
			$scope.oldPassword = '';
		} else {
			console.log('incorrect password');
			$scope.incorrectPassword = true;
		}
	};

	$scope.$watch('users.password', function(newValue, oldValue){
		if (newValue) {
			$scope.tooLong = validation.long(newValue);
			$scope.tooShort = validation.short(newValue);
			$scope.regex = validation.regex(newValue);
		}
	});

	// ------ Get all messages in public chat
	var allMessages = function() {
		$http.get('/conversations').then(function(response){
			$scope.allMessages = response.data;
		});
	};
	allMessages(); // To load all messages in the beginning

	$scope.sendMessage = function(){
		if ($scope.conversations) {
			$scope.conversations.messages.sender = $sessionStorage.username;
			$scope.conversations.messages.senderavatar = $sessionStorage.avatar;	
			$scope.conversations.messages.date = new Date();
			
			$http.post('/conversations', $scope.conversations).then(function(response) {
				$scope.conversations.messages.content = ''; // Empty the textarea after sending the message
			});
		}
	};

	//$interval(function(){
	//	allMessages();
	//}, 500);

	//Sidebar list all users
	var chatLoad = function() {
		$http.get('/users').then(function(response) {
			$scope.userList = response.data;
		});
	};
	chatLoad();

	// PRIVATE CHAT COLLECT DATA
	$scope.privateUser = [];
	$scope.toPrivate = function(id) {

		// $scope.id = id;

		$http.get('/users/private/' + id).then(function(response) {
			$scope.privateUser.push({username: response.data.username, avatar: response.data.avatar, online: response.data.online});
			// $sessionStorage.privateId.push(response.data.username);
		});
	};

	$scope.noPrivate = function($index) {
		$scope.privateUser.splice($index,1);	
	};

	// LOGOUT
	$scope.logout = function() {
		$http.put('/users/1/' + $sessionStorage.id, $scope.users).then(function(response) {
    	});
		delete $sessionStorage.id;
		delete $sessionStorage.username;
		delete $sessionStorage.avatar;
		
		$location.path('/login');
	};

	$scope.adminUserList = function() {
		$location.path('/adminuserlist');
	};

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
		};
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
	};

	// BUTTONS
	$scope.registerBack = function() {
		$location.path('/register');
	};
	$scope.loginBack = function() {
		$location.path('/login');
	};
	$scope.chatBack = function() {
		$location.path('/chat');	
	};
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
							$sessionStorage.password = response.data[i].password;
							$http.put('/users/' + $sessionStorage.id, $scope.users).then(function(response) {
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
		}
	};
}]);

//------------------------------------------------ FACTORIES & DIRECTIVES -------------------------------------------//
app.factory('validation', [function(){
	return {
		long: function(value){
			return value.length > 30;
		},
		short: function(value){
			return value.length < 5;
		},
		regex: function(value){
			var letters = /^[0-9a-zA-Z]+$/;
			return !letters.test(value);
		},
		usernameTaken: function(value){
			
		}
	};
}]);

app.directive('avatarDropdown', [function(){
	return {
		restrict: 'E',
		/*
		*** Modify this, needs its own scope and controllers scope  ***
		scope: {
			'title': '@'
		},
		*/
		templateUrl: '../../templates/avatar-dropdown.html'
	};
}]);

app.directive('showPasswordEye', [function(){
	return {
		restrict: 'E',
		templateUrl: '../../templates/show-password.html'
	};
}]);


//------------------------------------------------ REGISTERCONTROLLER -------------------------------------------//

app.controller('registerController', ['$scope','$location', '$http', 'validation', 'avatars', function($scope, $location, $http, validation, avatars){
	//Messages for username validation
	$scope.$watch('users.username', function(newValue, oldValue){
		if (newValue) {
			$scope.tooLong = validation.long(newValue);
			$scope.tooShort = validation.short(newValue);
			$scope.regex = validation.regex(newValue);
			$scope.usernameIsTaken = false;
			$http.get('/users').then(function(response){
				for ( var i = 0; i < response.data.length; i++ ) {
					if (newValue == response.data[i].username){
						$scope.usernameIsTaken = true;
					}
				}
			});
		}

		$scope.$watch('users.password', function(newValue, oldValue){
			if (newValue) {
				$scope.tooShortPassword = validation.short(newValue);
				$scope.tooLongPassword = validation.long(newValue);
				$scope.passwordRegex = validation.regex(newValue);
			}
		});
	});

	$scope.avatars = avatars;
	$scope.users = {};
	$scope.users.avatar = $scope.avatars[10];
	$scope.users.online = false;

	$scope.registerSubmit = function() {
		$http.post('/users', $scope.users).then(function(response) {

			var modal = document.getElementById('login-modal');

			modal.style.display = "block";

			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
			};	
		});
	};

	$scope.modalLogin = function(){
		$location.path('login');  
		console.log('registered');
	};

}]);
