"use client";
import React, { useState, useEffect } from 'react';
import styles from "./addVideo.module.css";
import Image from 'next/image';
import YouTubePlayer from '@/components/videos/youtubePlayer/youtubePlayer.jsx';
import ActionButton from '@/components/buttons/actionButton';
import noVideo from "../../../../../public/images/utils/no-video.svg";

const AddVideo = ({videoUrl = '', onVideoChange}) => {
    const [clipboardContent, setClipboardContent] = useState(videoUrl);

    useEffect(() => {
        if (clipboardContent !== '') {
            onVideoChange(clipboardContent);
        }
    }, [clipboardContent]);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setClipboardContent(text);
        } catch (error) {
            console.error('Falha ao ler a área de transferência:', error);
        }
    };

    if (clipboardContent === '') {
        return (
        <div className={styles.videoPreview}>
            <Image 
            src={noVideo} 
            alt="No video"
            fill={true}/>

            <div className={styles.videoActions}>
                <ActionButton
                id="videoInput"
                type="file"
                name="video"
                accept="video/*"
                onClick={handlePaste}>
                    Colar Url
                </ActionButton>
            </div>
        </div>
        );
    }

    return(
        <div className={styles.videoPreview}>
            <YouTubePlayer
            src={clipboardContent}/>

            <div className={styles.videoActions}>
                <ActionButton
                id="videoInput"
                type="file"
                name="video"
                accept="video/*"
                onClick={handlePaste}>
                    Colar Url
                </ActionButton>
            </div>
        </div>
    )
}

export default AddVideo;