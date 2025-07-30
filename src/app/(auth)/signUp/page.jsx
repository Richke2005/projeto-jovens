"use client";
import React, { useState } from 'react';
import styles from './signUp.module.css'; // Adjust the path as necessary
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from "@/utils/authClient";
import Input from '@/components/input/input';
import ActionButton from '@/components/buttons/actionButton';

export default function SignUpPage() {
    const [isSigningUp, setIsSiginUp] = useState(false);
    const router = useRouter();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const { retunedData, error } = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: "/"
            }, 
            {
                onRequest: (ctx) => {
                    setIsSiginUp(true);  
                },
                onSuccess: (ctx) => {
                    setIsSiginUp(false);
                    router.push("/");
                },
                onError: (ctx) => {
                    setIsSiginUp(false);
                    console.error("Sign-up error:", ctx.error);
                }
            });
           
        } catch (error) {
            setIsSiginUp(false);
            console.error("An error occurred during sign-up:", error);
        }
    }

    return(
        <div className={styles.centered}>
            <div className={styles.signUpContainer}>
                <h3 className={styles.title}>Bem-vindo!</h3>
                <form onSubmit={handleSignUp} className={styles.signUpForm}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Digite seu nome completo"
                        required/>
                
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        required/>
            
                    <Input
                        type="text"
                        name="password"
                        placeholder="Digite sua senha"
                        required/>
                
                    <ActionButton 
                    type="submit"
                    disabled={isSigningUp}>
                        {isSigningUp ? "Cadastrando..." : "Cadastrar-se"}
                    </ActionButton>
                </form>

                <p>Já possui uma conta? <Link href="/login" style={{color: "var(--emphasis-color1)"}}>login</Link></p>
            </div>
        </div>
    )
}