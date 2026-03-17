import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import api from ".";

export interface Permission {
  model: string;
  actions: string[];
  modelUpdateFields?: string[];
}

// ----------------- Queries -----------------

export const useGetAllRolesQuery = (): any => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/roles");
        console.log("data", data); 
        return data.roles || data; 
      } catch (error) {
        console.error("Error fetching roles:", error);
        throw error; 
      }
    },
  });
};

export interface Model {
  name: string;
  actions: { method: string; title: string }[];
  modelUpdateFields: string[];
  [key: string]: any;
}

export const useGetAllModelsQuery = (): UseQueryResult<Model[], unknown> => {
  return useQuery<Model[]>({
    queryKey: ["roles", "models"],
    queryFn: async () => {
      const { data } = await api.get<Model[]>("roles/models");
      return data;
    },
  });
};

// ----------------- Mutations -----------------

export const useCreateRoleMutation = (): UseMutationResult<any, any, Role> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Role) => api.post("/roles", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("role successfully created"),
        type: "success",
      });
    },
    onError: (error: any) => {
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(
          error.response?.data?.message || "error creating role",
        ),
        type: "error",
      });
    },
  });
};

export interface UpdateRolePayload {
  roleId: string;
  payload: Partial<Role>;
}

export const useUpdateRoleMutation = (): UseMutationResult<
  any,
  any,
  UpdateRolePayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, payload }: UpdateRolePayload) =>
      api.patch(`roles/${roleId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("role successfully updated"),
        type: "success",
      });
    },
    onError: (error: any) => {
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(
          error.response?.data?.message || "error updating role",
        ),
        type: "error",
      });
    },
  });
};

export const useDeleteRoleMutation = (): UseMutationResult<
  any,
  any,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: string) => api.delete(`roles/${roleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("role successfully deleted"),
        type: "success",
      });
    },
    onError: (error: any) => {
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(
          error.response?.data?.message || "error deleting role",
        ),
        type: "error",
      });
    },
  });
};
