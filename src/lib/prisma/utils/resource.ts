import client from '../../../../prisma/prismadb';

export const getResources = async () => {
  try {
    const resources = await client.item.findMany();

    return resources;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getResourcesByTypeId = async (typeId: string) => {
  try {
    const resources = await client.item.findMany({
      where: {
        itemTypeId: typeId,
      },
      orderBy: [{ name: 'asc' }],
    });

    return resources;
  } catch (error) {
    Promise.reject(error);
  }
};
