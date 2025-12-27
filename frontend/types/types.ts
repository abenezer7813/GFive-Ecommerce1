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
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
};
