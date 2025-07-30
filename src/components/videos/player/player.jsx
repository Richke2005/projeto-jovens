import React from "react";
import NextVideo from "next-video";


const Player = ({ props, src }) => {
    return<NextVideo 
        src={src}
        {...props}
        style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover" 
        }}
    />
}

export default Player;