"use client";
import React, { useState, useEffect, useRef} from "react";
import styles from  "./header.module.css"; // Importing the CSS module
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import logo from "@/../public/vercel.svg"; 

const links = [{
    label: "Home",
    href: "/"
}, {
    label: "Sermões",
    href: "/sermons"
}, {
    label: "Eventos",
    href: "/events"
}, {
    label: "Estudos",
    href: "/estudos"
}, {
    label: "Playlists",
    href: "/playlists"
}, {
    label: "Quem Somos",
    href: "/quem-somos"
}]

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Function to handle clicks outside the sidebar
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    return (
        <header>
        <div className={styles.container}>
            <div className={styles.logo}>
                
            </div>
            <nav>
                <ul className={styles.navList}>
                    {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href}>
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
            <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="sidebar-menu">
                <span className={`${isOpen ? styles.colored : ""}`}></span>
                <span className={`${isOpen ? styles.colored : ""}`}></span>
                <span className={`${isOpen ? styles.colored : ""}`}></span>
            </button>
        </div>
        <aside ref={ref} className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
            <nav>
                <ul className={styles.sidebarMenu} id="sidebar-menu">
                    {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href}>
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </aside>
        </header>
    );
}

export default Header;