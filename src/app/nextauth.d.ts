import 'next-auth';

declare module 'next-auth' {
  interface User {
    address?: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}
