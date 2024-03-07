interface ProductAdd {
  name: string;
  quantity: number;
  price: number;
  status: boolean;
}

interface ProductUpdate {
  id: number;
  name: string;
  quantity?: number;
  price?: number;
  status: boolean;
}
export { ProductAdd, ProductUpdate };
