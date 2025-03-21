import apiClient from "./base";


export const listAccounts = async () => {
  return await apiClient.get('/accounts')
}

export const createAccount = async (accountName) => {
  console.log(accountName)
  return await apiClient.post('/accounts', accountName)
}

export const editAccount = async (accountId, accountName) => {
  return await apiClient.put(`/accounts/${accountId}`, accountName)
}

export const deleteAccount = async (accountId) => {
  return await apiClient.delete(`/accounts/${accountId}`)
}
