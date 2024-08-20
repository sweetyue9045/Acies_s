import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/lotties/loading.json'; 
import '../style/Loading.css';

export default function Load() {
  return (
    <div className="loading">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
}