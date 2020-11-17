import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { auth, provider } from './firbase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

export function Login(props) {

  const {
    signIn
  } = props;
  // const [{ }, dispatch] = useStateValue()

  // const signIn = () => {
  //   auth
  //     .signInWithPopup(provider)
  //     // .then(result => {
  //     //   dispatch({
  //     //     type: actionTypes.SET_USER,
  //     //     user: result.user,
  //     //   })
  //     // })
  //     .then(result => console.log(result))
  //     .catch(error => alert(error.message))
  // }

  return (
    <div className='login'>
      <div className='container' >
        <img src="https://img.icons8.com/color/100/000000/whatsapp--v2.png" />
        <div className='text'>
          <h1>Sign In To WhatsApp</h1>
        </div>
        <Button onClick={signIn}>
          <img src="https://img.icons8.com/color/32/000000/google-logo.png" />
          &nbsp;
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}


