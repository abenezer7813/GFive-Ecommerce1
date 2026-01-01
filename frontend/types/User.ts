export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  age?: number;
  roles: string[];
  createdAt?: string;
  enabled: boolean; // <-- Add this
};
