
/*Hej välkommen till Dummydata!    
	Gör såhär:
	1. Gå in i din terminal
	2. Bra gjort!
	3. Sen du ska navigera dig till dreamteam-mappen
	4. Sen skriver du node dummy
	5. Klart!
*/


var mongojs = require('mongojs');
var db = mongojs('chatdatabase', ['users', 'conversations']);

db.users.insert([{   
	"avatar" : {
		"name" : "Weird Unicorn",
		"src" : "assets/img/av05.png"
	},
	"online" : false,
	"username" : "izabella",
	"password" : "lalala"
},
{  
	"avatar" : {
		"name" : "coco crayfish",
		"src" : "assets/img/av10.png"
	},
	"online" : false,
	"username" : "Colin",
	"password" : "hejhej"
},
{   
	"avatar" : {
		"name" : "Rico Tequila",
		"src" : "assets/img/av08.png"
	},
	"online" : false,
	"username" : "Tobias",
	"password" : "hejhej"
},
{ 
	"avatar" : {
		"name" : "Cool Giraffe",
		"src" : "assets/img/av04.png"
	},
	"online" : false,
	"username" : "Daniel",
	"password" : "hejhej"
},
{  
	"avatar" : {
		"name" : "Zombie",
		"src" : "assets/img/av02.png"
	},
	"online" : false,
	"username" : "zombie",
	"password" : "lalala"
},
{   
	"avatar" : {
		"name" : "Fly",
		"src" : "assets/img/av06.png"
	},
	"online" : false,
	"username" : "horselover",
	"password" : "hejhej"
},
{ 
	"avatar" : {
		"name" : "Doggy style",
		"src" : "assets/img/av11.png"
	},
	"online" : false,
	"username" : "coolgirl95",
	"password" : "hejhej"
},
{ 
	"avatar" : {
		"name" : "Leopard",
		"src" : "assets/img/av07.png"
	},
	"online" : false,
	"username" : "Svampen",
	"password" : "hejhej"
},
{   
	"avatar" : {
		"name" : "Mr. French Fries",
		"src" : "assets/img/av09.png"
	},
	"online" : false,
	"username" : "admin",
	"password" : "lalala"
},
{ 
	"avatar" : {
		"name" : "Worm",
		"src" : "assets/img/av03.png"
	},
	"online" : false,
	"username" : "dinvarstamardrom",
	"password" : "hejhej"
}]) 

db.conversations.insert([{
	"messages" : {
	 "content" : "Hej Allihopa!",
	 "sender" : "Colin",
	 "senderavatar" : "assets/img/av10.png",
	 "date" : "2017-04-11T13:46:04.161Z"
	}
},
{
	 "messages" : {
		 "content" : "Hej Colin! Hur mår barnen?",
		 "sender" : "dinvarstamardrom",
		 "senderavatar" : "assets/img/av01.png",
		 "date" : "2017-04-11T14:28:12.544Z"
	 }
},
{
	 "messages" : {
		 "content" : "Braaaaaaaains",
		 "sender" : "zombie",
		 "senderavatar" : "assets/img/av02.png",
		 "date" : "2017-04-16T14:28:12.544Z"
	 }
}])  


