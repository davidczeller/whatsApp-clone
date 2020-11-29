import React, { useState } from 'react'

import { IconButton, Popover } from '@material-ui/core'
import { Settings, Person, RateReview, ExitToApp } from "@material-ui/icons";


import './MobileNav.css'


export function MobileNav(props) {

  const {
    setOpen,
    signOut,
  } = props


  const [active, setActive] = useState(null)


  let color = 'ffffff'
  // let activeColor = '9fd0c6'
  let activeColor = 'ffffff'

  // if (active) {
  //   active.style.color = '#000000'
  //   color = '#000000'
  // } else {
  //   // active.style.color = '#ffffff'
  //   color = '#000000'
  // }

  const [anchorEl, setAnchorEl] = useState(false);

  const id = anchorEl ? 'simple-popover' : undefined;

  return (
    <div className="iconContainer" >
      <IconButton onClick={(e, idx) => console.log(e.currentTarget, idx)}>
        <img src={`https://img.icons8.com/wired/24/${active ? activeColor : color}/connection-status-on.png`} />
        <p style={{ color: active ? `#${activeColor}` : `#${color}` }} >Status</p>
      </IconButton>
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/wired/24/${active ? activeColor : color}/phone.png`} />
        <p style={{ color: active ? `#${activeColor}` : `#${color}` }}>Calls</p>
      </IconButton>
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/dotty/24/${active ? activeColor : color}/camera.png`} />
        <p style={{ color: active ? `#${activeColor}` : `#${color}` }}>Camera</p>
      </IconButton>
      <IconButton onClick={(e) => (setOpen(false), setActive(e.currentTarget.querySelector('p')))}>
        <img src={`https://img.icons8.com/dotty/24/${active ? activeColor : color}/chat.png`} />
        <p style={{ color: active ? `#${activeColor}` : `#${color}` }}>Chat</p>
      </IconButton>
      <IconButton aria-describedby={id} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <img src={`https://img.icons8.com/dotty/24/${active ? activeColor : color}/settings.png`} />
        <p style={{ color: active ? `#${activeColor}` : `#${color}` }}>Settings</p>
      </IconButton>
      <Popover
        id={id}
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
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
    </div>
  )
}
