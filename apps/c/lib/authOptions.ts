import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@repo/db/client";




export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("missing email or password")

                }
                try {
                    const userExist = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })
                    if (!userExist) {
                        throw new Error("user doesnot exist");
                    }
                    const isValidPassoword = await bcrypt.compare(
                        credentials.password,
                        userExist.password
                    );
                    if (!isValidPassoword) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: userExist.id.toString(),
                        email: userExist.email
                    }
                } catch (error) {
                    console.log(error)
                    return null

                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },

    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    secret: process.env.NEXTAUTH_SECRET
}