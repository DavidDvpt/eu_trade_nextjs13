import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { SessionContext, SessionState, TradingType } from '@prisma/client';
import { Session } from 'inspector';

interface FetchSessionProps {
  context?: SessionContext;
  tradingType?: TradingType;
  sessionState?: SessionState;
  limit?: number;
  sortKey?: any;
  order?: any;
}
export async function fetchSessions({
  context,
  tradingType,
  sessionState,
  limit,
  sortKey,
  order,
}: FetchSessionProps) {
  try {
    const result = await fetchDatas<Session>('/api/sessions', {
      params: { context, tradingType, sessionState, limit, sortKey, order },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
// export async function fetchLastSoldRow({
//   context,
//   tradingType,
//   sessionState,
//   limit,
// }: FetchSessionProps) {
//   try {
//     const result = await fetchDatas<SessionRow>('/api/sessions', {
//       params: { context, type, limit: 1 },
//     });
//   } catch (error) {}
// }
