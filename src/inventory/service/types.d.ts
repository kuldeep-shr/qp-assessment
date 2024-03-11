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
export { CreateInventory, UpdateInventory };
