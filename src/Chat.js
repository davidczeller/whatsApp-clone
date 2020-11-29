import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, IconButton, Popover, ClickAwayListener } from '@material-ui/core'
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
  GetApp,
  CloudUpload
} from '@material-ui/icons'

import EmojiKeyboard from './EmojiKeyboard'

import db, { myStorage } from './firbase'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { Modal } from './Modal'
import './Chat.css'


export function Chat(props) {
  const {
    name,
    open,
    setOpen,
    isMobile,
    activeRoom,
    setActiveRoom,
    input,
    setInput,
    msgLength,
    setMsgLength,
    mobileNavVisible,
    setMobileNavVisible,
  } = props

  const [seed, setSeed] = useState('')
  // const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState('')
  const [lastSeen, setLastSeen] = useState('')
  const [search, setSearch] = useState('')
  const [filteredMessages, setFilteredMessages] = useState('')
  const [visible, setVisible] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [bubble, setBubble] = useState('')
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
    setFilteredMessages(
      messages && messages.filter(message => {
        return message.message.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [search, messages])

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

    if (input.includes('youtube.com/watch')) {
      const videoID = input.includes('https://')
        ? input.slice(32, 43)
        : input.slice(21, 32)

      videoID && db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        url: `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
        name: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setInput('')
    } else if (input.includes('whatsup-clone-7a595.appspot.com')
      || input.includes('png')
      || input.includes('jpg')
      || input.includes('gif')
      || input.includes('jpeg')
      || input.includes('svg')) {
      db.collection('rooms').doc(roomId).collection('messages').add({
        message: '',
        url: input,
        name: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setBubble(input)
      setInput('')
    } else {
      db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setInput('')
    }
  }

  let msgEnd = useRef(null);


  const scrollToBottom = () => {
    msgEnd.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages, anchorEl, visible]);

  const focus = () => {
    const el = document.querySelector('.searchInput')
    anchorEl && el && el.focus()
  }

  // const [active, setActive] = useState(false)
  // console.log('chat', messages.length, activeRoom)
  // const [msgLength, setMsgLength] = useState(0)


  useEffect(() => {
    setMsgLength(messages.length)
    // console.log('Chat', messages.length, msgLength)
  })

  //all messages of all rooms 
  const [roomCount, setRoomCount] = useState(0)
  useEffect(() => {
    db.collection('rooms').get().then(snap => {
      setRoomCount(snap.size);
    });
  })

  const [rooms, setRooms] = useState([])
  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    ))
  }, [])


  const [qwe, setQwe] = useState([])


  useEffect(() => {
    for (let i = 0; i < roomCount; i++) {
      db.collection('rooms')
        .doc(rooms[i].id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setQwe(snapshot.docs.length)
        })
    }
  }, [])


  //active room id
  useEffect(() => {
    console.log('Active Room: ', activeRoom)
  }, [activeRoom])


  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //room !== active && ( 
  //usEffect (()=> {
  //setDot(visible)
  //}, [messages.length])
  //) else setDot(!visible)
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  //ScrollButton

  // const [scrollButton, setScrollButton] = useState(false);

  // const [scrollPositionY, setScrollPositionY] = useState(null);

  // const element = document.querySelectorAll('.body')

  // useEffect(() => {
  //   window.addEventListener("scroll", updateScrollPosition);

  //   return () => window.removeEventListener("scroll", updateScrollPosition);
  // }, []);

  // const updateScrollPosition = ev => {
  //   setScrollPositionY(window.scrollY);
  // };

  // console.log(element && element.scrollLeft, element && element.scrollTop);


  // console.log(element && element, scrollPositionY)

  //style={{ display: scrollPositionY < 100 ? 'block' : 'none' }}

  const id = anchorEl ? 'simple-popover' : undefined;

  //emojiKeyboard
  const [emojiOpen, setEmojiOpen] = useState(null);

  //file upload 
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)


  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const fileType = file['type']
      const validImageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg', 'image/jpg']
      if (validImageTypes.includes(fileType)) {
        setError('')
        setImage(file)
        // image && handleFileUpdate()
        setIsDisabled(false)
      } else {
        setError('Error: wrong filetype')
      }
    } else {
      setError('Error: no file')
    }
  }

  const handleFileUpdate = () => {
    if (image) {
      const uploadTask = myStorage.ref(`images/${image.name}`).put(image)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        error => {
          setError(error)
        },
        () => {
          myStorage.ref('images').child(image.name).getDownloadURL().then(url => {
            setUrl(url)
            // setInput(url)
            db.collection('rooms').doc(roomId).collection('messages').add({
              message: '',
              url: url,
              name: name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setBubble(url)
            setInput('')
            setProgress(0)
            setIsDisabled(true)
            setImage(null)
          })
        }
      )
    } else {
      setError('Error: no Image')
    }
  }

  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const disabledUploadButton = (x) => {
      x ? setIsDisabled(false) : setIsDisabled(true)
    }
  }, [isDisabled])

  const [modalOpen, setModalOpen] = React.useState(false);
  const [urls, setUrls] = React.useState([])

  return (
    <div
      className={isMobile ? 'chatMobile' : 'chat'}
      style={{ opacity: isMobile && open ? 1 : 0, pointerEvents: isMobile && open ? 'all' : 'none' }}
    >
      <div style={{ position: 'relative' }}>
        <div className={'header'}>
          {isMobile &&
            <>
              <ArrowBackIos
                onClick={() => (
                  setOpen(false),
                  setMobileNavVisible(true)
                )}
                style={{ margin: '0 12px' }}
              />
            </>
          }
          <Avatar src={`https://source.unsplash.com/random/200x200?sig=${seed}`} />
          <div className='info'>
            <h3>{roomName}</h3>
            <p>
              Last seen at {''}
              {lastSeen && lastSeen.substring(15, 21)}
            </p>
          </div>
          <div className='headerRight'>
            <ClickAwayListener
              onClickAway={() => (
                setSearch(''),
                visible && setVisible(false)
              )}
            >
              <div>
                <input
                  style={{
                    width: visible ? '240px' : 0,
                    paddingLeft: visible ? '12px' : 0,
                    paddingRight: visible ? '12px' : 0
                  }}
                  className='desktopSearch'
                  placeholder='Search in Conversation...'
                  type='text'
                  onChange={e => setSearch(e.target.value)}
                />
                <IconButton onClick={() => (setVisible((prev) => !prev), focus())}>
                  <Search
                    aria-describedby={id}
                  />
                </IconButton>
              </div>
            </ClickAwayListener>
            {!isMobile &&
              <IconButton>
                <MoreVert />
              </IconButton>
            }
          </div>
          {/* // ) : (
          //     <div className='headerRight'>
          //       <IconButton>
          //         <Search
          //           aria-describedby={id}
          //           onClick={
          //             (e) => (
          //               setAnchorEl(e.currentTarget),
          //               focus()
          //             )
          //           }
          //         />
          //       </IconButton>
          //     </div>
          //   )
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
          // }
          // <Popover
          //   className='searchBar'
          //   id={id}
          //   open={anchorEl}
          //   anchorEl={anchorEl}
          //   onClose={() => (setAnchorEl(false), setSearch(''))}
          //   anchorOrigin={{
          //     vertical: 'bottom',
          //     horizontal: 'left',
          //   }}
          //   transformOrigin={{
          //     vertical: 'top',
          //     horizontal: 'right',
          //   }}
          // >
          //   <input
          //     className='searchInput'
          //     placeholder='Search...'
          //     type='text'
          //     onChange={e => setSearch(e.target.value)}
          //   />
          // </Popover> */}
        </div>
      </div>
      <div className='body'>
        {search !== '' ? (
          filteredMessages.map((message, idx) => (
            <p key={idx + 1} className={`chatMsg ${message.name === name && 'reciever'}`}>
              {message.message}
            </p>
          ))) : (
            messages && messages.map((message, idx) => (
              <div key={idx + 2} className={`chatBubble ${message.name === name && 'reciever'} `}>
                <span className={`chatName ${message.name === name && 'reciever'} `}>
                  {message.name.split(' ')[0]}
                </span>
                {message.url ? (
                  message.message ? (
                    <>
                      <a href={message.message} target='_blank'>
                        <div
                          style={{
                            backgroundImage: `url(${message.url})`,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                          className={`imageBubble ${message.name === name && 'reciever'}`}
                        />
                      </a>
                      <a href={input.includes('https://') ? message.message : `https://www.${message.message}`} target='_blank' className='videoLink'>
                        <p className='videoLink'>{message.message}</p>
                      </a>
                    </>
                  ) : (
                      <>
                        <Modal
                          isOpen={modalOpen}
                          setIsOpen={setModalOpen}
                          url={message.url}
                          idx={idx}
                        />
                        <div
                          onClick={() => setModalOpen(!modalOpen)}
                          style={{ backgroundImage: `url(${message.url})` }}
                          className={`imageBubble ${message.name === name && 'reciever'}`}
                        />
                      </>
                    )
                ) : (
                    <p key={idx + 1}>
                      {message.message.replace(/(\w{12})(?=\w)/g, '$1 ')}
                      <span className='timestamp'>
                        {!isMobile ? (
                          new Date(message.timestamp && message.timestamp.toDate()).toUTCString()
                        ) : (
                            new Date(message.timestamp && message.timestamp.toDate()).toUTCString()
                          )
                        }
                      </span>
                    </p>
                  )}
              </div>
            )
            ))
        }
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => msgEnd = el}
        >
        </div>
      </div>
      <div className='footer'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <div className='imageUploadContainer'>
              {!image ? (
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='custom-file-input'
                />
              ) : (
                  <IconButton onClick={handleFileUpdate}>
                    <CloudUpload
                      style={{ color: isDisabled ? '#444' : '#fff' }}
                    />
                  </IconButton>
                )}
            </div>
            {progress > 0 ? <progress value={progress} max='100' /> : ''}
            <div>{error}</div>
          </div>
          <InsertEmoticon style={{ color: '#fff' }} onClick={() => setEmojiOpen(!emojiOpen)} />
          <EmojiKeyboard emojiOpen={emojiOpen} />
        </div>

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
          </>
        ) : (
            <Mic />
          )}
      </div>
    </div>
  )
}
