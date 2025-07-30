"use client";
import React, { useState, useEffect } from 'react';
import styles from "./addImage.module.css";
import Image from 'next/image';
import InputButton from '@/components/buttons/inputButton.jsx';
import noImage from "../../../../../../public/images/utils/no-image.svg";

const AddImage = ({imageUrl = null, onImageChange }) => {
    const [imagePreview, setImagePreview] = useState(imageUrl);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (imagePreview !== null) {
            onImageChange(image);
        }
        
    }, [imagePreview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className={styles.imagePreview}>
            <Image
            src={imagePreview === null ? noImage : imagePreview}
            alt="Preview da imagem"
            fill={true}
            />  

            <div className={styles.imageActions}>
                <InputButton
                id="fileInput"
                type="file" 
                name="image" 
                accept="image/*"
                onChange={handleImageChange}
                >
                    Escolher imagem
                </InputButton>
            </div>
        </div>

    );
};

export default AddImage;
