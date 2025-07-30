import React from "react";
import styles from "./youtubePlayer.module.css";
import Image from "next/image";
import noVideo from "../../../../public/images/utils/no-video.svg";

const YouTubePlayer = ({ videoId, src, title}) => {
    if (!videoId && !src) {
        return <div className={styles.error}><Image src={noVideo} alt="No video available" fill={true}/></div>;
    }
    
    return <iframe 
    className={styles.player}
    src={src || `https://www.youtube.com/embed/${videoId}`} 
    title="YouTube video player" 
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    playsInline={true}
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen/>
}

export default YouTubePlayer;

