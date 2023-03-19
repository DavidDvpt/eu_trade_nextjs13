import { ResourceType } from '@prisma/client';
import encodeFnc from '../src/lib/auth/encodeFnc';
import prismadb from '../src/lib/prisma/prismadb';

import { oresDatas, oresRefinedDatas, resourceTypeDatas } from './datasForSeed';

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

let resourcesTypes: ResourceType[] = [];
async function createResourceTypes() {
  await prismadb.resourceType.createMany({ data: resourceTypeDatas });

  resourcesTypes = await prismadb.resourceType.findMany();
  console.log('types', resourcesTypes.length);
}

createResourceTypes().then((response) => {
  //Ores
  async function createOres() {
    const type = resourcesTypes.find((f) => f.name === 'Ore') as ResourceType;
    const count = await prismadb.resource.createMany({
      data: oresDatas.map((e) => ({ ...e, resourceTypeId: type.id })),
    });
    console.log('ores', count);
  }
  createOres();

  // Refined Ores
  async function createRefinedOres() {
    const type = resourcesTypes.find(
      (f) => f.name === 'Refined Ore'
    ) as ResourceType;
    const count = await prismadb.resource.createMany({
      data: oresRefinedDatas.map((e) => ({ ...e, resourceTypeId: type.id })),
    });
    console.log('ores', count);
  }
  createRefinedOres();
});

// function createEnmatters() {
//   return prismadb.resource.createMany({
//     data: enmatterDatas.map((e) => ({ ...e, resourceTypeId: 1 })),
//   });
// }

// function createRefindedEnmatters() {
//   return prismadb.resource.createMany({
//     data: enmatterRefinedDatas.map((e) => ({ ...e, resourceTypeId: 2 })),
//   });
// }

// function createBuyTransaction() {
//   return prismadb.transaction.createMany({ data: buyTransactions });
// }

// function createSellTransaction() {
//   return prismadb.transaction.createMany({
//     data: sellTransactions,
//   });
// }

// function createResources() {
//   return new Promise((resolve, reject) => {
//     return createResourceType().then(
//       (response) => {
//         console.log('resourceTypes are added');
//         return Promise.all([
//           createOres(),
//           createEnmatters(),
//           createRefindedEnmatters(),
//           createRefinedOres(),
//         ]).then(
//           (response) => {
//             console.log('resources are added');
//             return resolve(true);
//           },
//           (err) => {
//             console.log(err);
//             reject(err);
//           }
//         );
//       },
//       (err) => {
//         console.log(err);
//         reject(err);
//       }
//     );
//   });
// }

// createResources().then((response) => {
//   Promise.all([createBuyTransaction(), createSellTransaction()]).then(
//     (response) => {
//       console.log('transactions added', response);
//     }
//   );
// });

// export {};
