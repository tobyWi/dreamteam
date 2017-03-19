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

app.controller('sidebarController', ['$scope', '$location', function($scope, $location){
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
	$scope.users = [
		{
			name: 'user',
			password: 'xxxxx',
			avatar: 'assets/img/test1.jpg',
			online: true
		},
		{
			name: 'user1',
			password: 'xxxxx',
			avatar: 'assets/img/av01.png',
			online: true
		},
		{
			name: 'user2',
			password: 'xxxxx',
			avatar: 'assets/img/av02.png',
			online: false
		},
		{
			name: 'user3',
			password: 'xxxxx',
			avatar: 'assets/img/av03.png',
			online: false
		}
	];		
}]);

app.controller('chatController', ['$scope', '$location', function($scope, $location){
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
}]);

app.controller('loginController', ['$scope', '$location', function($scope, $location){
	$scope.submit = function (credentials) {
		$scope.errorMessage = false;
		if (credentials.user === 'user2' && credentials.password === 'test123') {
			$location.path('/chat/public');
		} else {
			alert('Vi hittar inget användarnamn. Registrera dig hos oss, det är helt gratis!!');
		}
	};
}]);

app.controller('registerController', ['$scope', function($scope){
 
	$scope.RegistrationController = function($scope, $location) {
		var model = this;
		$scope.message = "";
		$scope.user = {
			username: "",
			password: "",
			confirmPassword: ""
	};
		
		$scope.registerSubmit = function() {
			if ( $scope.password === $scope.confirmPassword ) {
				$scope.message = "Congratulations " + $scope.userName + ".  You are now registered!";

				setInterval(function() {
					$location.path('/login');
					$scope.$apply();
				}, 2000);
				
			} 
			else {
				$scope.message = "The passwords you entered do not match!";
			}
		};
	};
}]);


// Avatar Dropdown

app.controller('chooseAvatar', function($scope) {

	// DROPDOWN

	$scope.avatarDropdown = function() {
		document.getElementById('dropper').classList.toggle('dropdown-show');
	}

	window.onclick = function(event) {
		if (!event.target.matches('.btn')) {

		var drop = document.getElementsByClassName("dropdown-menu");
		var i;

		for (i = 0; i < drop.length; i++) {
			var openDrop = drop[i];

				if (openDrop.classList.contains('dropdown-show')) {
					openDrop.classList.remove('dropdown-show');
				}
			}
		}
	}

	// AVATAR

	$scope.showAvatar = function($scope) {

		// IF AVATAR EXISTS ALREADY, DELETE BOTH AVATAR AND CHECKBOX & REPLACE WITH NEW CHOICE

		var removePhoto = document.getElementById('avatar');
		var removeCheck = document.getElementById('noAvatar');
		
		if ( removePhoto.hasChildNodes() ) {
			removePhoto.removeChild(removePhoto.childNodes[0]);

			while (removeCheck.hasChildNodes()) {   
			    removeCheck.removeChild(removeCheck.firstChild);
			}
		}

		var img = document.createElement('img');

		var photo = document.getElementById('avatar').appendChild(img);
		photo.setAttribute('class', 'avatar-img');


		//  behöver en loop för att spotta ut varje avatarbild här…
	
		photo.setAttribute('src', 'assets/img/av01.png');

		

		// CHECKBOX FOR NO AVATAR

		var check = document.createElement('input');

		var noAvatarCheckbox = document.getElementById('noAvatar').appendChild(check);
		noAvatarCheckbox.setAttribute('type' , 'checkbox');
		noAvatarCheckbox.setAttribute('ng-model' , 'removeAll');
		noAvatarCheckbox.setAttribute('id' , 'removeAll');

		var p = document.createElement('p');

		var noAvatarWords = document.getElementById('noAvatar').appendChild(p);
		noAvatarWords.innerHTML = "remove avatar";

	};

	// NO AVATAR CHOSEN

	$scope.listAvatar = function($scope){
		var removePhoto = document.getElementById('avatar');
		var removeCheck = document.getElementById('noAvatar');
		
		if ( removePhoto.hasChildNodes() ) {
			removePhoto.removeChild(removePhoto.childNodes[0]);

			while (removeCheck.hasChildNodes()) {   
			    removeCheck.removeChild(removeCheck.firstChild);
			}
		}
	}

});




