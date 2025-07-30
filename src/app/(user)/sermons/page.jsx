"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './sermons.module.css';
import Title from '@/components/titles/pageTitle/title';
import MainCard from '@/components/cards/mainCard/mainCard';
import Card from "@/components/cards/card/card.jsx";
import SermonEndpoint from '@/services/sermonEndpoint';
import { formatDate } from '@/utils/textFormater.js';
import ActionButton from '@/components/buttons/actionButton';
import Loading from '../loading.jsx';


export default function SermonPage() {
  const [sermons, setSermons] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const sermonEndpoint = new SermonEndpoint();
  const qtdPages = Math.ceil(count / 10); // Assuming 10 items per page

  async function changePage(newPage){
    if(newPage > 0 && newPage <= qtdPages) {
      setPage(newPage);
    }
  }

   const countResults = async () => {
    const count = await sermonEndpoint.count();
    setCount(count);
  };

  const fetchData = async () => {
    const data = await sermonEndpoint.getAll(page, 10);
    setSermons(data);
  };

  useEffect(() => {
    countResults();
    fetchData();
  }, [page]);

  if (!sermons || sermons.length === 0) {
    return <Loading/>;
  }

  return (
    <div className={styles.page}>
      <main>
        <Title title={"Sermões"} />
        <div className={styles.centered} style={{ minHeight: "100vh" }}>
          <MainCard
            image={sermons[0].cover_image_url}
            title={sermons[0].title}
            date={formatDate(sermons[0].start_date)}
            additional={sermons[0].preacher}
            href={`/sermons/${sermons[0].id}`}
          />
        </div>
      </main>

      <div className={styles.cardsContainer}>
        {sermons.map((sermon) => (
          <Card
            key={sermon.id}
            image={sermon.cover_image_url}
            title={sermon.title}
            date={formatDate(sermon.start_date)}
            additional={sermon.preacher}
            href={`/sermons/${sermon.id}`}
          />
        ))}
      </div>

      <div className={styles.changePageContainer}>
        <ActionButton
          onClick={() => changePage(page - 1)}
        >
          Anterior
        </ActionButton>
        
        <ActionButton
          onClick={() => changePage(page + 1)}
        >
          Próximo
        </ActionButton>
      </div>
    </div>
  );
}