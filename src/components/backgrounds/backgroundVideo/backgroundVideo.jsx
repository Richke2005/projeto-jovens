import React from "react";
import styles from "./backgroundVideo.module.css";
import NextVideo from "next-video";

const BackgroundVideo = ({src, props}) => {
    return(
        <div className={styles.container}>
            <NextVideo 
                src={src}
                playsInline={true}
                autoPlay={true}
                loop={true}
                muted={true}
                controls={false}
                style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                }}
            />
        </div>
    )
}

export default BackgroundVideo;