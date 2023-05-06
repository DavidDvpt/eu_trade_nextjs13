import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { ResourceType } from '@prisma/client';

export async function fetchResourceTypes() {
  try {
    const response = await fetchDatas<ResourceType>('/api/resourceType');

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
