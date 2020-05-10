import React, { useState, useEffect } from 'react'
import socket from "../utils/socket"
import { Link } from "react-router-dom"


export default function Rooms() {
    const [rooms, setRooms] = useState([])
    const [roomObj, setRoomObj] = useState(null)
    useEffect(() => {
        socket.on("rooms", data => setRooms(data))
        socket.on("selectedRoom", data => setRoomObj(data)) //data should be room object
    }, [])

    const joinRoom = (id) => {
        //check if you are in a room
        if (roomObj && !roomObj.room.members.includes(roomObj.room.user)) {
            socket.emit("leaveRoom")
        }
        //call socket.emit("leaveRoom")
        socket.emit("joinRoom", id)
    }
    if (roomObj) {
        console.log(roomObj)
    }
    console.log(rooms)

    return (
        <div className="pl-5">
            {rooms.map(el =>
                <div className="mt-3">
                    <Link to="/chat" 
                     onClick={() => joinRoom(el._id)} 
                     key={el._id}>
                        <span className={roomObj && el.members.includes(roomObj.user) ? "font-weight-bold" : ""}>
                            {el.name}({el.members.length})
                        </span>
                    </Link>
                </div>)}
        </div>
    )
}
