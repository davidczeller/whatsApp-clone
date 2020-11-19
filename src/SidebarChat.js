import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import db from './firbase'


export function SidebarChat({ id, name, addnewChat }) {

  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('')


  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
  }, [id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat')

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }

  return !addnewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        {/*<Avatar src='https://i.pravatar.cc/300'/>*/}
        <div className='info'>
          <h2>{name}</h2>
          <p>{messages.length && messages[0].message}</p>
        </div>
      </div>
    </Link>
  )
    : (
      <div
        onClick={createChat}
        className='sidebarChat'
      >
        <h2>Add new Chat</h2>
      </div>
    )
}
