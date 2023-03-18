import encodeFnc from '../src/lib/auth/encodeFnc';
import prismadb from '../src/lib/prisma/prismadb';

console.log(encodeFnc('david'));
const users = [
  {
    email: 'appmail@gmail.com',
    password: encodeFnc('david'),
    firstname: 'David',
    lastname: 'MOSCA',
  },
];

async function createAdmin() {
  const userCount = await prismadb.user.count();

  if (userCount === 0) {
    await prismadb.user.createMany({ data: users });
  }
}

createAdmin();

export {};
