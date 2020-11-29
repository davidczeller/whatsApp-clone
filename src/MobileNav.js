import React, { useState } from 'react'

import { IconButton, Popover } from '@material-ui/core'
import { Settings, Person, RateReview, ExitToApp } from "@material-ui/icons";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import './MobileNav.css'


export function MobileNav(props) {

  const {
    setOpen,
    signOut,
    mobileNavVisible,
    setMobileNavVisible,
    setStatus,
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

  const actions = [
    { icon: <img src="https://img.icons8.com/nolan/64/online.png" />, name: 'Active', action: () => setStatus(1) },
    { icon: <img src="https://img.icons8.com/nolan/64/offline.png" />, name: 'Offline', action: () => setStatus(0) },
    { icon: <img src="https://img.icons8.com/nolan/64/calendar.png" />, name: 'Busy', action: () => setStatus(2) },
  ];

  const [direction, setDirection] = useState('down');
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleClose = () => {
    setSpeedDialOpen(false);
  };

  const handleOpen = () => {
    setSpeedDialOpen(true);
  };

  return (
    <div
      className="iconContainer"
      style={{ bottom: mobileNavVisible ? '.5vh' : '-8.5vh' }}
    >
      {/* <div className='speedDialContainer'>
        <SpeedDial
          ariaLabel="SpeedDial example"
          // className={classes.speedDial}
          hidden={hidden}
          icon={<img src={`https://img.icons8.com/wired/24/ffffff/connection-status-on.png`} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={speedDialOpen}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div> */}
      <IconButton onClick={(e) => (setActive(e.currentTarget.querySelector('p')))}>
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
      {/* <div> */}
      {/* <SpeedDial
          ariaLabel="SpeedDial example"
          // className={classes.speedDial}
          hidden={hidden}
          // icon={<SpeedDialIcon />}
          // onClose={handleClose}
          onOpen={handleOpen}
          open={speedDialOpen}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial> */}
      {/* </div> */}
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
