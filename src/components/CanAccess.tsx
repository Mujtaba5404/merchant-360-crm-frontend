import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useCanAccess from "../hooks/useCanAccess";

// Props interface
interface CanAccessProps {
  modelName?: string;
  action?: string;
  redirect?: boolean;
  redirectPath?: string;
  children: ReactNode;
}

const CanAccess: React.FC<CanAccessProps> = ({
  modelName = "",
  action = "",
  redirect = false,
  redirectPath = "",
  children,
}) => {
  const hasAccess = useCanAccess(modelName, action);

  if (hasAccess) {
    return <>{children}</>;
  }

  return redirect ? <Navigate to={redirectPath || -1} replace /> : null;
};

export default CanAccess;