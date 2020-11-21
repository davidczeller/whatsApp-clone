import React, { useState, useEffect, useRef } from 'react'
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
  VoiceChat,
  PermPhoneMsg,
  Search,
} from '@material-ui/icons'

import db, { myStorage } from './firbase'
import firebase from 'firebase'

import './Chat.css'

export function Chat(props) {
  const {
    name,
    open,
    setOpen,
    isMobile,
    // active,
    // setActive,
    input,
    setInput
  } = props


  const [seed, setSeed] = useState('')
  // const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState('')
  const [lastSeen, setLastSeen] = useState('')
  // const [active, setActive] = useState(false)

  const el = document.querySelector('.msgInput')

  // console.log({ el, active }, document.activeElement)

  // useEffect(() => {
  //   if (el && el.value.length > 0 && document.activeElement === el) {
  //     console.log(el && el.value.length, { active })
  //     setActive(true)
  //   } else {
  //     console.log(el && el.value.length, { active })
  //     setActive(false)
  //   }
  // })

  useEffect(() => {
    messages && messages.map((msg, idx, arr) => (
      arr.length - 1 === idx && setLastSeen(new Date(msg.timestamp && msg.timestamp.toDate()).toString())
    ))
  }, [messages])

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
    setSeed(Math.floor(Math.random() * 500))
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

  let msgEnd = useRef(null);


  const scrollToBottom = () => {
    msgEnd.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);


  // const [currentPhotoFile, setCurrentPhotoFile] = useState(null)
  // let refInput = useRef(null);

  // const onChoosePhoto = event => {
  //   if (event.target.files && event.target.files[0]) {
  //     setCurrentPhotoFile(event.target.files[0])
  //     // Check this file is an image?
  //     const prefixFiletype = event.target.files[0].type.toString()
  //     if (prefixFiletype.indexOf('image/') === 0) {
  //       uploadPhoto()
  //     } else {
  //       console.log('This file is not an image')
  //     }
  //   }
  // }

  // const uploadPhoto = () => {
  //   const uploadTask = myStorage
  //     .ref()
  //     .child()
  //     .put(currentPhotoFile)

  //   uploadTask.on(
  //     // AppString.UPLOAD_CHANGED,
  //     // null,
  //     err => {
  //       console.log('Something went wrong!')
  //       // this.setState({isLoading: false})
  //       // this.props.showToast(0, err.message)
  //     },
  //     () => {
  //       uploadTask.ref().getDownloadURL().then(url => {
  //         // this.setState({isLoading: false})
  //         console.log(url)
  //         // sendMessage(url, 0)
  //       })
  //     }
  //   )
  //   // })
  // }

  // const el = document.querySelector('.msgInput')

  // useEffect(() => {
  //   if (el && el.value.length > 0 && document.activeElement === el) {
  //     console.log(el && el.value.length, { active })
  //     window.scrollTo(0, 1000);
  //     setActive(true)
  //   } else {
  //     console.log(el && el.value.length, { active })
  //     setActive(false)
  //   }
  // })

  return (
    <div
      className={isMobile ? 'chatMobile' : 'chat'}
      style={{ opacity: isMobile && open ? 1 : 0, pointerEvents: isMobile && open ? 'all' : 'none' }}
    >
      <div style={{ position: 'relative' }}>
        <div className={'header'}>
          {isMobile &&
            <ArrowBackIos onClick={() => setOpen(false)} style={{ margin: '0 12px' }} />
          }
          <Avatar src={`https://source.unsplash.com/random/200x200?sig=${seed}`} />
          <div className='info'>
            <h3>{roomName}</h3>
            <p>
              Last seen at {''}
              {lastSeen && lastSeen.substring(15, 21)}
            </p>
          </div>
          {!isMobile &&
            <div className='headerRight'>
              <IconButton>
                <Search />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
            // ) : (

            // <>
            //   <IconButton>
            //     <PermPhoneMsg style={{ color: '#9fd0c6' }} />
            //   </IconButton>
            // <IconButton>
            //   <VoiceChat
            //     style={{
            //       color: '#9fd0c6',
            //       marginLeft: '-24px',
            //       padding: '0 !important',
            //     }}
            //   />
            // </IconButton>
            // </>
            // )
          }
        </div>
      </div>
      <div className='body'>
        {messages && messages.map((message, idx) => (
          <p key={idx + 1} className={`chatMsg ${message.name === name && 'reciever'}`}>
            <span className='chatName'>
              {message.name}
            </span>
            {message.message}
            <span className='timestamp'>
              {!isMobile ? (
                new Date(message.timestamp && message.timestamp.toDate()).toUTCString()
              ) : (
                  new Date(message.timestamp && message.timestamp.toDate()).toUTCString()
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
        {/* {active && ( */}
        {/* )} */}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => msgEnd = el}
        >
        </div>
        {/* <div className={`active ${active && 'visible'}`}>
          ...
          </div> */}
      </div>
      <div className='footer'>
        <InsertEmoticon style={{ color: '#444' }} />
        <form>
          <input
            className='msgInput'
            value={input}
            onChange={e => {
              setInput(e.target.value)
            }}
            type='text'
            placeholder='Type a message'
          />
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
