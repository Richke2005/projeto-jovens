import React from "react";
import YouTubePlayer from "../youtubePlayer/youtubePlayer.jsx";
import Player from "../player/player.jsx";

const VideoInfo = ({ videoId, src, title, videoFrom, width }) => {
    if(videoFrom === "youtube") {
        return (
            <div style={{position: "relative", width: width}}>
                {videoFrom === "youtube" && <YouTubePlayer
                    videoId={videoId}
                    src={src}
                    title={title}/>}
                {videoFrom === "next-video" && <Player
                    src={src}/>}
            </div>
        );
    }
}

export default VideoInfo;
    