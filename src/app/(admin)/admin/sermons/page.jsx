"use client";
import React, {useState, useEffect} from 'react';
import styles from './sermons.module.css';
import Title from '@/components/titles/pageTitle/title';
import Card from "@/components/cards/card/card.jsx";
import LinkButton from '@/components/buttons/linkButton';
import ActionButton from '@/components/buttons/actionButton';
import SermonEndpoint from '@/services/client/sermonEndpoint.js';
import Loading from '../../loading.jsx';
import { formatDate } from '@/utils/textFormater';


export default function AdmSermonPage() {
  const sermonsEndpoint = new SermonEndpoint();
  const [sermons, setSermons] = useState([]);
  
  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    const fetchedSermons = await sermonsEndpoint.getAll();
    setSermons(fetchedSermons);
  };

  const handleDelete = async (id) => {
    if (confirm("Você tem certeza que deseja excluir este sermão?")) {
      sermonsEndpoint.delete(id).then(() => {
        fetchSermons();
        alert("Sermão excluído com sucesso!");
      });
    } else {
      return;
    }
  };

  if (!sermons || sermons.length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <section>
        <Title
        title={"Sermões"}/>
        <div className={styles.cardsContainer}>
          {sermons.map((sermon) => (
          <Card
            key={sermon.id}
            image={sermon.cover_image_url}
            title={sermon.title}
            date={formatDate(sermon.start_date)}
            additional={sermon.preacher}
            href={`/admin/sermons/${sermon.id}`}
            isRouting={false}
          >
            <div className={styles.actions}>
               <LinkButton 
                href={`/admin/sermons/${sermon.id}`}>
                Editar
              </LinkButton>

              <ActionButton
                type="button"
                onClick={() => handleDelete(sermon.id)}
              >
                Excluir
              </ActionButton>
            </div>
           
          </Card>
          ))}
        </div>
      </section>
    </div>
  );
}