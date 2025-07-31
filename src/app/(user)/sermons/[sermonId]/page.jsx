import React from 'react';
import styles from './sermon.module.css';
import ArticleTitle from '@/components/titles/articleTitle/articleTitle';
import YouTubePlayer from '@/components/videos/youtubePlayer/youtubePlayer';
import SermonEndpoint from '@/services/server/sermonEndpoint';


export const metadata = {
    title: "Jovens Da Central | Sermão Detalhes",
    description: "Detalhes do sermão específico",
};

export default async function SermonPage({ params }) {
    const sermonEndpoint = new SermonEndpoint();

    const { sermonId } = await params;
    const sermon = await sermonEndpoint.getById(sermonId);

    return (
        <div className={styles.page}>
            <article className={styles.article}>
                <ArticleTitle
                title={sermon.title}
                author={sermon.preacher}
                date={sermon.start_date}/>

                <div className={styles.videoContainer}>
                    <YouTubePlayer
                    src={sermon.video_url}/>
                </div>
                
            
                <p style={{width: "80%"}}>{sermon.summary}</p>  
            </article>
        </div>
    );
    }