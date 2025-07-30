import React from 'react';
import LinkButton from '@/components/buttons/linkButton';
import styles from './rightPhrase.module.css';

const RightPhrase = () => {
  return (
    <div className={styles.rightPhrase }>
          <h3>Os jovens pelos <span style={{color: "var(--emphasis-color1)"}}>jovens</span></h3>
          <h3>os jovens pela <span style={{color: "var(--emphasis-color1)"}}>igreja</span></h3>
          <h3>e os jovens pelos seus <span style={{color: "var(--emphasis-color1)"}}>semelhantes.</span></h3>

          <div className={styles.buttonsContainer}>
            <LinkButton href={"/signUp"}>
              <p>É novo aqui</p>
            </LinkButton>
            <LinkButton href={"/sermons"}>
              <p>Sermões</p>
            </LinkButton>
          </div>
        </div>
  );
}


export default RightPhrase;