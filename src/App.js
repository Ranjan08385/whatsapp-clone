import React, {useEffect, useState} from 'react';
import './App.css';
import SideBar from './Pages/sidebar/Sidebar'
import Chat from './Pages/chatSection/Chat'
import Pusher from 'pusher-js'
import axios from './Network/Axios'

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('883589bff1734482920f', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        <SideBar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
