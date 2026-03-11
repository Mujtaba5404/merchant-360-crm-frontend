import { useLocalStorage } from "@mantine/hooks";

// Types for permissions
interface Permission {
  model: string;
  actions: string[];
}

interface RoleAndPermissions {
  permissions?: Permission[];
}

interface Auth {
  roleAndPermissions?: RoleAndPermissions;
}

interface UseCanAccessOptions {
  mode?: "any" | "all";
}

// Helper function to normalize string values
const normalize = (value: unknown) => (typeof value === "string" ? value.toLowerCase() : value);

const useCanAccess = (
  model: string = "",
  actions: string | string[] = [],
  options: UseCanAccessOptions = { mode: "any" }
): boolean => {
  // Get auth from localStorage
  const [auth] = useLocalStorage<Auth | null>({
    key: "auth",
    getInitialValueInEffect: false,
  });

  // If no permissions, return false
  if (!auth?.roleAndPermissions?.permissions?.length) {
    return false;
  }

  const normalizedModel = normalize(model);

  // Normalize actions array
  const requiredActions = Array.isArray(actions)
    ? actions.map(normalize)
    : [normalize(actions)];

  // Find permission for the model
  const permission = auth.roleAndPermissions.permissions.find(
    (p) => p?.model?.toLowerCase() === normalizedModel
  );

  if (!permission?.actions?.length) {
    return false;
  }

  const permissionActions = permission.actions.map(normalize);

  // Check access
  const hasActionAccess =
    options.mode === "all"
      ? requiredActions.every((a) => permissionActions.includes(a))
      : requiredActions.some((a) => permissionActions.includes(a));

  return hasActionAccess;
};

export default useCanAccess;