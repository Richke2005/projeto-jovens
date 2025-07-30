"use client";
import React from 'react';
import Image from 'next/image';
import styles from "./button.module.css";

const ActionButton = ({ image, type, onClick, disabled = false, children, props }) => {
    return(
        <button
        type={type || "button"}
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
            {image && <Image src={image} alt={`${children} icon`} style={{
                width: "20px",
                height: "20px",
                marginLeft: "10px"
            }} />}
        </button>
    )
}


export default ActionButton;