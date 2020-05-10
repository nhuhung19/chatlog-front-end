import React, { useEffect, useState, useRef } from 'react';
import socket from "../utils/socket"
const moment = require('moment');

export default function Chat(props) {
    const [chat, setChat] = useState("")
    const [chatLog, setChatLog] = useState([])
    const chatLogRef = useRef(chatLog)

    useEffect(() => {
        chatConnection()
    }, [])

    const chatConnection = () => {
        socket.on("messages", (data) => {
            console.log(data)
            chatLogRef.current.push(data)
            setChatLog([...chatLogRef.current])
            console.log(chatLogRef)
        })
    }

    const handleChange = (e) => {
        setChat(e.target.value)
    }

    console.log(props.user)
    const submitChat = (e) => {
        e.preventDefault()
        let timeCreate = new Date().getTime()
        let chatObj = {
            text: chat,
            name: props.user,
            createdAt: moment(timeCreate, "x").format("L LTS")
        }
        socket.emit("chat", chatObj, res => {
            if (res && !res.ok) {
                alert(res.message)
            }
            else {
                console.log("chat was sent")
            }
        })
        setChat("")
    }


    const chatRender = () => {
        return chatLog.map((el, i) => <p key={i}><span className="text-success font-italic" style={{fontSize: "12px"}}>{el.createAt} </span><strong>{el.name}</strong>: {el.text} </p>)
    }
    return (
        <div>
            <div className="w-100">
                <div className="chat-log text-danger">
                    {chatRender()}
                </div>
                <div className="chatbox w-100">
                    <form className="w-75 form-inline ml-5" onChange={handleChange} onSubmit={submitChat} action="">
                        <div className="w-75 form-group mx-sm-3 mb-2">
                            <input className="w-100 form-control" value={chat} name="chat" type="text" placeholder="send a message" />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
