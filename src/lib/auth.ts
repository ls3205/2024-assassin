import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            name: 'Trevor',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "______@trevor.org" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }

                const user = await db.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password
                    }
                })

                console.log(user)

                if (user) {
                    return user
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token }) {
            if (!token.email) {
                return token
            }

            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (!dbUser) {
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                role: dbUser.role,
                status: dbUser.status
            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.picture = token.picture
                session.user.role = token.role
                session.user.status = token.status
            }

            return session
        },
        redirect() {
            return '/'
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)