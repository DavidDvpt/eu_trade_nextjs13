import { MissingParamsError } from '@/lib/axios/axiosUtils';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { Resource } from '@prisma/client';

export async function fetchResources(params: { resourceTypeId?: string }) {
  try {
    if (params?.resourceTypeId) {
      const response = await fetchDatas<Resource>(
        `/api/resourceType/${params?.resourceTypeId}/resources`
      );

      return response;
    } else {
      return Promise.reject(MissingParamsError());
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
