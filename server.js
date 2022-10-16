var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
app.use(express.static(__dirname));
app.get('/', function(req, res){ res.sendFile(__dirname + '/index.html');;
});

function removeItemOnce(arr, value) {
   var index = arr.indexOf(value);
   if (index > -1) {
     arr.splice(index, 1);
   }
   return arr;
 }


users = {};
user = {};
array = [];
room_array = [];
user_connected_in_room = {};
var side ;
io.on('connection', function(socket){
   console.log('A user connected');
   socket.userID = randomId();
   socket.username = socket.handshake.query.username; 
   users[socket.userID] = {userID : socket.userID ,username : socket.username ,socketID :socket.id}; 
   socket.emit("users", users);
   user[socket.userID] = {userID : socket.userID ,username : socket.username ,socketID :socket.id}; 
   
   
   socket.broadcast.emit("user-connected", JSON.stringify(user[socket.userID]));
   
   socket.on('initiateroom' , function(socketid){
      var room = randomId();
      socket.broadcast.to(socketid).emit('redirect', room);

      socket.emit('redirect', room);

   });
   socket.on('createroom', function(room){
      socket.join(room); 
      side = 'b';
      if(user_connected_in_room[room] != null ){
         user_connected_in_room[room].push(socket.id);
      }else{
         user_connected_in_room[room] = Array();
         user_connected_in_room[room].push(socket.id);
      }
      array = user_connected_in_room[room] ;
      console.log(user_connected_in_room[room]);
      socket.broadcast.to(array[0]).emit('side', 'b');
      
   });
   socket.on('changeside' ,function(room){
      array = user_connected_in_room[room];
      if(side == 'b'){
         socket.broadcast.to(array[1]).emit('side', 'w');
         side ='w';
      }else{
         socket.broadcast.to(array[0]).emit('side', 'b');
         side ='b';

      }
   });
   socket.on('changepawn', function(room , idpawn , idcase){
      console.log(idpawn , idcase);
      socket.broadcast.to(room).emit('applychangepawn', idpawn , idcase);
   });
   socket.on('disconnect', function () {
      delete users[socket.userID];
      socket.broadcast.emit("user-disconnected", {
         userID: socket.userID,
         username: socket.username,
         connected: false,
       });
       for (const key in user_connected_in_room) { 
         array = user_connected_in_room[key];
         for (element of array){

            if(element  == socket.id){
               delete user_connected_in_room[key];
            }
         }
     }
      console.log('A user disconnected');
   });

});
http.listen(3000, function(){
   console.log('listening on *:3000');
});