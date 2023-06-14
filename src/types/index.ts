export interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  createDate: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  specification: string;
  price: number;
  createDate: string;
  lastModifiedDate: string;
  picture: string;
  shopInfo: User;
  stock: number;
  detail: string;
}

export interface Order {
  id: number;
  product: Product;
  user: User;
  orderStatus: string;
  createDate: string;
}
