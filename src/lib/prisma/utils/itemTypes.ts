import { MissingParamsError } from '@/lib/axios/axiosUtils';
import client from '../../../../prisma/prismadb';

interface FetchItemTypesProps {
  itemCategoryId?: string;
}
export async function dbGetItemTypes({ itemCategoryId }: FetchItemTypesProps) {
  try {
    if (itemCategoryId) {
      const result = client.itemType.findMany({
        where: { itemCategoryId: itemCategoryId },
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
