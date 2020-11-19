import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import Img from './Images/speech-bubble.svg'
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
        <img src={Img} />
        {/*<img src="https://img.icons8.com/pastel-glyph/64/ffffff/phone-message--v2.png"/>*/}
        {/*<img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTQ1OC4zNDMgOTguMDYyLTM4LjczNS00LjY2Ny05OC4yMzMtOTMuMzk1djgxLjU2bC0yNTMuMTM4LTMwLjQ5NmMtMTcuMjkyLTIuMDgzLTM0LjY5MiAzLjM1LTQ3LjcyNiAxNC45MDgtMTMuMDM1IDExLjU1OS0yMC41MTEgMjguMTgtMjAuNTExIDQ1LjYwMXY5MC4zNDljMTEuNjA3LTkuOTEzIDI2LjAxNi0xNi43MDQgNDEuOTg2LTE4Ljg5NmwzNDYuNjA4LTQ3LjU4OWMzLjY5LS41MDggNy40NTctLjc2NiAxMS4xODgtLjc2NiAxOS44NDkgMCAzOS4wMjIgNy4xODggNTMuOTg5IDIwLjIzOCAxNy44OTggMTUuNjA4IDI4LjE2MiAzOC4xNzkgMjguMTYyIDYxLjkyNnY2OS4yMWM1LjEzMi0zLjAxOSA5Ljg0NS02Ljc5MiAxMy45NjEtMTEuMjYzIDEwLjM4Ni0xMS4yODIgMTYuMTA2LTI1Ljk0MiAxNi4xMDYtNDEuMjc3di03NC45MzRjMC0zMC44MTEtMjMuMDY4LTU2LjgyNC01My42NTctNjAuNTA5eiIvPjxwYXRoIGQ9Im00NTIuOTMzIDIxNi44MzVjMC0xNS4zNjUtNi42NDItMjkuOTY5LTE4LjIyMi00MC4wNjgtMTEuNTgtMTAuMDk4LTI2Ljk1NC0xNC42OTQtNDIuMTcyLTEyLjZsLTM0Ni42MDggNDcuNTg5Yy0yNi4xODUgMy41OTUtNDUuOTMxIDI2LjIzOC00NS45MzEgNTIuNjY4djk4Ljk0NmMwIDI1LjcwOSAxNy45OSA0Ny4yMjUgNDIuNjcxIDUyLjEyNWwxMDEuNTAyIDk2LjUwNXYtODYuNjNsMjUwLjU5NiAyMy42NzdjMTQuODcxIDEuNDEgMjkuNzM0LTMuNTU0IDQwLjc4MS0xMy42MDYgMTEuMDQ3LTEwLjA1MyAxNy4zODMtMjQuMzg1IDE3LjM4My0zOS4zMjF6bS0yNjQuMjI4IDEwMi4yMDdoLTI5Ljk3M3YtMjkuOTcxaDI5Ljk3M3ptNjIuOTQ1IDBoLTI5Ljk3M3YtMjkuOTcxaDI5Ljk3M3ptNjIuOTQ3IDBoLTI5Ljk3M3YtMjkuOTcxaDI5Ljk3M3oiLz48L2c+PC9zdmc+" />*/}
        <div className='text'>
          <h1>Welcome</h1>
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


