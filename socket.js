const app = require("./app")
const cors = require("cors");
app.use(cors())
const server = http.createServer(app);
// Socket io package 
const { Server } = require("socket.io");

const io = new Server(server);

let port = 8000;
io.on('connection', (socket) => {
    console.log('a user connected');
}); 

server.listen(port, () => {
    console.log("Socket listen on port 8000")
})