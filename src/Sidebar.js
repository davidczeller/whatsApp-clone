import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from '@material-ui/core'
import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@material-ui/icons";

import './Sidebar.css';
import { SidebarChat } from "./SidebarChat";
import db from './firbase'

export function Sidebar(props) {
  const {
    avatar,
    name
  } = props

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    ))
  }, [])
  return (
    <div className='sidebar'>
      <div className='header'>
        {/* <Avatar src='https://i.pravatar.cc/300' /> */}
        <div className='headerLeft'>
          <Avatar src={avatar} />
          <h3>{name}</h3>
        </div>
        <div className='headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='search'>
        <div className='searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start new chat...' type='text' />
        </div>
      </div>
      <div className='chats'>
        <SidebarChat addnewChat />
        {rooms.map(room => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name} />
        ))}
      </div>
    </div>
  )
}
