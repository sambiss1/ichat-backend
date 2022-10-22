require("dotenv").config();
const http = require('http')
const app = require("./app");
const cors = require("cors");
const Message = require("./models/messagesModel")
const messagesControllers = require("./controllers/messagesControllers")


const { Server } = require("socket.io");


app.use(cors())


const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);


const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});



io.on('connection', (socket) => {

    // console.log('a user connected');

    // socket.on('chat message', (msg) => {
    //     io.emit('chat message', msg);
    // });

    socket.on("login", ({ username }) => {
        console.log(`${username} is connected`)

    })

    socket.on("test-send", ({message}) => {
        console.log(`The message : ${message}`)
    })
    socket.on("join", ({ userId, room }) => {
        socket.join(room)
        socket.broadcast.to(room).emit("join-room-message", () => {
            console.log(`${userId} is joined this room : ${room}`)
        })

        socket.on("send-message", (data) => {
            socket.to(room).emit("receive-message", data)
        }) 
        

        // socket.on("send-message", (data) => {
        //     if (userId === data.sender) {
        //         socket.to(room).emit("receive", {
        //             conversationId: data.conversation,
        //             sender: data.sender,
        //             message: data.message,
        //         })
        //         console.log(data)
        //     }

        // })

    })


});


server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening socket user on ' + bind);
});

server.listen(port)

