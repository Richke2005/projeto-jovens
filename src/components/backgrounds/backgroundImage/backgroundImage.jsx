import React from "react";
import Image from "next/image";

const BackgroundImage = ({src, top, right, bottom, left, width, height}) => {
    return(
        <div position="absolute" style={{ 
        position: "absolute", 
        width: width, 
        height: height,
        top: top, 
        right: right, 
        bottom: bottom,
        left: left,
        overflow: "hidden",
        zIndex: -1
        }}>
        <Image
          src={src}
          alt="Logo"
          style={{
            opacity: 0.4,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    )
}

export default BackgroundImage;