import client from '../../../../prisma/prismadb';

interface FetchItemsProps {
  itemTypeId?: string;
}

export async function dbGetItems({ itemTypeId }: FetchItemsProps) {
  try {
    const result = client.item.findMany({
      where: { itemTypeId },
      orderBy: [{ name: 'asc' }],
    });

    return result;
  } catch (error) {
    Promise.reject(error);
  }
}
