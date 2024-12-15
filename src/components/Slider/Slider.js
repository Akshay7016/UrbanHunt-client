import { useState } from 'react';

import './Slider.scss';

export const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === 'left') {
      if (imageIndex === 0) {
        return setImageIndex(images.length - 1);
      }
      setImageIndex(imageIndex - 1);
    } else {
      if (imageIndex === images.length - 1) {
        return setImageIndex(0);
      }
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide('left')}>
            <img src="/images/arrow.png" alt="arrow-left" />
          </div>
          <div className="imageContainer">
            <img src={images[imageIndex]} alt="full-image" />
          </div>
          <div className="arrow" onClick={() => changeSlide('right')}>
            <img src="/images/arrow.png" className="right" alt="arrow-right" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="big-image" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`small-image-${index + 1}`}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
