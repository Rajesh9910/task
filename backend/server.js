const express = require('express');
const http = require("https")
const AuthRouter = require('./routes/userRouter');
require("dotenv").config()
const dbconnect = require('./config/db');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
