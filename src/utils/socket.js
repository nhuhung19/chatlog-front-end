import socketIOClient from "socket.io-client";
// const socket = socketIOClient("http://localhost:5000");
const socket = socketIOClient("https://chatlog-back-end.herokuapp.com/");

export default socket