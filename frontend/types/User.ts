export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string | null;
  age?: number | null;
  roles: string[];
  createdAt: string; // ✅ ISO date from backend
};
