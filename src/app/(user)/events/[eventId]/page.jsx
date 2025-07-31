import React from 'react';
import styles from './event.module.css';
import Image from 'next/image';
import ArticleTitle from '@/components/titles/articleTitle/articleTitle';
import EventLayer from '@/services/accessData/eventLayer';


export default async function EventPage({ params }) {
    const eventLayer = new EventLayer();

    const { eventId } = await params;
    const event = await eventLayer.getById(eventId);

    return (
        <div className={styles.page}>
            <article className={styles.article}>
                <ArticleTitle
                title={event.title}
                author={event.local.street}
                date={event.start_date}/>

                <div className={styles.photoGrid}>
                   {event.images.map((image, index) => (
                       <Image
                           key={index}
                           src={image}
                           alt={`Event image ${index + 1}`}
                           layout="responsive"
                           objectFit="cover"
                           width={300}
                           height={200}
                       />
                   ))}

                </div>

                <p style={{width: "80%"}}>{event.description}</p>  
            </article>
        </div>
    )
}
