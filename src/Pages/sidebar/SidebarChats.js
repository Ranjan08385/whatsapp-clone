import React from 'react'
import './SidebarChats.css'
import {Avatar, IconButton} from '@material-ui/core'

function SidebarChats() {
    return (
        <div className="sidebarChats">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>Last Message</p>
            </div>
        </div>
    )
}

export default SidebarChats
