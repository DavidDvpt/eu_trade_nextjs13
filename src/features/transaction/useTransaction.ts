import {
  TransactionExtended,
  TransactionsExtended,
} from '@/app/extendedAppTypes';
import { ContextType, SellStatus } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  fetchTransactionsRequest,
  postTransactionRequest,
  updateTransactionRequest,
} from './transactionRequests';

interface IUseTransactions extends IFetchTransactionsParams {
  all?: boolean;
}
const useTransactions = (props: IUseTransactions) => {
  const [transactions, setTransactions] = useState<TransactionsExtended | null>(
    null
  );
  const { resourceId, all } = props;
  const fetch = (params: IFetchTransactionsParams) => {
    fetchTransactionsRequest(params)
      .then(
        (response) => {
          setTransactions(response);
        },
        (error) => {
          setTransactions([]);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (resourceId || all) {
      fetch(props);
    }
  }, [resourceId, all]);

  const fetchLastTransaction = async (resourceId: string) => {
    fetch({
      resourceId,
      limit: 1,
      sortKey: 'createdAt',
      order: 'desc',
      context: ContextType.TRADE,
      sellStatus: SellStatus.ENDED,
    });
  };
  const updateTransaction = async (transaction: TransactionExtended) => {
    updateTransactionRequest(transaction).then((response) => {
      if (transactions) {
        setTransactions(
          transactions?.map((f) => (f.id !== response.id ? f : response))
        );
      }
    });
  };

  const createTransaction = async (body: PostTransactionBody) => {
    postTransactionRequest(body).then(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return {
    transactions: transactions,
    transactionsCount: transactions?.length ?? 0,
    lastSoldTransaction: fetchLastTransaction,
    createTransaction,
    updateTransaction,
  };
};

export default useTransactions;
