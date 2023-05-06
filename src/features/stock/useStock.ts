import axios from 'axios';
import { useState } from 'react';

function useStock() {
  const [maxResourceQty, setmaxResourceQty] = useState<number>(0);
  const getMaxResourceQty = async (resourceId: string) => {
    try {
      const response = await axios.get<{ data: number }>(
        `/api/resource/${resourceId}/stock`
      );
      setmaxResourceQty(response.data.data ?? 0);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { getMaxResourceQty, maxResourceQty };
}

export default useStock;
