type CreateInventory = {
  product_id: number;
  remaining: number;
  booked: number;
};

type UpdateInventory = {
  id: number;
  remaining: number;
  booked: number;
};

interface CheckInventory {
  product_id: number;
  name?: string;
  quantity?: string;
  message?: string;
}
interface InventoryItem {
  id: number;
  name: string;
  product_id: number;
  remaining: number;
  booked: number;
}

interface CheckInventoryArgs {
  productIdsArr: Array<number>;
  payload: Array<CheckInventoryArgs>;
}

interface CheckInventoryReturn {
  isError: boolean;
  statusCode: number;
  data: any[] | undefined;
  message: string;
}
export {
  CreateInventory,
  UpdateInventory,
  CheckInventory,
  InventoryItem,
  CheckInventoryArgs,
  CheckInventoryReturn,
};
