import { toast } from "react-toastify";

// Handles API response errors and displays toast notifications.
export const responseErrors = async (error, logout = null) => {
  if (error.message === 'Network Error') {
    toast.error('No server connection.');
  }

  if (error.response) {
    const errorMsg = `${error.response.data.message ?? error.response.data.error}`

    if (error.response.status === 401) await logout()

    toast.warn(errorMsg)
  }
};

// Displays form validation errors as toast notifications.
export const displayValidationErrors = (errors) => {
  Object.values(errors).forEach(error => {
    toast.error(error.message);
  });
};

// Removes special characters from a string, normalizing it.
export const removeSpecialCharacters = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

export const formatCurrencyUsd = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
};
