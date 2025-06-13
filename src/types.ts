export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  region: "India" | "America";
}

export interface Restaurant {
  _id: string;
  name: string;
  region: "India" | "America";
}

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  restaurantId: string;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  status: "created" | "placed" | "cancelled";
  paymentMethod: string;
  region: "India" | "America";
}
