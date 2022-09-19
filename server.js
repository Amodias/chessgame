var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));
app.get('/', function(req, res){ res.sendFile(__dirname + '/index.html');;
});

var clients = [];

//Whenever someone connects this gets executed
io.on('connection', function(socket){
   console.log('A user connected');
   
   io.sockets.on('connect', function(client) {
      clients.push(client);
  
      client.on('disconnect', function() {
          clients.splice(clients.indexOf(client), 1);
      });
  });
   


   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      clients.splice(clients.indexOf(client), 1);
      console.log('A user disconnected');
   });

   console.log(clients);

});
http.listen(3000, function(){
   console.log('listening on *:3000');
});
