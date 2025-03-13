import apiClient from "./base";


export const loginApi = async (loginData) => {
  return await apiClient.post('/auth/login', loginData);
};

export const registerApi = async (data) => {
  return await apiClient.post('/auth/register', data);
};
