import React from 'react';
import Link from 'next/link';
import styles from './listLinkCard.module.css';
import { formatDate } from '@/utils/textFormater.js';

const ListLinksCard = ({ title, warnings = [], route }) => {
    return<aside className={styles.warningCard}>
        <div className={styles.viewAll}>
            <h4>{title}</h4>
            <Link href={`/${route}`}>Ver todos</Link>
        </div>
        
        <ul className={styles.warningList}>
            {warnings.map((warning, index) => (
                <Link key={warning.id} href={`/${route}/${warning.id}`} className={styles.warningLink}>
                    <div style={{textAlign: "left"}}>
                        <span className={styles.date}>{formatDate(warning.start_date)}</span>
                        <li>{warning.title}</li>
                    </div>
                </Link>
            ))}
        </ul>
        {warnings.length === 0 && <p><span style={{color: "red"}}>No content yet</span></p>}
    </aside>
}

export default ListLinksCard;