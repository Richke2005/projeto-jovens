"use client";
import React, { useState } from 'react';
import styles from './login.module.css'; // Adjust the path as necessary
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from "@/utils/authClient";
import Input from '@/components/input/input';
import ActionButton from '@/components/buttons/actionButton';
import googleIcon from "../../../../public/images/icons/google-icon.png"

export default function LoginPage() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        try {
            const { returnedData, error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: "/"
            }, 
            {
                onRequest: (ctx) => {
                    setIsLoggingIn(true);
                },
                onSuccess: (ctx) => {
                    setIsLoggingIn(false);
                },
                onError: (ctx) => {
                    setIsLoggingIn(false);
                    console.error("Login error:", ctx.error);
                    alert("Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.");
                }
            });
        } catch (error) {
            setIsLoggingIn(false);
            console.error("An error occurred during login:", error);
        }
    }

    return(
        <div className={styles.centered}>
            <div className={styles.loginContainer}>
                <h3 className={styles.title}>Bem-vindo de volta!</h3>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        required/>
            
                    <Input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                        required/>
                    
                    <ActionButton 
                    type="submit"
                    disabled={isLoggingIn}>
                        {isLoggingIn ? "Aguarde..." : "Login"}
                    </ActionButton>

                    <ActionButton 
                    type="submit"
                    image={googleIcon}
                    disabled={isLoggingIn}>
                        {isLoggingIn ? "Aguarde..." : "Entrar com "}
                    </ActionButton>
                </form>

                <p>Não possui conta? <Link href="/signUp" style={{color: "var(--emphasis-color1)"}}>cadastrar-se</Link></p>
            </div>
        </div>
    )
}