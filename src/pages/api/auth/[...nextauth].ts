import { getUserByEmail } from '@/lib/prisma/utils/users';

import bcrypt from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      type: 'credentials',
      name: 'my-project',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await getUserByEmail(credentials?.email ?? null);

        if (
          user &&
          bcrypt.compareSync(credentials?.password ?? '', user.password)
        ) {
          return {
            id: user.id,
            name: user.firstname,
            email: user.email,
            address: 'blable',
          };
        } else {
          if (credentials?.email !== user?.email) {
            throw new Error('bad email');
          }

          if (
            bcrypt.compareSync(
              credentials?.password ?? '',
              user?.password ?? ''
            )
          ) {
            throw new Error('bad password');
          }

          throw new Error('bad credentials');
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 6 * 60 * 60, // 12 hours

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 6,
    // You can define your own encode/decode functions for signing and encryption
    // async encode({}) {},
    // async decode() {},
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      // session.refreshToken = token.refreshToken;
      // session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
});
