"use client";
import React, { useState, useEffect, useTransition } from 'react';
import styles from './sermons.module.css';
import Card from "@/components/cards/card/card.jsx";
import SermonEndpoint from '@/services/client/sermonEndpoint.js';
import { formatDate } from '@/utils/textFormater.js';
import ActionButton from '@/components/buttons/actionButton';
import Loading from '../loading.jsx';

const SERMONS_PER_PAGE = 10;

export default function ClientSermons(){
    const sermonEndpoint = new SermonEndpoint();
    const [sermons, setSermons] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    const countResults = async () => {
      const count = await sermonEndpoint.count();
      const totalPages = Math.ceil(count / SERMONS_PER_PAGE);
      setTotalPages(totalPages);
    }

    const handleChangePage = (newPage) => {
      startTransition(async () => {
        if (newPage < 1 || newPage > totalPages) return;
        const newUsers = await sermonEndpoint.getAll(newPage, SERMONS_PER_PAGE);
        if (newUsers.length === 0) return <div>No results found</div>;
        setSermons(newUsers);
        setPage(newPage);
      });
    }

    const fetchData = async () => {
      const data = await sermonEndpoint.getAll(1, SERMONS_PER_PAGE);
      setSermons(data);
    };

    useEffect(() => {
      countResults();
      fetchData();
    }, []);

    if (sermons.length === 0) return <Loading/>;

    return(
    <div>
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

      {isPending && <Loading />}

      <div className={styles.changePageContainer}>
        <ActionButton
          onClick={() => handleChangePage(page - 1)}
        >
          Anterior
        </ActionButton>
        
        <ActionButton
          onClick={() => handleChangePage(page + 1)}
        >
          Próximo
        </ActionButton>
      </div>
    </div>
    );
}