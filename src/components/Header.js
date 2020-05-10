import React from 'react'

export default function Header(props) {
    return (
        <h4 className="border-bottom pl-4 my-3 pb-3">
           Hello<span className="text-success"> {props.user? props.user.name : "Guest"}</span>
        </h4>
    )
}
