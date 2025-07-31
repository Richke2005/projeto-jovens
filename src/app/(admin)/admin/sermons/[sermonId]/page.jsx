"use client";
import React, { useState, useEffect } from 'react';
import styles from "./editSermon.module.css";
import { useParams } from 'next/navigation';
import ActionButton from '@/components/buttons/actionButton.jsx';
import AddVideo from '../../../components/videos/addVideo.jsx';
import AddImage from '../../../components/images/addImage/addImage.jsx';
import Spinner from '@/components/spinner/spinner';
import SermonEndpoint from '@/services/server/sermonEndpoint.js';
import FilesEndpoint from '@/services/server/filesEndpoint';
import Loading from '../../../loading.jsx';



export default function EditSermonPage() {
    const params = useParams();
    const { sermonId } = params;
    const sermonsEndpoint = new SermonEndpoint();
    const filesEndpoint = new FilesEndpoint();

    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [preacher, setPreacher] = useState('');
    const [startDate, setStartDate] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [summary, setSummary] = useState('');

    const fetchSermon = async () => {
        setIsLoading(true);
        const { title, preacher, start_date, video_url, cover_image_url, summary } = await sermonsEndpoint.getById(sermonId);
        
        setPreacher(preacher);
        setTitle(title);
        setStartDate(
            start_date
                ? new Date(start_date).toISOString().slice(0, 16)
                : ''
        );
        setVideoUrl(video_url);
        setImage(cover_image_url);
        setSummary(summary);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSermon();
    }, [sermonId]);


    // Função para lidar com o upload da imagem e gerar o preview
    const handleImageChange = (file) => {
        setImage(file);
    }

    const handleVideoChange = (url) => {
        setVideoUrl(url);
    }

       function validateForm() {
        if (!title || !preacher || !summary) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return false;
        }

        return true;
    }

    const handleUpdateSermon = async (e) => {
        e.preventDefault();
        const filesEndpoint = new FilesEndpoint();
        const sermonEndpoint = new SermonEndpoint();
        const groupId = 'b34c8b15-110d-4e59-b655-18fae0bd6ab1';
        
        try{
            setIsUploading(true);
            if (validateForm()) {
                // Upload the image file
                const imageUrl = await filesEndpoint.uploadFile(image, groupId);

                const sermonData = {
                    title: title,
                    cover_image_url: imageUrl,
                    video_url: videoUrl,
                    summary: summary,
                    start_date: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
                    preacher: preacher,
                    department_id: '64b1aaccb9fc1a0012a3abce'
                }

                // Create the sermon with the uploaded image URL
                await sermonEndpoint.update(sermonId, sermonData);

                alert("Sermão atualizado com sucesso!");
            }
            setIsUploading(false);
        }catch (error) {
            console.error("Erro ao adicionar sermão:", error);
            alert("Erro ao Atualizar sermão. Tente novamente.");
            setIsUploading(false);
        }
    }

    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <div className={styles.page}>
            <article className={styles.article}>
                <div style={{width: "100%", padding: 20, display: "flex", flexDirection: "column", gap: 10}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <input 
                        id="preacher"
                        type="text"
                        name="preacher" 
                        value={preacher}
                        onChange={(e) => setPreacher(e.target.value)}
                        placeholder='Pregador'/>

                        <input
                        id="date" 
                        type="datetime-local" 
                        name="date_start" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <hr/>
                    <div>
                        <input 
                        id="title"
                        type="text" 
                        name="title" 
                        required
                        placeholder="Título" 
                        style={{ fontSize: "2.9rem" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                </div>
                
                <div className={styles.uploadContainer}>
                    <div className={styles.imageUpload}>
                        <AddImage 
                        imageUrl={image}
                        onImageChange={handleImageChange}/>
                    </div>

                    <div className={styles.videoUpload}>
                        <AddVideo 
                        videoUrl={videoUrl}
                        onVideoChange={handleVideoChange}/>
                    </div>
                </div>
                    
                <textarea 
                name="summary" 
                placeholder="Resumo"
                value={summary}
                onChange={(e)=>setSummary(e.target.value)}/>  

                <ActionButton onClick={handleUpdateSermon}>
                    <div style={{display: "flex", alignItems: "center", gap: 10}}>
                        {isUploading ? <Spinner /> : ''} 
                        Atualizar Sermão
                    </div>
                </ActionButton>
            </article>
        </div>
    );
}