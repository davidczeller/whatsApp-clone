import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Popover, Button } from '@material-ui/core'
import { DonutLarge, Chat, MoreVert, SearchOutlined, Settings, Person, RateReview } from "@material-ui/icons";

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

  return (
    <div className='sidebar'>
      <div className='sideBarHeader'>
        {/* <Avatar src='https://i.pravatar.cc/300' /> */}
        <div className='headerLeft'>
          <Avatar src={avatar} />
          <h3>{name}</h3>
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
