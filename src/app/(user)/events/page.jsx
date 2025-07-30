"use client";
import React, { useState, useEffect } from "react";
import styles from "./events.module.css";
import Title from '@/components/titles/pageTitle/title.jsx';
import MainCard from '@/components/cards/mainCard/mainCard.jsx';
import ActionButton from '@/components/buttons/actionButton.jsx';
import Card from "@/components/cards/card/card.jsx";
import EventEndpoint from '@/services/eventsEndpoint.js';
import { formatDate } from "@/utils/textFormater.js";
import Loading from '../loading.jsx';


export default function EventsPage(){
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const eventEndpoint = new EventEndpoint();
  const qtdPages = Math.ceil(count / 10); // Assuming 10 items per page

  async function changePage(newPage){
    if(newPage > 0 && newPage <= qtdPages) {
      setPage(newPage);
    }
  }

  const countResults = async () => {
    const count = await eventEndpoint.count();
    setCount(count);
  };

  const fetchData = async () => {
    const data = await eventEndpoint.getAll(page, 10);
    setEvents(data);
  };

  useEffect(() => {
    countResults();
    fetchData();
  }, [page]);

  if (!events || events.length === 0) {
    return <Loading/>;
  }

  return (
    <div className={styles.page}>
      <main>
        <Title title={"Eventos"} />
        <div className={styles.centered} style={{ minHeight: "100vh" }}>
          <MainCard
            image={events[0].cover_image_url}
            title={events[0].title}
            date={`${formatDate(events[0].start_date)} até ${formatDate(events[0].end_date)}`}
            additional={events[0].description}
            href={`/events/${events[0].id}`}
          />
        </div>
      </main>

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
    )
}