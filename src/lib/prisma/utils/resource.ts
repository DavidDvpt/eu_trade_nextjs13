import client from '../../../../prisma/prismadb';

export const getResources = async () => {
  try {
    const resourceTypes = await client.resource.findMany();

    return resourceTypes;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getResourcesByTypeId = async (typeId: string) => {
  try {
    const resources = await client.resource.findMany({
      where: {
        resourceTypeId: typeId,
      },
    });

    return resources;
  } catch (error) {
    Promise.reject(error);
  }
};
