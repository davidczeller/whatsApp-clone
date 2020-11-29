import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Popover, Button } from '@material-ui/core'
import { DonutLarge, Chat, MoreVert, SearchOutlined, Settings, Person, RateReview, ExitToApp } from "@material-ui/icons";

import './Sidebar.css';
import { SidebarChat } from "./SidebarChat";
import db from './firbase'

export function Sidebar(props) {
  const {
    avatar,
    name,
    isMobile,
    setOpen,
    activeRoom,
    setActiveRoom,
    setInput,
    msgLength,
    setMsgLength,
    user,
    signOut,
  } = props

  const [rooms, setRooms] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredChats, setFilteredChats] = useState('')

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    ))
  }, [])



  const id = anchorEl ? 'simple-popover' : undefined;

  useEffect(() => {
    setFilteredChats(
      rooms.filter(chat => {
        return chat.data.name.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [search, rooms])

  const firstName = name && name.split(' ')[0];

  return (
    <div className='sidebar'>
      <div className='sideBarHeader'>
        {/* <Avatar src='https://i.pravatar.cc/300' /> */}
        <div className='headerLeft'>
          <Avatar src={avatar} />
          <h3>{firstName}</h3>
        </div>
        <div className='headerRight'>
          {!isMobile && (
            <>
              <IconButton>
                <DonutLarge />
              </IconButton>
              <IconButton>
                <Chat />
              </IconButton>
              <IconButton >
                <MoreVert aria-describedby={id} onClick={(e) => setAnchorEl(e.currentTarget)} />
              </IconButton>
              <Popover
                id={id}
                open={anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <IconButton className='popoverButton'>
                  <RateReview />
                  New Room
                </IconButton>
                <IconButton className='popoverButton'>
                  <Person />
                  Profile
                </IconButton>
                <IconButton className='popoverButton'>
                  <Settings />
                  Settings
                </IconButton>
                <IconButton className='popoverButton' onClick={signOut}>
                  <ExitToApp />
                  Sign Out
                </IconButton>
              </Popover>
            </>
          )}
        </div>
      </div>
      <div className='search'>
        <div className='searchContainer'>
          <SearchOutlined />
          <input placeholder='Search...' type='text' onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className='chats'>
        <SidebarChat
          user={user}
          signOut={signOut}
          setInput={setInput}
          addnewChat
          isMobile={isMobile}
          setOpen={setOpen}
          setActiveRoom={setActiveRoom}
          activeRoom={activeRoom}
          msgLength={msgLength}
          setMsgLength={setMsgLength}
        />
        {search !== '' ? (
          filteredChats.map((room, idx) => (
            <SidebarChat
              user={user}
              signOut={signOut}
              setInput={setInput}
              setActiveRoom={setActiveRoom}
              activeRoom={activeRoom}
              msgLength={msgLength}
              setMsgLength={setMsgLength}
              // key={room.id}
              id={room.id}
              name={room.data.name}
              isMobile={isMobile}
              setOpen={setOpen}
              key={idx}
              {...room}
            />
            // <SidebarChat
            // user = { user }
            //   setInput={setInput}
            //   activeRoom={activeRoom}
            //   key={room.id}
            //   id={room.id}
            //   name={room.data.name}
            //   isMobile={isMobile}
            //   setOpen={setOpen}
            // />
          ))
        ) : (
            rooms.map(room => (
              <SidebarChat
                user={user}
                signOut={signOut}
                setInput={setInput}
                setActiveRoom={setActiveRoom}
                activeRoom={activeRoom}
                msgLength={msgLength}
                setMsgLength={setMsgLength}
                key={room.id}
                id={room.id}
                name={room.data.name}
                isMobile={isMobile}
                setOpen={setOpen}
              />
            ))
          )}
        {/* {rooms.map(room => (
          <SidebarChat
                  user={user}
                  signOut={signOut}          
            setInput={setInput}
            activeRoom={activeRoom}
            key={room.id}
            id={room.id}
            name={room.data.name}
            isMobile={isMobile}
            setOpen={setOpen}
          />
        ))} */}
      </div>
    </div>
  )
}
