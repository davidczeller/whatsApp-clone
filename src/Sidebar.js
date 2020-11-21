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
    active,
    setInput,
  } = props

  const [rooms, setRooms] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);

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
          <input placeholder='Search or start new chat...' type='text' />
        </div>
      </div>
      <div className='chats'>
        <SidebarChat
          setInput={setInput}
          active={active}
          addnewChat
          isMobile={isMobile}
          setOpen={setOpen}
        />
        {rooms.map(room => (
          <SidebarChat
            setInput={setInput}
            active={active}
            key={room.id}
            id={room.id}
            name={room.data.name}
            isMobile={isMobile}
            setOpen={setOpen}
          />
        ))}
      </div>
    </div>
  )
}
