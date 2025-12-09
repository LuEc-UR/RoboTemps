import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
   providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 🔐 1. VALIDAZIONE BASE
        if (!credentials?.email || !credentials?.password) return null;

        // 🔐 2. UTENTE FAKE (da sostituire con DB in futuro)
        const user = {
          id: "1",
          email: "admin@robo-temps.com",
          password: "admin123",
          name: "OEM Admin",
        };

        // 🔐 3. MATCH PASSWORD
        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/application/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
