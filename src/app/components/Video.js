// components/Video.js
import React from 'react';

const Video = ({ src, type, controls = true, autoplay = false, loop = false, muted = false }) => (
  <video controls={controls} autoPlay={autoplay} loop={loop} muted={muted} width="100%">
    <source src={src} type={type} />
    Your browser does not support the video tag.
  </video>
);

export default Video;
