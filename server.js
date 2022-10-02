var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
app.use(express.static(__dirname));
app.get('/', function(req, res){ res.sendFile(__dirname + '/index.html');;
});



users = {};

io.on('connection', function(socket){
   console.log('A user connected');
   socket.userID = randomId();
   socket.username = socket.handshake.query.username; 
   users[socket.userID] = {userID : socket.userID ,username : socket.username ,socketID :socket.id}; 
   console.log(users);
   socket.emit("users", users);
   socket.broadcast.emit("user-connected", {
      userID: socket.userID,
      username: socket.username,
      connected: true,
      messages: [],
    });
   

  

   socket.on('disconnect', function () {
      console.log(users);
      delete users[socket.userID];
      socket.broadcast.emit("user-disconnected", {
         userID: socket.userID,
         username: socket.username,
         connected: false,
       });
      console.log('A user disconnected');
   });

});
http.listen(3000, function(){
   console.log('listening on *:3000');
});
