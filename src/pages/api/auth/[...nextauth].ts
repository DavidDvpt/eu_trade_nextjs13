import encodeFnc from '@/lib/auth/encodeFnc';
import prismadb from '@/lib/prisma/prismadb';
import bcrypt from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
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
        const user = await prismadb.user.findUnique({
          where: { email: credentials?.email ?? '' },
        });

        if (
          user &&
          user.password &&
          bcrypt.compareSync(credentials?.password ?? '', user.password)
        ) {
          return { id: user.id, name: user.firstname };
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
            throw new Error(
              'bad password  --  ' +
                credentials?.password +
                ' -- ' +
                encodeFnc(credentials?.password ?? '') +
                ' -- ' +
                user?.password
            );
          }
          throw new Error('bad credentials');
        }
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
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
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refreshToken,
        };
      }

      return token;
    },
  },

  //   async session({ session, token }) {
  //     session.accessToken = token.accessToken;
  //     session.refreshToken = token.refreshToken;
  //     session.accessTokenExpires = token.accessTokenExpires;

  //     return session;
  //   },
  // },
});
