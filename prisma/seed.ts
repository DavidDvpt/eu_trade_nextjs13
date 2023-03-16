import encodeFnc from '../src/lib/auth/encodeFnc';
import prismadb from '../src/lib/prisma/prismadb';

console.log(encodeFnc('david'));
const users = [{ email: 'appmail@gmail.com', password: encodeFnc('david') }];

async function createAdmin() {
  const userCount = await prismadb.user.count();
  console.log(userCount);
  if (userCount === 0) {
    const usersResult = await prismadb.user.createMany({ data: users });
    console.log(usersResult);
  }
}

createAdmin();

export {};
