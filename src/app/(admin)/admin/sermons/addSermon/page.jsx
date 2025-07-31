"use client";
import React from 'react';
import styles from "./addSermon.module.css";
import ActionButton from '@/components/buttons/actionButton.jsx';
import AddVideo from '../../../components/videos/addVideo.jsx';
import AddImage from '../../../components/images/addImage/addImage.jsx';
import Spinner from '@/components/spinner/spinner';
import SermonEndpoint from '@/services/server/sermonEndpoint.js';
import FilesEndpoint from '@/services/server/filesEndpoint';
import { useState } from 'react';


export default function AddSermonPage() {
    const [isUploading, setIsUploading] = useState(false);

    const [preacher, setPreacher] = useState('');
    const [startDate, setStartDate] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [summary, setSummary] = useState('');

    const handleImageChange = (file) => {
        setImage(file);
    }

    const handleVideoChange = (url) => {
        setVideoUrl(url);
    }

    function validateForm() {
        if (!title || !preacher || !image || !videoUrl || !summary) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return false;
        }

        return true;
    }

    const handleAddSermon = async (e) => {
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
                await sermonEndpoint.create(sermonData);
                
                alert("Sermão adicionado com sucesso!");
            }
            setIsUploading(false);
        }catch (error) {
            console.error("Erro ao adicionar sermão:", error);
            alert("Erro ao adicionar sermão. Tente novamente.");
            setIsUploading(false);
        }
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
                        placeholder='Pregador*'/>

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
                        placeholder="Título*" 
                        style={{ fontSize: "2.9rem" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                </div>
                
                <div className={styles.uploadContainer}>
                    <div className={styles.imageUpload}>
                        <AddImage onImageChange={handleImageChange}/>
                    </div>

                    <div className={styles.videoUpload}>
                        <AddVideo onVideoChange={handleVideoChange}/>
                    </div>
                </div>
                    
                <textarea 
                name="summary" 
                placeholder="Resumo*"
                value={summary}
                onChange={(e)=>setSummary(e.target.value)}/>  

                <ActionButton onClick={handleAddSermon}>
                    <div style={{display: "flex", alignItems: "center", gap: 10}}>
                        {isUploading ? <Spinner /> : ''} 
                        Adicionar Sermão
                    </div>
                </ActionButton>
            </article>
        </div>
    );
}