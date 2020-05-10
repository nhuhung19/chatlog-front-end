import socketIOClient from "socket.io-client";
// const socket = socketIOClient("http://localhost:5000");
const socket = socketIOClient("http://chatlog-back-end.herokuapp.com/");

export default socket