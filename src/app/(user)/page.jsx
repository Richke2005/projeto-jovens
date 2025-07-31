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
import SermonLayer from "@/services/accessData/sermonLayer.js";
import EventLayer from "@/services/accessData/eventLayer.js";


export default async function Home() {
  const sermonLayer = new SermonLayer();
  const eventLayer = new EventLayer();
  const events = await eventLayer.getAll({ isPaginated: true, page: 1, limit: 5 });
  const sermons = await sermonLayer.getAll({ isPaginated: true, page: 1, limit: 5 });

  if (!events || !sermons) {
    return <div>No events or sermons found</div>;
  }

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
