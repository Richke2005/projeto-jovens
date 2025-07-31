"use client";
import React from 'react';
import styles from './mainCard.module.css';
import noImage from "../../../../public/images/utils/no-image.svg";
import Image from 'next/image';
import { resumeText } from '@/utils/textFormater.js';
import { useRouter } from 'next/navigation'

/**
 * MainCard component displays a card with an image, title, date, and additional information.
 * It redirects to a specific page when clicked.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - The URL of the image to display.
 * @param {string} props.title - The title of the card.
 * @param {string} props.date - The date associated with the card.
 * @param {string} props.additional - Additional information to display on the card.
 */
const MainCard = ({image, title, date, additional, href }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(href);
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <Image
            src={image == '' ? noImage : image}
            alt={title}
            fill={true}
            style={{objectFit: "cover"}}
            />
            
            <div className={styles.info}>
                <p style={{color: "var(--emphasis-color1)"}}>{date}</p>
                <h5>{title}</h5>
                <p>{resumeText(additional)}</p>
            </div>
        </div>
    );
}

export default MainCard;