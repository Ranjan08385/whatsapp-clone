import React, {useState} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, SettingsInputAntenna} from '@material-ui/icons'
import axios from '../../Network/Axios'

function Chat({messages}) {

    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if(input !== '') {
            await axios.post('/messages/new', {
                message: input,
                name: "Ranjan Moger",
                timestamp: `${new Date().toISOString()}`,
                received: true
            });
    
            setInput('');
        }
        
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                </p>
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button 
                        onClick={sendMessage} 
                        type="submit">
                        Send a message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat
