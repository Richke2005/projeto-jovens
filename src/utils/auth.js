import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../app/api/_database/db.js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb", // or "mysql", "postgresql", ...etc
    }),
    
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    plugins: [
        admin() 
    ]
});