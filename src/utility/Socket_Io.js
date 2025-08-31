import { io } from "socket.io-client";
const socketClient = io("http://localhost:4000/rooms", { autoConnect: false });
export default socketClient;

// https://codepad-server.onrender.com/rooms