import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { Login } from './Login';
import { MobileNav } from './MobileNav';
import { useStateValue } from './StateProvider'

import { useMediaQuery } from "@material-ui/core";

import { auth, provider } from './firbase'
import firebase from 'firebase'


function App() {
  // const [{ user }, dispatch] = useStateValue(null)

  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(null)
  const [input, setInput] = useState('')

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      // .then(result => {
      //   dispatch({
      //     type: actionTypes.SET_USER,
      //     user: result.user,
      //   })
      // })
      .then(result => setUser(result))
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setUser(user)
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, [])


  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false)

  // const [active, setActive] = useState(false)

  // const el = document.querySelector('.msgInput')

  // console.log({ active })

  // useEffect(() => {
  //   if (el && el.value.length > 0 && document.activeElement === el) {
  //     console.log(el && el.value.length, { active })
  //     setActive(true)
  //   } else {
  //     console.log(el && el.value.length, { active })
  //     setActive(false)
  //   }
  // })

  const [activeRoom, setActiveRoom] = useState(null)
  const [msgLength, setMsgLength] = useState(0)

  console.log(authenticated, user, user && user.$)

  return (
    <div className="app">
      {!authenticated && !user ? (
        <Login signIn={signIn} />
      ) : (
          !isMobile ? (
            <div className='app_body'>
              <Router>
                <Sidebar
                  user={user && user}
                  input={input}
                  setInput={setInput}
                  activeRoom={activeRoom}
                  setActiveRoom={setActiveRoom}
                  msgLength={msgLength}
                  setMsgLength={setMsgLength}
                  isMobile={isMobile}
                  avatar={user && user.photoURL}
                  name={user && user.displayName}
                />
                <Switch>
                  <Route path='/rooms/:roomId'>
                    <Chat
                      input={input}
                      setInput={setInput}
                      setActiveRoom={setActiveRoom}
                      msgLength={msgLength}
                      setMsgLength={setMsgLength}
                      activeRoom={activeRoom}
                      name={user && user.displayName}
                      isMobile={isMobile}
                    />
                  </Route>
                  <Route path='/'>
                    <Chat
                      input={input}
                      setInput={setInput}
                      setActiveRoom={setActiveRoom}
                      msgLength={msgLength}
                      setMsgLength={setMsgLength}
                      activeRoom={activeRoom}
                      isMobile={isMobile}
                    />
                  </Route>
                </Switch>
              </Router>
            </div>
          ) : (
              <Router>
                <Sidebar
                  user={user}
                  input={input}
                  setInput={setInput}
                  setActiveRoom={setActiveRoom}
                  msgLength={msgLength}
                  setMsgLength={setMsgLength}
                  activeRoom={activeRoom}
                  isMobile={isMobile}
                  setOpen={setOpen}
                  avatar={user.photoURL}
                  name={user.displayName}
                />
                <MobileNav setOpen={setOpen} />
                <Switch>
                  <Route path='/rooms/:roomId'>
                    <Chat
                      input={input}
                      setInput={setInput}
                      setActiveRoom={setActiveRoom}
                      msgLength={msgLength}
                      setMsgLength={setMsgLength}
                      activeRoom={activeRoom}
                      name={user.displayName}
                      open={open}
                      isMobile={isMobile}
                      setOpen={setOpen}
                    />
                  </Route>
                  <Route path='/'>
                    <Chat
                      input={input}
                      setInput={setInput}
                      setActiveRoom={setActiveRoom}
                      msgLength={msgLength}
                      setMsgLength={setMsgLength}
                      activeRoom={activeRoom}
                      isMobile={isMobile}
                      setOpen={setOpen}
                    />
                  </Route>
                </Switch>
              </Router>
            )
        )}
    </div>
  );
}

export default App;

