import React from 'react';
import styles from './sermons.module.css';
import Title from '@/components/titles/pageTitle/title';
import MainCard from '@/components/cards/mainCard/mainCard';
import ClientSermons from './clientSermons';
import SermonLayer from '@/services/accessData/sermonLayer.js';
import { formatDate } from '@/utils/textFormater.js';

export default async function SermonPage() {
  const sermonLayer = new SermonLayer();
  const sermons = await sermonLayer.getLastSermon();

  if (!sermons) {
    return <div>No sermons found</div>;
  }

  return (
    <div className={styles.page}>
      <main>
        <Title title={"Sermões"} />
        <div className={styles.centered} style={{ minHeight: "100vh" }}>
          <MainCard
            image={sermons.cover_image_url}
            title={sermons.title}
            date={formatDate(sermons.start_date)}
            additional={sermons.preacher}
            href={`/sermons/${sermons.id}`}
          />
        </div>
      </main>
      <ClientSermons/>
    </div>
  );
}