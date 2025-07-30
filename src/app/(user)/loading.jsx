import React from 'react';
import styles from './loading.module.css';

export default function LoadingHome() {
  return (
    <div>
      <div className={styles.centered} style={{ minHeight: "100vh" }}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando...</p>
        </div>
      </div>
    </div>
  );
}