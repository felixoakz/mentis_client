import apiClient from "./base";


export const listTransactions = async (accountId) => {
  return await apiClient.get(`/mentis/transactions/${accountId}`)
}

export const createTransaction = async (transactionData) => {
  return await apiClient.post(`/mentis/transactions`, transactionData)
}

export const editTransaction = async (transactionId, transactionData) => {
  return await apiClient.put(`/mentis/transactions/${transactionId}`, transactionData)
}

export const deleteTransaction = async (transactionId) => {
  return await apiClient.delete(`/mentis/transactions/${transactionId}`)
}
