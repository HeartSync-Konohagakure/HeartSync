if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const { createServer } = require('node:http')
const { Server } = require('socket.io');
const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://heart-sync-e87b6.web.app"
    }
})

const router = require('./router');
const PORT = process.env.PORT || 3000
const extractToken = require('./helpers/socket');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

let userOnline = []
io.on('connection', async (socket) => {
    let userFromToken = await extractToken(socket.handshake.auth.access_token)
    userOnline.push({
        idUserOnline : userFromToken.id
    })
    console.log(userOnline)
    io.emit("user:online", userOnline)

    socket.on("message:new", (newText) => {
        io.emit("message:update", newText)
    })

    socket.on("disconnect", ()=> {
        userOnline = userOnline.filter(user => {
            return user.idUserOnline !== userFromToken.id
        })
        io.emit("user:online", userOnline)
    })
})

module.exports = { app, server, PORT }