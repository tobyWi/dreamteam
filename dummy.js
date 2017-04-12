
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
        "name" : "Ugly Fish",
        "src" : "assets/img/av01.png"
    },
    "online" : false,
    "username" : "Izabella",
    "password" : "hejhej"
},
{  
    "avatar" : {
        "name" : "Zombie",
        "src" : "assets/img/av02.png"
    },
    "online" : false,
    "username" : "Colin",
    "password" : "hejhej"
},
{   
    "avatar" : {
        "name" : "Rico Tequila",
        "src" : "assets/img/av03.png"
    },
    "online" : false,
    "username" : "Tobias",
    "password" : "hejhej"
},
{ 
    "avatar" : {
        "name" : "Doggy style",
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
    "username" : "Farbror Melker",
    "password" : "hejhej"
},
{   
    "avatar" : {
        "name" : "Rico Tequila",
        "src" : "assets/img/av03.png"
    },
    "online" : false,
    "username" : "horselover",
    "password" : "hejhej"
},
{ 
    "avatar" : {
        "name" : "Doggy style",
        "src" : "assets/img/av04.png"
    },
    "online" : false,
    "username" : "coolgirl95",
    "password" : "hejhej"
},
{ 
    "avatar" : {
        "name" : "Zombie",
        "src" : "assets/img/av02.png"
    },
    "online" : false,
    "username" : "Svampen",
    "password" : "hejhej"
},
{   
    "avatar" : {
        "name" : "Rico Tequila",
        "src" : "assets/img/av03.png"
    },
    "online" : false,
    "username" : "Kakan",
    "password" : "hejhej"
},
{ 
    "avatar" : {
        "name" : "Doggy style",
        "src" : "assets/img/av04.png"
    },
    "online" : false,
    "username" : "dinvarstamardrom",
    "password" : "hejhej"
}]) 

db.conversations.insert([{
    "messages" : {
     "content" : "Hej Allihopa!",
     "sender" : "Colin",
     "senderavatar" : "assets/img/av02.png",
     "date" : "2017-04-11T13:46:04.161Z"
    }
},
{
     "messages" : {
         "content" : "Hej Colin! Hur mår barnen?",
         "sender" : "dinvarstamardrom",
         "senderavatar" : "assets/img/av04.png",
         "date" : "2017-04-11T14:28:12.544Z"
     }
}])  


