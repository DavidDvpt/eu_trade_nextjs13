import { MissingParamsError } from '@/lib/axios/axiosUtils';
import client from '../../../../prisma/prismadb';

export const getUserByEmail = async (email: string | null) => {
  try {
    if (email) {
      const user = await client.user.findUnique({
        where: { email: email ?? '' },
      });

      return user;
    } else {
      Promise.reject(MissingParamsError());
    }
  } catch (error) {
    Promise.reject(error);
  }
};
