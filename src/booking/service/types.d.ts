interface CreateBooking {
  product_id: number;
  price: number;
  quantity: number;
}

interface BookingUpdate {
  id: number;
  name: string;
  quantity?: number;
  price?: number;
  status: boolean;
}

export { BookingUpdate, CreateBooking };
