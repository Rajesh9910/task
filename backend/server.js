const express = require('express');
const http = require("https")
const AuthRouter = require('./routes/userRouter');
require("dotenv").config()
const dbconnect = require('./config/db');
const bodyParser = require('body-parser');
const cors = require("cors");
const TaskRouter = require('./routes/taskRouter');
const { ChatRouter } = require('./routes/chatRouter');
const app = express();
const { Server } = require("socket.io")

dbconnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

setInterval(() => {
    http.get('https://task-a4z2.onrender.com', (res) => {
        console.log('Route called successfully');
    })
}, 10 * 60 * 1000);

app.use('/api/v1/', AuthRouter)
app.use('/api/v1/', TaskRouter)
app.use('/api/v1/', ChatRouter)

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://task-lovat-three.vercel.app"]
    }
})

io.on("connection", (socket) => {
    console.log("connection found")

    socket.on("add-msg", (obj) => {
        io.emit("get-msg", obj)
    })

    socket.on("typing", (obj) => {
        io.emit("show-animation", obj)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})