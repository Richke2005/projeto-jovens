import React from 'react';
import { formatDate } from '@/utils/textFormater.js'; // Assuming you have a utility function for date formatting
import styles from './articleTitle.module.css';

const ArticleTitle = ({ title, author, date }) => {
    return<div className={styles.titleContainer}>
        <div className={styles.titleHeader}>
            <h6>{author}</h6><h6 style={{color: "var(--emphasis-color1)"}}>{formatDate(date)}</h6> 
        </div>
        <hr/>
        <div>
            <h2>{title}</h2>
        </div>
    </div>
}

export default ArticleTitle;