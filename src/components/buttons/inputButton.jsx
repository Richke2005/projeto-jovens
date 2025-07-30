"use client";
import React from 'react';
import styles from './button.module.css';

const InputButton = ({ name, accept, onClick, onChange, children }) => {
    return (
        <div>
            <label htmlFor="fileInput" className={styles.button}>
                {children}
            </label>
            <input
            id='fileInput'
                type="file"
                name={name}
                accept={accept}
                onClick={onClick}
                onChange={onChange}
                style={{ display: 'none' }} // Hide the input button
            />
        </div>
    );
};


export default InputButton;

