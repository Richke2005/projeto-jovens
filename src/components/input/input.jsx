import React from 'react';
import styles from './input.module.css';

const Input = ({ type, name, placeholder, value, onChange, props }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.input}
            {...props}
        />
    );
}

export default Input;