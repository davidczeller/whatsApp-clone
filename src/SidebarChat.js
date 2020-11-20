import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { Avatar, IconButton } from '@material-ui/core'
import { RateReview } from "@material-ui/icons";

import './SidebarChat.css'

import db from './firbase'


export function SidebarChat({ id, name, addnewChat, isMobile, setOpen }) {

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
    isMobile ? (
      <Link to={`/rooms/${id}`} className='sidebarChat' onClick={() => setOpen(true)}>
        {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
        {/* <Avatar src={`https://i.pravatar.cc/${seed}`} /> */}
        {/* <Avatar src={`https://picsum.photos/seed/picsum/200`} /> */}
        {/* <Avatar src={`https://source.unsplash.com/collection/${seed}`} /> */}
        <Avatar src={`https://source.unsplash.com/random/200x200?sig=${seed}`} />
        <div className='info'>
          <h2>{name}</h2>
          {messages.length ? (
            <p>{messages[0].message}</p>
          ) : (
              <p>No messages yet...</p>
            )}
        </div>
      </Link>
    ) : (
        <Link to={`/rooms/${id}`}>
          <div className='sidebarChat'>
            {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
            {/* <Avatar src={`https://i.pravatar.cc/${seed}`} /> */}
            {/* <Avatar src={`https://picsum.photos/seed/picsum/200`} /> */}
            {/* <Avatar src={`https://source.unsplash.com/collection/${seed}`} /> */}
            <Avatar src={`https://source.unsplash.com/random/200x200?sig=${seed}`} />
            <div className='info'>
              <h2>{name}</h2>
              <p>{messages.length && messages[0].message}</p>
            </div>
          </div>
        </Link>
      )
  )
    : (
      isMobile ? (
        <IconButton className="createNewIcon" onClick={createChat}>
          <RateReview style={{ color: '#fff' }} />
        </IconButton>
      ) : (
          <div
            onClick={createChat}
            className='sidebarChat'
          >
            <h2>Add new Chat</h2>
          </div>
        )
    )
}
