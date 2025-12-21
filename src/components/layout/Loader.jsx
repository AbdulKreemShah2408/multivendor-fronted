import React from 'react'
import Lottie from "react-lottie";
import animationData from "../../Assests/animations/24151-ecommerce-animations.json"

const Loader = () => {
    const defaultOptions={
     loop:false,
     autoplay:true,
     animationData:animationData,
     rendererSettings:{
        preserveAspectRatio:"xMidYMid slice"
     }


    };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} height={200} width={200}/>
    </div>
  )
}

export default Loader;