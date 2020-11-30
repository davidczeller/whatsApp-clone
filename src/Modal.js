import React from 'react'

import { Modal as Dialog, Backdrop, Fade, Button, IconButton } from '@material-ui/core';
import { SentimentVeryDissatisfied, Close } from '@material-ui/icons'

import './Modal.css'


export function Modal(props) {
  const {
    url,
    text,
    isOpen,
    setIsOpen,
    content,
    idx
  } = props;

  // console.log(content)

  return (
    <div>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='modal'
        open={isOpen}
        onClose={!isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div
            className='paper'
          >
            {url && (
              <>
                <img src={url} height='100%' width='100%' style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
                {/* <div className='modalImageContainer'>
                  <img src={url} height='120' width='120' style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
                </div> */}
                <CloseModal url={url} setIsOpen={setIsOpen} />
              </>
            )}
            {content && (
              <>
                {content}
                <CloseModal content={content} setIsOpen={setIsOpen} />
              </>
            )}
            {!content && !url && (
              <>
                <h2 id="transition-modal-title" style={{ color: '#fff' }}>
                  There is  nothing to see!
                  </h2>
                <SentimentVeryDissatisfied style={{ color: '#fff', fontSize: '4rem', margin: '16px 0' }} />
                <CloseModal setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        </Fade>
      </Dialog>
    </div>
  )
}

export function CloseModal(props) {
  const {
    content,
    url,
    setIsOpen,
  } = props


  return (
    !content && !url ? (
      <Button
        className='close-modal-button'
        onClick={() => setIsOpen(false)}
      >
        Close Modal
      </Button>
    ) : (
        <IconButton
          // className='close-modal-button'
          onClick={() => setIsOpen(false)}
        >
          <Close />
        </IconButton>
      )
  )
}

