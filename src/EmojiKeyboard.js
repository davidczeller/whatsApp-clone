import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

import './EmojiKeyboard.css'


function EmojiKeyboard({ emojiOpen }) {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const element = document.querySelector('.msgInput');

  const onEmojiClick = (event, emojiObject) => {
    if (element) element.value = emojiObject.originalUnified
    setChosenEmoji(emojiObject);
  };

  return (
    emojiOpen && (
      <div className='emojiContainer'>
        {chosenEmoji ? (
          <span>You chose: {chosenEmoji.emoji}</span>
        ) : (
            <span>No emoji Chosen</span>
          )}
        <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} disableSearchBar/>
      </div>
    )
  );
}

export default EmojiKeyboard
