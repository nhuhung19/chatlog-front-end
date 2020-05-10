import React, { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/Header"
import Rooms from "./components/Rooms"
import Home from "./components/Home"
import Chat from "./components/Chat"
import { Route, Switch, Link } from "react-router-dom";
import socket from "./utils/socket"
// const socket = socketIOClient("https://chatlog-back-end.herokuapp.com/");

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    askUser()
  }, [])

  const askUser = () => {
    let userName = prompt("please enter your name")
    if (!userName) {
      return askUser()
    }

    socket.emit("login", userName, res => {
      if (res && !res.ok) return alert("Cannot login")
      else {
        setUser(res.data)
      }
    })
  }
  const leaveRoom = () => {
    socket.emit("leaveRoom", null, res => {
      if (res && res.ok) {
        console.log(res.error)
      }
    })
  }

  return (
    <div className="w-100 h-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Chat App Pro</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
      </nav>
      <div className="row w-100 h-100">
        <div className="col-lg-2 border-right h-100">
          <div className="side-bar">
            <Header user={user} />
            <Rooms />
          </div>
          <div className="footer-bar pb-5 pl-5">
            <Link className="pb-5" to="/"> <button className="btn btn-outline-warning" onClick={leaveRoom}>Leave Room</button></Link>
          </div>
        </div>
        <div className="col-lg-10">
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/chat" exact user={user} render={(props) => <Chat {...props} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
