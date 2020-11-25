const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")().listen(server)
const port = 3000 

// socket io
io.on("connection", socket => {
  console.log("A user is connected! Hurray!")

  socket.on("chatMessage", message => {
    console.log(message)

    // upon receiveing message emit the same to all the listeners
    io.emit("chatMessage",message)
  })
})

server.listen(port,()=> console.log(`server is running at port ${port}`))