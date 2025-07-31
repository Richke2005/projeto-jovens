"use client";
import React, { useState, useEffect, useTransition } from 'react';
import styles from './events.module.css';
import Card from "@/components/cards/card/card.jsx";
import EventEndpoint from '@/services/client/eventEndpoint.js';
import { formatDate } from '@/utils/textFormater.js';
import ActionButton from '@/components/buttons/actionButton';
import Loading from '../loading.jsx';

const EVENTS_PER_PAGE = 10;

export default function ClientEvents() {
    const eventEndpoint = new EventEndpoint();
    const [events, setEvents] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    const countResults = async () => {
        const count = await eventEndpoint.count();
        const totalPages = Math.ceil(count / EVENTS_PER_PAGE);
        setTotalPages(totalPages);
    }

    const handleChangePage = (newPage) => {
        startTransition(async () => {
        if (newPage < 1 || newPage > totalPages) return;
        const newEvents = await eventEndpoint.getAll(newPage, EVENTS_PER_PAGE);
        if (newEvents.length === 0) return <div>No results found</div>;
            setEvents(newEvents);
            setPage(newPage);
        });
    }

    const fetchData = async () => {
        const data = await eventEndpoint.getAll(1, EVENTS_PER_PAGE);
        setEvents(data);
    };

    useEffect(() => {
        countResults();
        fetchData();
    }, []);

    if (events.length === 0) return <Loading />;

    return (
    <div>
      <div className={styles.cardsContainer}>
        {events.map((event) => (
          <Card
            key={event.id}
            image={event.cover_image_url}
            title={event.title}
            date={`${formatDate(event.start_date)} até ${formatDate(event.end_date)}`}
            additional={event.description}
            href={`/events/${event.id}`}
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