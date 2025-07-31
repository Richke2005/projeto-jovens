import React from "react";
import styles from "./events.module.css";
import Title from '@/components/titles/pageTitle/title.jsx';
import MainCard from '@/components/cards/mainCard/mainCard.jsx';
import ClientEvents from "./clientEvents.jsx";
import EventEndpoint from '@/services/server/eventEndpoint.js';
import { formatDate } from "@/utils/textFormater.js";


export default async function EventsPage(){
  const eventEndpoint = new EventEndpoint();
  const events = await eventEndpoint.getLastEvent();

  return (
    <div className={styles.page}>
      <main>
        <Title title={"Eventos"} />
        <div className={styles.centered} style={{ minHeight: "100vh" }}>
          <MainCard
            image={events.cover_image_url}
            title={events.title}
            date={`${formatDate(events.start_date)} até ${formatDate(events.end_date)}`}
            additional={events.description}
            href={`/events/${events.id}`}
          />
        </div>
      </main>
      <ClientEvents/>
    </div>
    )
}