import React from "react";
import styles from "./page.module.css";
import Banner from "../../components/banner/mainBanner/banner.jsx";
import BackgroundImage from "../../components/backgrounds/backgroundImage/backgroundImage.jsx";
import BackgroundVideo from "@/components/backgrounds/backgroundVideo/backgroundVideo.jsx";
import ListLinksCard from "@/components/cards/listLinksCard/listLinksCard.jsx";
import RightPhrase from "@/components/banner/rightPhrase/rightPhrase";
import Title from "@/components/titles/pageTitle/title";
import crossImage from "../../../public/images/utils/cross.svg";
import videoSource from "../../../videos/background-video.mov"; 
import YouTubePlayer from "@/components/videos/youtubePlayer/youtubePlayer";
import SermonEndpoint from "@/services/sermonEndpoint.js";
import EventsEndpoint from "@/services/eventsEndpoint.js";


export default async function Home() {
  const sermonEndpoint = new SermonEndpoint();
  const eventEndpoint = new EventsEndpoint();
  const events = await eventEndpoint.getAll(1, 5);
  const sermons = await sermonEndpoint.getAll(1, 5);


  return <div className={styles.page}>
    <main>
      <BackgroundImage
      src={crossImage}
      width={"35%"}
      height={"70%"}
      right={"10%"}
      bottom={"0px"}/>
      
      <Banner
      title={"Jovens"}
      subtitle={"Central De Diadema"}/>
    </main>

    <section>
      <div className={styles.centered} style={{minHeight: "100vh"}}>
        <BackgroundVideo 
        src={videoSource}
        autoplay
        />

        <ListLinksCard
        title={"Eventos"}
        route={"events"}
        warnings={events}/>

        <RightPhrase/>
      </div>
    </section>

    <section>
      <Title
      title={"Útimas Programações"}
      subtitle={"Acompanhe nossas programações e fique por dentro de tudo que acontece na nossa igreja!"}/> 
      
      <div className={styles.centered} style={{minHeight: "100vh"}}>
        <div className={styles.videoContainer}>
          <YouTubePlayer
          src={sermons[0].video_url}
          title={sermons[0].title}/>
        </div>
        

        <ListLinksCard
        title={"Sermões"}
        route={"sermons"}
        warnings={sermons}/>
      </div>
    </section>
  </div>
}
