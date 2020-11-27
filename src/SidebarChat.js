import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { Avatar, IconButton } from '@material-ui/core'
import { RateReview, MoreHoriz } from "@material-ui/icons";

import './SidebarChat.css'

import db from './firbase'


export function SidebarChat({
  id,
  name,
  addnewChat,
  isMobile,
  setOpen,
  activeRoom,
  setActiveRoom,
  setInput,
  msgLength,
  setMsgLength,
  user,
}) {

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

  // console.log({id})

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

  const el = document.querySelector('.msgInput')

  // const [msgLength, setMsgLength] = useState(0)

  // useEffect(() =>{
  //   setMsgLength(messages.length)
  //   console.log('Room Changed!',messages.length, msgLength)
  // }, [])
  const userFullName = user.additionalUserInfo.profile.name
  const senderFullName = messages.length && messages[0].name
  const senderFirstName = senderFullName && senderFullName.split(' ')
  const userName = userFullName === senderFullName
    ? ('You ')
    : (senderFirstName[0]);


  return !addnewChat ? (
    isMobile ? (
      <Link to={`/rooms/${id}`} className='sidebarChat'
        onClick={() => (
          setOpen(true),
          setInput(''),
          setActiveRoom(id),
          setMsgLength(messages)
        )}
      >
        <Avatar src={`https://source.unsplash.com/random/200x200?sig=${seed}`} />
        <div className='info'>
          <h2>{name}</h2>
          {messages.length ? (
            messages[0].message !== '' ? (
              <p>{messages[0].message}</p>
            ) : (
                <p>{userName} sent a Photo</p>
              )
          ) : (
              <p>No messages yet...</p>
            )}
        </div>
      </Link>
    ) : (
        <Link to={`/rooms/${id}`}
          onClick={() => (
            setInput(''),
            setActiveRoom(id)
          )}
        >
          <div className='sidebarChat'>
            <Avatar src={`https://source.unsplash.com/random/200x200?sig=${seed}`} />
            <div className='info'>
              <h2>{name}</h2>
              {messages.length ? (
                messages[0].message !== '' ? (
                  <p>{messages.length && messages[0].message}</p>
                ) : (
                    <p>{userName} sent a Photo</p>
                  )
              ) : (
                  <p>No messages yet...</p>
                )}
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
