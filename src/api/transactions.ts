import { useQuery } from "@tanstack/react-query";
import api from ".";

// Hook
export const useGetAllTransactionsQuery = () => {
  return useQuery<any>({
    queryKey: ["transactions", "all"],
    queryFn: async () => {
      const response = await api.get<any>("/transactions");

      return response.data;
    },
  });
};

export const useGetStripeTransactionsQuery = () => {
  return useQuery<any>({
    queryKey: ["transactions", "stripe"],
    queryFn: async () => {
      const response = await api.get<any>("/transactions/stripe");
      return response.data;
    },
  });
};

export const useGetAuthorizeTransactionsQuery = () => {
  return useQuery<any>({
    queryKey: ["transactions", "authorize"],
    queryFn: async () => {
      const response = await api.get<any>("/transactions/authorize");
      return response.data;
    },
  });
};

export const useGetBrainTreeTransactionsQuery = () => {
  return useQuery<any>({
    queryKey: ["transactions", "braintree"],
    queryFn: async () => {
      const response = await api.get<any>("/transactions/braintree");
      return response.data;
    },
  });
};