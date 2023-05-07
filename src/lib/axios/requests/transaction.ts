// export async function fetchTransactionsProfit() {
//   try {
//     const response = await fetchSingleData<TransactionBenefitResult>(
//       '/api/transaction/profit'
//     );

//     return response;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
// export async function fetchStock() {
//   try {
//     const stocks = await fetchDatas<SimpleStock>(`/api/transaction/stock`);

//     return stocks;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

export {};
