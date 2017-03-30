var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('chatdatabase', ['chatdatabase']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

// Checks & displays any messages sent to the server/database.

app.get('/chatdatabase', function(request, res) {
	console.log("I received a GET request!");

	db.chatdatabase.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

// Adding a member to the database (chatdatabase)

app.post('/chatdatabase/', function(req, res) {
	console.log(req.body);
	db.chatdatabase.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});


// Use for updating an already existing user

app.put('/chatdatabase/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contacts.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {username: req.body.username, password: req.body.password, avatar: req.body.avatar, online: true}},
		new: true}, function (err, doc) {
			res.json(doc);
	});
});



// See your work in a browser by going to "localhost:3000"

app.listen(3000, function(){
	console.log("Chat server has started");
});