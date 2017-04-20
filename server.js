const express = require('express');
const path = require('path');
//const http = require('http');
const bodyParser = require('body-parser');
const api = require('./server/api');
const app = express();
const port = process.env.PORT || '3000';
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose   = require('mongoose');
let http = require('http').Server(app);

let io = require('socket.io')(http);
io.on('connection', (socket) => {
  	console.log('user connected');

    socket.on('newUser', (user) => {
        
    });
  	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
  
  	socket.on('sendMessage', (message) => {
          
  	});
    socket.on('deleteMessage', (message) => {
        socket.emit('message-added');    
    });
});

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api',api);
app.all('*', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
 	next();
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on localhost:${port}`));