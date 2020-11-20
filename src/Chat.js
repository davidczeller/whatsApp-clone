import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, IconButton } from '@material-ui/core'
import {
  DonutLarge,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
  Send,
  CameraAlt,
  ArrowBackIos,
} from '@material-ui/icons'

import db from './firbase'
import firebase from 'firebase'

import './Chat.css'

export function Chat(props) {
  const {
    name,
    open,
    setOpen,
    isMobile,
  } = props


  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState('')
  const [lastSeen, setLastSeen] = useState('')

  console.log(isMobile)

  const elmt = document.querySelector('.body')

  useEffect(() => {
    setLastSeen(elmt && elmt.lastChild.textContent)
  }, [messages.length])

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => (
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }


  return (
    <div
      className={isMobile ? 'chatMobile' : 'chat'}
      style={{ opacity: isMobile && open ? 1 : 0, pointerEvents: isMobile && open ? 'all' : 'none' }}
    >
      <div style={{ position: 'relative' }}>
        <div className={'header'}>
          <ArrowBackIos onClick={() => setOpen(false)} />
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='info'>
            <h3>{roomName}</h3>
            <p>
              Last seen {''}
              {lastSeen && lastSeen.substr(lastSeen.length - 25)}
            </p>
          </div>
          {!isMobile &&
            <div className='headerRight'>
              <IconButton>
                <DonutLarge />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          }

        </div>
      </div>
      <div className='body'>
        {messages && messages.map((message) => (
          <p className={`chatMsg ${message.name === name && 'reciever'}`}>
            <span className='chatName'>
              {message.name}
            </span>
            {message.message}
            <span className='timestamp'>
              {!isMobile ? (
                new Date(message.timestamp && message.timestamp.toDate()).toUTCString()
              ) : (
                  new Date(message.timestamp && message.timestamp.toDate()).toUTCString().slice(0, -4)
                )
              }
            </span>
          </p>
        ))}
        {/* <p className={`chatMsg`}>
            <span className='chatName'>
              {message.name}
            </span>
            {message.message}
            <span className='timestamp'>
              {new Date(message.timestamp && message.timestamp.toDate()).toUTCString()}
            </span>
          </p> */}
      </div>
      <div className='footer'>
        <InsertEmoticon style={{ color: '#444' }} />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message' />
          <button type='submit' onClick={sendMessage}>Send a message</button>
        </form>
        {isMobile ? (
          <>
            <IconButton onClick={sendMessage}>
              <Send style={{ color: '#fff' }} />
            </IconButton>
            <IconButton>
              <CameraAlt style={{ color: '#444' }} />
            </IconButton>
          </>
        ) : (
            <Mic />
          )}
      </div>
    </div>
  )
}
