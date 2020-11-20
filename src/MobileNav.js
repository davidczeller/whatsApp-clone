import React, { useState } from 'react'

import { IconButton } from '@material-ui/core'

import './MobileNav.css'


export function MobileNav(props) {

  const {
    setOpen,
  } = props


  const [active, setActive] = useState(null)


  let color = 'ffffff'
  let activeColor = '8dff8c'

  // if (active) {
  //   active.style.color = '#000000'
  //   color = '#000000'
  // } else {
  //   // active.style.color = '#ffffff'
  //   color = '#000000'
  // }

  return (
    <div className="iconContainer" >
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/wired/24/${color}/connection-status-on.png`} />
        <p>Status</p>
      </IconButton>
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/wired/24/${color}/phone.png`} />
        <p>Calls</p>
      </IconButton>
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/dotty/24/${color}/camera.png`} />
        <p>Camera</p>
      </IconButton>
      <IconButton onClick={(e) => (setOpen(false), setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/dotty/24/${activeColor}/chat.png`} />
        <p style={{ color: '#8dff8c' }}>Chat</p>
      </IconButton>
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/dotty/24/${color}/settings.png`} />
        <p>Settings</p>
      </IconButton>
    </div>
  )
}
