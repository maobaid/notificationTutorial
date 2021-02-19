var express = require('express'),
    app = express(), 
    server = require('http').createServer(app),
    io = require("socket.io")(server, {
    cors: {
      origin: '*',
    }
  });
server.listen(5000, () =>{
    console.log("started on port 5000");
});

io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });
});