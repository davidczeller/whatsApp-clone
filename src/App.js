import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { Login } from './Login';
import { MobileNav } from './MobileNav';
import { useStateValue } from './StateProvider'

import { useMediaQuery } from "@material-ui/core";

import { auth, provider } from './firbase'


function App() {
  // const [{ user }, dispatch] = useStateValue(null)

  const [user, setUser] = useState(null)

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

  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false)


  return (
    <div className="app">
      {!user ? (
        <Login signIn={signIn} />
      ) : (
          !isMobile ? (
            <div className='app_body'>
              <Router>
                <Sidebar
                  isMobile={isMobile}
                  avatar={user.additionalUserInfo.profile.picture}
                  name={user.additionalUserInfo.profile.given_name}
                />
                <Switch>
                  <Route path='/rooms/:roomId'>
                    <Chat name={user.additionalUserInfo.profile.name} />
                  </Route>
                  <Route path='/'>
                    <Chat />
                  </Route>
                </Switch>
              </Router>
            </div>
          ) : (
              <Router>
                <Sidebar
                  isMobile={isMobile}
                  setOpen={setOpen}
                  avatar={user.additionalUserInfo.profile.picture}
                  name={user.additionalUserInfo.profile.given_name}
                />
                <MobileNav setOpen={setOpen} />
                <Switch>
                  <Route path='/rooms/:roomId'>
                    <Chat name={user.additionalUserInfo.profile.name} open={open} />
                  </Route>
                  <Route path='/'>
                    <Chat />
                  </Route>
                </Switch>
              </Router>
            )
        )}
    </div>
  );
}

export default App;

