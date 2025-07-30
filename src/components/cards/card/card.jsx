"use client";
import React from 'react';
import styles from "./card.module.css";
import Image from 'next/image';
import noImage from "../../../../public/images/utils/no-image.svg";
import { resumeText } from '@/utils/textFormater';
import { useRouter } from 'next/navigation';


const Card = ({ date, title, additional, image, href, children, isRouting = true}) => {
    const router = useRouter();

    const handleClick = () => {
        // Redirect to a specific page
        router.push(href);
    };

    return <article className={styles.sermonCard} onClick={ isRouting ? handleClick : null}>
        <Image
        width={300}
        height={150}
        src={image == '' ? noImage : image}
        className={styles.image}
        alt={`image - ${title}`}/>

        <div className={styles.info}>
            <p style={{color: "var(--emphasis-color1)"}}>{date}</p>
            <h5>{title}</h5>
            <p>{resumeText(additional)}</p>
            {children}
        </div>
    </article>
}

export default Card;