import { ResourceType } from '@prisma/client';
import encodeFnc from '../src/lib/auth/encodeFnc';
import client from '../src/lib/prisma/prismadb';

import {
  enmatterDatas,
  enmatterRefinedDatas,
  oresDatas,
  oresRefinedDatas,
  resourceTypeDatas,
} from './datasForSeed';

const users = [
  {
    email: 'appmail@gmail.com',
    password: encodeFnc('david'),
    firstname: 'David',
    lastname: 'MOSCA',
  },
  {
    email: 'test@test.com',
    password: encodeFnc('test'),
    firstname: 'test',
    lastname: 'test',
  },
];

async function createAdmin() {
  const userCount = await client.user.count();

  if (userCount === 0) {
    await client.user.createMany({ data: users });
  }
}

createAdmin();

let resourcesTypes: ResourceType[] = [];
async function createResourceTypes() {
  await client.resourceType.createMany({ data: resourceTypeDatas });

  resourcesTypes = await client.resourceType.findMany();
  console.log('types', resourcesTypes.length);
}

createResourceTypes().then((response) => {
  //Ores
  async function createOres() {
    const type = resourcesTypes.find((f) => f.name === 'Ore') as ResourceType;

    const count = await client.resource.createMany({
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
    const count = await client.resource.createMany({
      data: oresRefinedDatas.map((e) => ({ ...e, resourceTypeId: type.id })),
    });
    console.log('refined ores', count);
  }
  createRefinedOres();

  // enmatters
  async function createEnmatters() {
    const type = resourcesTypes.find(
      (f) => f.name === 'Enmatter'
    ) as ResourceType;
    const count = await client.resource.createMany({
      data: enmatterDatas.map((e) => ({ ...e, resourceTypeId: type.id })),
    });

    console.log('enmatters', count);
  }
  createEnmatters();

  // refined enmatters
  async function createRefinedEnmatters() {
    const type = resourcesTypes.find(
      (f) => f.name === 'Refined Enmatter'
    ) as ResourceType;
    const count = await client.resource.createMany({
      data: enmatterRefinedDatas.map((e) => ({
        ...e,
        resourceTypeId: type.id,
      })),
    });

    console.log('refined enmatters', count);
  }
  createRefinedEnmatters();
});

// function createBuyTransaction() {
//   return client.transaction.createMany({ data: buyTransactions });
// }

// function createSellTransaction() {
//   return client.transaction.createMany({
//     data: sellTransactions,
//   });
// }

// createResources().then((response) => {
//   Promise.all([createBuyTransaction(), createSellTransaction()]).then(
//     (response) => {
//       console.log('transactions added', response);
//     }
//   );
// });
