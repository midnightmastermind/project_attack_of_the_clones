/**
 * This code is a React component that lazy loads images.
 * It uses the React Lazy Load Image Component to do so.
 */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ image }) => (
  <div className={image.class}>
    <LazyLoadImage
      alt={image.alt}
      //height={image.height}
      src={image.src} // use normal <img> attributes as props
      //width={image.width} 
      />
    {/*<span>{image.caption}</span>*/}
  </div>
);

export default LazyImage;
