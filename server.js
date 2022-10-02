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
user = {};
io.on('connection', function(socket){
   console.log('A user connected');
   socket.userID = randomId();
   socket.username = socket.handshake.query.username; 
   users[socket.userID] = {userID : socket.userID ,username : socket.username ,socketID :socket.id}; 
   console.log(users);
   socket.emit("users", users);
   user[socket.userID] = {userID : socket.userID ,username : socket.username ,socketID :socket.id}; 
   socket.broadcast.emit("user-connected",
    user[socket.userID]);
   
   socket.on('initiateroom' , function(socketid){
      var room = randomId();
      socket.broadcast.to(socketid).emit('redirect', room);
      socket.emit('redirect', room);

   });
   socket.on('createroom', room =>{
     socket.join(room); 
     console.log('hey bitches');
   })
   socket.on('changepawn', function(room , gamebox){
      console.log(gamebox);
      socket.broadcast.to(room).emit('applychangepawn', gamebox);
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
