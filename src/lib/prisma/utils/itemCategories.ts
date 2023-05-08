import client from '../../../../prisma/prismadb';

export async function dbGetItemCategories() {
  try {
    const result = client.itemCategory.findMany({ orderBy: [{ name: 'asc' }] });

    return result;
  } catch (error) {
    Promise.reject(error);
  }
}
