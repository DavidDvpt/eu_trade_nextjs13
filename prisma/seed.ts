import encodeFnc from '@/lib/auth/encodeFnc';
import prismadb from '../src/lib/prisma/prismadb';

console.log(encodeFnc('david'));
const users = [
  { email: 'david.mosca69@gmail.com', password: encodeFnc('david') },
];

function createAdmin() {
  prismadb.user.createMany({ data: users });
}

createAdmin();
