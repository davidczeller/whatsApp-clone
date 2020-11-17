import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { Login } from './Login';
import { useStateValue } from './StateProvider'


import { auth, provider } from './firbase'


function App() {
  // const [{ user }, dispatch] = useStateValue(null)
  // console.log(user)
  const [user, setUser] = useState(null)

  // console.log(user)

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

  return (
    <div className="app">
      {!user ? (
        <Login signIn={signIn} />
      ) : (
          <div className='app_body'>
            <Router>
              <Sidebar
                avatar={user.additionalUserInfo.profile.picture}
                name={user.additionalUserInfo.profile.given_name}
              />
              <Switch>
                <Route path='/rooms/:roomId'>
                  <Chat name={user.additionalUserInfo.profile.name}/>
                </Route>
                <Route path='/'>
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )}
    </div>
  );
}

export default App;

