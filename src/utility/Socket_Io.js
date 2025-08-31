import { io } from "socket.io-client";
const socketClient = io("https://codepad-server.onrender.com/rooms", { autoConnect: false });
export default socketClient;

// https://codepad-server.onrender.com/rooms