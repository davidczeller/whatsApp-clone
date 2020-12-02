import React, { useState } from "react";

import './ImageCarousel.css'

export default function ImageCarousel({ images, idx }) {// takes in images as props
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  images = images.filter(el => {
    return el !== undefined && !el.includes('youtube')
  })
  // const [imgIndex, setImgIndex] = useState(0)

  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  document.onkeydown = checkKey;

  function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
      slideLeft()
    }
    else if (e.keyCode == '39') {
      slideRight()
    }
  }

  return (
    images.length > 0 && (
      <div className='imageCarouselContainer'>
        <button
          onClick={slideLeft}
          className='imageCarouselBtn'
        >
          {"<"}
        </button>
        <img
          src={images[index]}
          alt={index}
          className='imageCarouselImg'
        // style={{ opacity: index !== imgIndex ? '0' : '1' }}
        />
        <button
          onClick={slideRight}
          className='imageCarouselBtn'
        >
          {">"}
        </button>
        <div className='imageLibrary'>
          {images.map((img, idx) => (
            <img
              key={idx + 1}
              src={img}
              alt={idx}
              onClick={() => setIndex(idx)}
              style={{ border: index === idx ? '1px solid #fff' : 'none' }}
            />
          ))}
        </div>
      </div>
    )
  );
};
