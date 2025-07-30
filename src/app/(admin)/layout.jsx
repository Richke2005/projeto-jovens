import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import "../globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jovens Da Central | Admin",
  description: "Projeto Jovens Da Central",
};

export default async function RootLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/login")
  }

  if(session?.user?.role !== "admin") {
    return(
      <html lang="pt-BR">
        <body>
          <div>
            <h2>Você não tem permissão para acessar esta página.</h2>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
