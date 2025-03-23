import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import api from 'services/api';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      score: number;
      bio: string;
      image: string;
      groupId: string;
    };
  }

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
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      score: number;
      bio: string;
      image: string;
      groupId: string;
    };
  }
}

interface UserRes {
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
    loggedUser: UserRes;
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
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          score: user.score,
          bio: user.bio,
          image: user.image,
          groupId: user.groupId
        };
      }
      return token;
    },

    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = {
        id: token.user.id,
        name: token.user.name,
        username: token.user.username,
        email: token.user.email,
        score: token.user.score,
        bio: token.user.bio,
        image: token.user.image,
        groupId: token.user.groupId
      };
      return session;
    }
  }
};
