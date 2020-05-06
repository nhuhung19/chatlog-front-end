import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
// const socket = socketIOClient("http://localhost:5000");
const socket = socketIOClient("https://chatlog-back-end.herokuapp.com/");
const moment = require('moment');

function App() {
  const [chat, setChat] = useState("")
  const [chatLog, setChatLog] = useState([])
  const [name, setName] = useState("Unknown")
  const chatLogRef = useRef(chatLog)


  useEffect(() => {
    let user = prompt("please enter your name")
    if (user === "") {
      user = "Unknown"
    }
    setName(user)
    console.log(name)
    chatConnection()
  }, [])

  const chatConnection = () => {
    socket.on("messages", (msg) => {
      chatLogRef.current.push(msg)
      setChatLog([...chatLogRef.current])
    })
  }

  const handleChange = (e) => {
    // console.log(e.target)
    setChat(e.target.value)
  }

  const submitChat = (e) => {
    // console.log(name)
    moment.unix(Number)
    e.preventDefault()
    let timeCreate = new Date().getTime()
    let chatObj = {
      text: chat,
      name: name,
      createdAt: moment(timeCreate, "x").format("L LTS")
    }
    socket.emit("chat", chatObj, err => {
      if (err) {
        console.log(err)
      } else {
        console.log("chat was sent")
      }
    })
    setChat("")
  }

  const chatRender = () => {
    return chatLog.map((el, i) => <p key={i}><span className="text-success">{el.createdAt} </span><strong>{el.name}</strong>: {el.text} </p>)
  }


  return (
    <div className="w-100 h-100">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Chat App Pro</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
      </nav>
      <div className=" w-100">
        <div className="chatbox w-100">
          <form className="w-75 mx-auto form-inline" onChange={handleChange} onSubmit={submitChat} action="">
            <div class="w-75 form-group mx-sm-3 mb-2">
              <input className="w-100 form-control" value={chat} name="chat" type="text" placeholder="send a message" />
            </div>
            <button type="submit" class="btn btn-primary mb-2">Send</button>
          </form>
        </div>
        <div className="ml-5 mt-4 chat-log text-danger">
          {chatRender()}
        </div>
      </div>
    </div>
  );
}

export default App;
