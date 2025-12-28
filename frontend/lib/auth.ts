import { jwtDecode } from "jwt-decode";

export type TokenPayload = {
  role: "ROLE_ADMIN" | "ROLE_USER";
  exp: number;
};

export function getDecodedToken() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
