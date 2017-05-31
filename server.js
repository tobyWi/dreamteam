var express = require('express');
var app = express();
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('chatdatabase', ['users', 'conversations']);
var bodyParser = require('body-parser');




app.listen(3000, function() {
	console.log("Server has started!")
});


app.use(express.static(path.join(__dirname + '/public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());


// See your work in a browser by going to "localhost:3000"
// app.listen(3000, function(){
// 	console.log("Chat server has started");
// });

// ------------------------------------ USERS -------------------------------------//
//Tobbe Komplettering

app.get('/page/:id', function(request, response) {
    var numberOfUsers = 5; 
    var skipValue = (request.params.id * numberOfUsers) - numberOfUsers;
    db.users.find({}).limit(numberOfUsers).skip(skipValue, function (error, document) {
        response.send(document);
    })
})

// Checks & displays any messages sent to the server/database.
app.get('/users', function(request, res) {
	db.users.find(function(err, docs) {
		//console.log(docs);
		res.json(docs);
	});
});


// Adding a user to the database (users)
app.post('/users/', function(req, res) {
	//console.log(req.body);
	db.users.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

// Deleting a user of the database (users)

app.delete('/users/:id', function(req, res) {
	var id = req.params.id;
	//console.log(id);
	db.users.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});


// --------------------------------- OFFLINE / ONLINE -------------------------------------//
app.get('/users/:id', function(req, res) {
	var id = req.params.id;
	db.users.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

// login
app.put('/users/:id', function(req, res) {
	var id = req.params.id;
	db.users.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: { online: true }},
		new: true}, function (err, doc) {
			res.json(doc);
	});
});

app.post('/users/:id', function(req,res) {
	db.users.insert(req.body, function(req, res) {
		res.json(doc);
	});
});

// logout

app.put('/users/1/:id', function(req, res) {
	var id = req.params.id;

	db.users.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: { online: false }},
		new: true}, function (err, doc) {
			res.json(doc);
	});
});


// ------------------------------------ MESSAGES/PUBLIC -------------------------------------//
// Checks & displays any messages sent to the server/database.

app.get('/conversations', function(request, res) {
	db.conversations.find(function(err, docs) {
		res.json(docs);
	});
});

// Adding a message

app.post('/conversations/', function(req, res) {
	db.conversations.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

// ------------------------------------ MESSAGES/PRIVATE-------------------------------------//
app.get('/privateMessage', function(req, res) {
	db.privateMessage.find(function(err, docs){
		res.json(docs);
	});
});

// Send a private message
app.post('/privateMessage/', function(req, res) {
	db.privateMessage.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

// Get the ID of the user you want to send a message to
app.get('/users/private/:id', function(req, res) {
	var id = req.params.id;
	db.users.find({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

// ----------------------------------- EDIT USER ----------------------------------- //
// If the user wants to unregister
app.delete('/users/3/:id', function(req, res){
	var id = req.params.id;
	db.users.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

// If the user wants to change password
app.put('/users/password/:id', function(req, res){
	var id = req.params.id;
	db.users.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {password: req.body.password}},
		new: true }, 
		function(err, doc){
			res.json(doc);
		}
	);
});

// If the user wants to change avatar
app.put('/users/avatar/:id', function(req, res){
	var id = req.params.id;
	db.users.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {avatar: req.body.avatar}},
		new: true }, 
		function(err, doc){
			res.json(doc);
		}
	);
});