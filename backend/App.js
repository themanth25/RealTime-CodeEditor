const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const MONGODB_URI = 'mongodb+srv://bhavesh_05:Bhavesh2017@cluster0-yuok1.mongodb.net/codeshare?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(authRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
mongoose.connect(MONGODB_URI)
    .then(res => {
        console.log("Connected"); //database connected 
        const server = app.listen(3005);
        const io = require('./socket').init(server);
        io.on("connection", socket => { //client connected
            console.log("Client Connected");
            socket.on("disconnect", () => console.log(`Disconnected ${socket.id}`));
            socket.on('join', (room) => {
                console.log(`Socket ${socket.id} joined ${room}`);
                socket.join(room); //connect the browser
            });
            socket.on('chat', data => {  //sends the data to frontend 
                const { message, room } = data;
                // console.log(message);
                io.to(room).emit('chat', message);
            })
        })
    })
    .catch(err => {
        console.log(err);
    });

// const server = app.listen(3005);
// const io = require('./socket').init(server);
// io.on("connection", socket => {
//     console.log("Client Connected");
//     socket.on("disconnect",()=> console.log(`Disconnected ${socket.id}`));
//     socket.on('join',(room)=>{
//         console.log(`Socket ${socket.id} joined ${room}`);
//         socket.join(room);
//     });
//     socket.on('chat',data =>{
//         const {message, room} = data;
//         // console.log(message);
//         io.to(room).emit('chat',message);
//     })
// })