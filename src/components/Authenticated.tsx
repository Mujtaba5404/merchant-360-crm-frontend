// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import * as jwtDecodeModule from "jwt-decode"; // ✅ import all

// // Type for JWT payload
// interface JwtPayload {
//   exp?: number;
//   [key: string]: any;
// }

// // Cast CommonJS module to function
// const jwtDecode = jwtDecodeModule as unknown as <T>(token: string) => T;

// // Simple token check function
// const isTokenExpired = (token?: string): boolean => {
//   if (!token) return true;

//   try {
//     const decodedToken = jwtDecode<JwtPayload>(token);
//     if (!decodedToken?.exp) return true;
//     return decodedToken.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// };

// // Props for static token (optional)
// interface AuthenticatedProps {
//   token?: string;
// }

// const Authenticated: React.FC<AuthenticatedProps> = ({ token }) => {
//   if (isTokenExpired(token)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default Authenticated;

import { Navigate, Outlet } from "react-router-dom";

const Authenticated = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return <Navigate to="/login" />;

  return <Outlet />;
};

export default Authenticated;
