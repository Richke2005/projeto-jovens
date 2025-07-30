"use client";
import React from 'react';
import styles from "./banner.module.css";
import { motion, useScroll } from "motion/react";

const animation = {
    initial:{
        opacity: 0.1,
        y: 100
    },
    animate:{
        opacity: 1,
        y: 0
    }
}

const Banner = ({title, subtitle}) =>{
    const { scrollYProgress } = useScroll();
   
    return (
        <div className={styles.banner}>
            <motion.h1 
            initial={animation.initial}
            animate={animation.animate}
            transition={{
                duration: 1,
                type: "tween",
            }}>{title}</motion.h1>
            
            <motion.h6
            initial={animation.initial}
            animate={animation.animate}
            transition={{
                delay: 0.2,
                duration: 1,
                type: "tween",
            }}>{subtitle}</motion.h6>
        </div>
    )
}

export default Banner;