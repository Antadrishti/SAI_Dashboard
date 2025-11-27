import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            // Add user ID and role to session if needed
            if (session.user) {
                // Default role for now
                (session.user as any).role = 'official'
            }
            return session
        },
    },
})

export { handler as GET, handler as POST }
