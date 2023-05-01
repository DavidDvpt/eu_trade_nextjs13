import { ResourceType } from '@prisma/client';
import encodeFnc from './encodeFnc';
import client from './prismadb';

import {
  enmatterDatas,
  enmatterRefinedDatas,
  oresDatas,
  oresRefinedDatas,
  resourceTypeDatas,
} from './datasForSeed';

async function createAdmin() {
  const userCount = await client.user.count();

  const users = [
    {
      email: 'appmail@gmail.com',
      password: encodeFnc('david'),
      firstname: 'admin',
      lastname: 'site',
    },
    {
      email: 'david.mosca69@gmail.com',
      password: encodeFnc('Gauloise42'),
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

  if (userCount === 0) {
    await client.user.createMany({ data: users });
  } else {
    console.log('no users added');
  }
}

createAdmin();

let resourcesTypes: ResourceType[] = [];

async function createResourceTypes() {
  const rtCount = await client.resourceType.count();

  if (rtCount === 0) {
    await client.resourceType.createMany({ data: resourceTypeDatas });
    resourcesTypes = await client.resourceType.findMany();
    console.log('types', resourcesTypes.length);
  } else {
    console.log('no resourceType addedd');
  }
}

createResourceTypes().then(async (response) => {
  const rCount = await client.resource.count();

  //Ores
  async function createOres() {
    const type = resourcesTypes.find((f) => f.name === 'Ore') as ResourceType;

    const count = await client.resource.createMany({
      data: oresDatas.map((e) => ({ ...e, resourceTypeId: type.id })),
    });
    console.log('ores', count);
  }
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

  if (rCount === 0) {
    createOres();
    createRefinedOres();
    createEnmatters();
    createRefinedEnmatters();
  } else {
    console.log('no resource added');
  }
});
