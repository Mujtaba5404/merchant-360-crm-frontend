import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from ".";

export const useCreatePaymentLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      merchant: string;
      amount: number;
      currency: string;
      description: string;
      email: string;
      name: string;
    }) => {
      const response = await api.post("/paymentLinks", payload);
      console.log("Response from Create Payment Link API", response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/paymentLinks"] });
    },
  });
};