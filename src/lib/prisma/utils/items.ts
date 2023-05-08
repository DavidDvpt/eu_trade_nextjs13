import { MissingParamsError } from '@/lib/axios/axiosUtils';
import client from '../../../../prisma/prismadb';

interface FetchItemsProps {
  itemTypeId?: string;
}

export async function dbGetItems({ itemTypeId }: FetchItemsProps) {
  try {
    if (itemTypeId) {
      const result = client.item.findMany({
        where: { itemTypeId },
        orderBy: [{ name: 'asc' }],
      });

      return result;
    } else {
      Promise.reject(MissingParamsError());
    }
  } catch (error) {
    Promise.reject(error);
  }
}
