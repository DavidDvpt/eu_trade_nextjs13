import { Resource } from '@prisma/client';
import { fetchDatas } from './genericRequests';

export async function fetchResourcesByTypeId(id: string) {
  try {
    if (id) {
      const response = await fetchDatas(`/api/resourceType/${id}/resources`);

      return response as Resource[];
    } else {
      return [] as Resource[];
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
