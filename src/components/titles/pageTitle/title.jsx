import React from 'react';
import styles from './title.module.css';

const Title = ({ title, subtitle }) => {
  return<div className={styles.container}>
          <h3>{title}</h3>
          <h6>{subtitle}</h6>
    </div>
}

export default Title;