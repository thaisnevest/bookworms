import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import api from 'services/api';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  score: number;
  bio: string;
  image: string;
  groupId: string;
}

interface ApiResponse {
  data: {
    loggedUser: User;
    message: string;
  };
  status: number;
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailORusername: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        try {
          const response = await api.post<ApiResponse>('/sessions', {
            emailORusername: credentials?.emailORusername,
            password: credentials?.password
          });

          const user = response.data.data.loggedUser;
          console.log(user);
          if (user) {
            return user;
          }
        } catch (error) {
          throw new Error('Credenciais inválidas');
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.user as any;
      return session;
    }
  }
};
