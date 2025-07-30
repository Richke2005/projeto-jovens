import React from "react";
import Image from "next/image";
import styles from "./button.module.css";

const LinkButton = ({ href, image, children}) => {
    return(
        <a href={href} className={styles.button}>
            {image && <Image src={image} alt={`Link to ${children}`} width={20} height={20} />}
            {children}
        </a>
    )
}

export default LinkButton;