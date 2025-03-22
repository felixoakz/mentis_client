import apiClient from "./base";


export const listTransactions = async (accountId, currentDate) => {
  const year = currentDate.year.toString()
  const month = currentDate.monthInt.toString()

  return await apiClient.get(`/transactions/${accountId}?year=${year}&month=${month}`)
}

export const createTransaction = async (transactionData) => {
  return await apiClient.post(`/transactions`, transactionData)
}

export const editTransaction = async (transactionId, transactionData) => {
  return await apiClient.put(`/transactions/${transactionId}`, transactionData)
}

export const deleteTransaction = async (transactionId) => {
  return await apiClient.delete(`/transactions/${transactionId}`)
}
