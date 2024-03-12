type CreateBooking = {
  product_id: number;
  user_id: number;
  price: number;
  quantity?: number;
};

interface BookingUpdate {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export { BookingUpdate, CreateBooking };
