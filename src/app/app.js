// INITIAL VARIABLES & DEPENDENCIES

const express= require('express');
var app = express();
var port = 3300;
const cors = require('cors');
app.use(cors());

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
var http = require('http').createServer(app)
var io = require('socket.io')(http)
*/

const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017/';
let db;


// SERVER STARTUP

MongoClient.connect(url, { useNewurlParser: true }, function(err, client) {
    if (err)
     console.log("CANNOT CONNECT")
    else {
        db = client.db("newsMonkey");
        app.listen(port, function() {
            console.log('Node API is running on port: ' + port);
        })
    }
})

app.get('/', function(res, res) {
    console.log("GET");
    res.send('Node API works');
})


// AUTHENTICATION APIS

app.post('/login', (req, res) => {
    console.log (req.body.email)
    db.collection('users').findOne( { email: req.body.email }, function (err, user) {
        if (err) {
           return res.status(500).send("Error");
        }
        const str = encodeURIComponent("Invalid user name");
        if (!user) {
            console.log("Login Failed")
            res.send( {auth: false, token: null, type: null});
        }
        else {
            const pwdValid = bcrypt.compareSync(req.body.password, user.password);
            if (!pwdValid) 
               return res.status(401).send( { auth: false, token: null, type: '' });
            if (user.type == 'Customer')
                var token = jwt.sign( {id: user._id}, "supermonkeyflies", { expiresIn: 3600 });
            else if (user.type == 'Admin')
                var token = jwt.sign( {id: user._id}, "sneakymonkey", { expiresIn: 3600 });
            res.status(200).send( {auth: true, token: token, type: user.type });
        }
    })
})

app.post('/authCustomer', (req, res) => {
    console.log (req.body.token)
    var token = req.body.token;
    jwt.verify(token, "supermonkeyflies", function(err,decoded) {
        if (err) {
            console.log("Inavlid Access");
            res.status(403).send( {auth: false, token: null, type: null})
        } else {
            console.log("Authenticated successfully")
            res.status(200).send( {auth: true, token: req.body.token })
        }
    });
})

app.post('/authAdmin', (req, res) => {
    console.log (req.body.token)
    var token = req.body.token;
    jwt.verify(token, "sneakymonkey", function(err,decoded) {
        if (err) {
            console.log("Inavlid Access");
            res.status(403).send( {auth: false, token: null, type: null})
        } else {
            console.log("Authenticated successfully")
            res.status(200).send( {auth: true, token: req.body.token })
        }
    });
})

app.post('/register', (req, res) => {
    console.log (req.body);
    var hp = bcrypt.hashSync(req.body.password, 8);
    var user = {
        email: req.body.email,
        password: hp,
        type: req.body.type,
        name: req.body.name
    }
    db.collection('users').insertOne( user, (err, result) => {
        if (err) {
            console.log("Insert User Error");
            res.send( {auth: false, token: null, type: null});
        }
        else {
            if (user.type == 'Customer')
                var token = jwt.sign( {id: result.id }, 'supermonkeyflies', { expiresIn: 3600 });
            else if (user.type == 'Admin')
                var token = jwt.sign( {id: result.id }, 'sneakyadmin', { expiresIn: 3600 });
            res.status(200).send( { auth: true, token: token });
        }
    })
})

app.get('/users', (req, res) => {
    db.collection('users').find().toArray((err, result) => {
        if (err)
            console.log("Find Users Error");
        else {
            res.json(result);
        }
    })
})


// NEWS ITEMS API

app.get('/newslist', (req, res) => {
    console.log("Get list");
    db.collection('news').find().sort( { publishedAt: -1 } ).toArray((err, data) => {
        if(err)
            throw err
        else {
            //console.log(data)
            res.json(data)
        } 
    })
})

app.post('/addNews', (req,res)=>{
    db.collection('news').insertOne(req.body, (err, data) => {
        if(err)
            throw err
        else {
            console.log(data)
            res.status(200).send({ msg: "Created news successfully"})
        } 
    })
})

app.put('/updateNews', (req, res) => {
    console.log(req.body)
    db.collection('news').update( {'title': req.body.title},
        {$set: {'description': req.body.description, 'url':req.body.url, 'imageUrl':req.body.imageUrl, 'publishedAt':req.body.publishedAt}},
        (err, data) => {
        if(err) {
            throw err
        } else {
            console.log("Updated");
            res.status(200).send({ msg: "Updated news successfully"})
        } 
    })
})

app.put('/deleteNews', (req, res) => {
    console.log(req.body)
    db.collection('news').deleteOne({'title': req.body.title}, (err, result) => {
        if(err) {
            throw err
        } else {
            console.log(result.deletedCount);
            if (result.deletedCount > 0) {
                res.status(200).send({ msg: "Deleted news successfully"})
            } else {
                res.status(500).send( { msg: "Internal Server Error" });
            }
        } 
    })
})


// CHAT SCREEN FEATURES
/*
io.on('connection',(socket) => {
    console.log('a user connected')
    socket.on('message',(msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg)
    })
})

http.listen(3400,() => {
    console.log('Chat is on port 3400')
})
*/