// declare module 'next-auth' {
//   interface User {
//     id: string;
//     firstname?: string;
//     lastname?: string;
//     pseudo?: string;
//     email: string;
//     createdAt: DateTime;
//     updatedAt?: DateTime;
//     isActive: boolean;
//     password: string;
//   }

//   interface Session extends DefaultSession {
//     user?: User;
//   }
// }

interface IChildren {
  children: import('react').ReactNode;
}
