// types/cart.ts
export type CartItem = {
  id: number;
  title: string;     // matches dummyjson
  price: number;
  thumbnail: string;
  quantity: number;
};
// app/product/types.ts
export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Product = {
  createdAt: string | number | Date;
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  stockQuantity: number; // <-- add this
};

export type ProductWithDate = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  stockQuantity: number; // <-- add this
  createdAt: string;
};


export type AddProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number
  categoryId: number;
  imageUrl: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number | null;
  gender: string | null;
  roles: string[];
};

export type OrderSummary = {
  id: number;
  userName: string;
  totalPrice: number;
  status: string;
  createdAt?: string;
};
