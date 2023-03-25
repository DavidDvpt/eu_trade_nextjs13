import client from '../prismadb';

export const getResourceTypes = async () => {
  try {
    const resourceTypes = await client.resourceType.findMany();

    return resourceTypes;
  } catch (error) {
    Promise.reject(error);
  }
};
