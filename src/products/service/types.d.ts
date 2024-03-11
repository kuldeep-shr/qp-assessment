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

interface ProductList {
  id: number;
  is_admin: boolean;
}
export { ProductAdd, ProductUpdate, ProductList };
