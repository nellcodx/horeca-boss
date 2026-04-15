export type UserRole = 'super_admin' | 'owner' | 'manager' | 'waiter' | 'kitchen' | 'cashier' | 'customer';

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export interface TableInfo {
  id: string;
  number: number;
  seats: number;
  status: 'free' | 'occupied' | 'reserved' | 'payment';
  zone: string;
  orderId?: string;
  waiter?: string;
  reservationTime?: string;
  reservationGuest?: string;
  x: number;
  y: number;
  shape: 'rect' | 'circle';
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: 'new' | 'in_progress' | 'ready' | 'served' | 'paid';
  createdAt: string;
  total: number;
}

export const menuCategories = [
  { id: 'salads', name: 'Salads', nameEn: 'Salads', icon: '🥗' },
  { id: 'soups', name: 'Soups', nameEn: 'Soups', icon: '🍲' },
  { id: 'main', name: 'Main Courses', nameEn: 'Main Courses', icon: '🥩' },
  { id: 'pizza', name: 'Pizza', nameEn: 'Pizza', icon: '🍕' },
  { id: 'drinks', name: 'Drinks', nameEn: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', nameEn: 'Desserts', icon: '🍰' },
];

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Chicken Caesar', nameEn: 'Chicken Caesar', description: 'Romaine lettuce, chicken breast, parmesan, Caesar dressing', price: 5.95, category: 'salads', available: true },
  { id: '2', name: 'Greek Salad', nameEn: 'Greek Salad', description: 'Tomatoes, cucumbers, olives, feta, olive oil', price: 4.75, category: 'salads', available: true },
  { id: '3', name: 'Ukrainian Borscht', nameEn: 'Ukrainian Borscht', description: 'Traditional borscht with garlic bread', price: 3.95, category: 'soups', available: true },
  { id: '4', name: 'Mushroom Cream Soup', nameEn: 'Mushroom Cream Soup', description: 'Delicate cream soup with porcini mushrooms', price: 3.75, category: 'soups', available: true },
  { id: '5', name: 'Ribeye Steak', nameEn: 'Ribeye Steak', description: 'Marble beef steak, 300g', price: 16.50, category: 'main', available: true },
  { id: '6', name: 'Grilled Salmon', nameEn: 'Grilled Salmon', description: 'Salmon fillet with grilled vegetables', price: 10.75, category: 'main', available: true },
  { id: '7', name: 'Chicken Kyiv', nameEn: 'Chicken Kyiv', description: 'Classic Chicken Kyiv cutlet with butter', price: 7.15, category: 'main', available: true },
  { id: '8', name: 'Margherita', nameEn: 'Margherita', description: 'Tomato sauce, mozzarella, basil', price: 5.45, category: 'pizza', available: true },
  { id: '9', name: 'Pepperoni', nameEn: 'Pepperoni', description: 'Tomato sauce, mozzarella, pepperoni', price: 6.40, category: 'pizza', available: true },
  { id: '10', name: 'Homemade Lemonade', nameEn: 'Homemade Lemonade', description: 'Lemon, mint, sugar, sparkling water', price: 2.30, category: 'drinks', available: true },
  { id: '11', name: 'Cappuccino', nameEn: 'Cappuccino', description: 'Espresso with milk foam', price: 2.05, category: 'drinks', available: true },
  { id: '12', name: 'NY Cheesecake', nameEn: 'NY Cheesecake', description: 'Classic cheesecake with berry sauce', price: 4.25, category: 'desserts', available: true },
  { id: '13', name: 'Tiramisu', nameEn: 'Tiramisu', description: 'Italian dessert with mascarpone and coffee', price: 4.50, category: 'desserts', available: true },
];

export const tables: TableInfo[] = [
  { id: 't1', number: 1, seats: 2, status: 'free', zone: 'Hall', x: 60, y: 60, shape: 'rect' },
  { id: 't2', number: 2, seats: 2, status: 'occupied', zone: 'Hall', orderId: 'o1', waiter: 'Andriy S.', x: 240, y: 60, shape: 'rect' },
  { id: 't3', number: 3, seats: 4, status: 'free', zone: 'Hall', x: 420, y: 60, shape: 'rect' },
  { id: 't4', number: 4, seats: 4, status: 'reserved', zone: 'Hall', reservationTime: '19:30', reservationGuest: 'Ivanov O.', x: 60, y: 220, shape: 'rect' },
  { id: 't5', number: 5, seats: 6, status: 'occupied', zone: 'Hall', orderId: 'o2', waiter: 'Maria B.', x: 240, y: 220, shape: 'circle' },
  { id: 't6', number: 6, seats: 2, status: 'free', zone: 'Terrace', x: 600, y: 60, shape: 'rect' },
  { id: 't7', number: 7, seats: 4, status: 'payment', zone: 'Terrace', waiter: 'Andriy S.', orderId: 'o3', x: 600, y: 220, shape: 'rect' },
  { id: 't8', number: 8, seats: 6, status: 'occupied', zone: 'Terrace', orderId: 'o3', waiter: 'Maria B.', x: 420, y: 220, shape: 'circle' },
  { id: 't9', number: 9, seats: 8, status: 'free', zone: 'VIP', x: 60, y: 400, shape: 'circle' },
  { id: 't10', number: 10, seats: 4, status: 'reserved', zone: 'VIP', reservationTime: '20:00', reservationGuest: 'Petrenko V.', x: 300, y: 400, shape: 'rect' },
];

export const orders: Order[] = [
  {
    id: 'o1', tableNumber: 2, status: 'in_progress', createdAt: new Date(Date.now() - 25 * 60000).toISOString(), total: 12.85,
    items: [
      { menuItem: menuItems[0], quantity: 1 },
      { menuItem: menuItems[4], quantity: 1 },
    ],
  },
  {
    id: 'o2', tableNumber: 5, status: 'new', createdAt: new Date(Date.now() - 5 * 60000).toISOString(), total: 18.65,
    items: [
      { menuItem: menuItems[2], quantity: 2 },
      { menuItem: menuItems[5], quantity: 1 },
    ],
  },
  {
    id: 'o3', tableNumber: 8, status: 'ready', createdAt: new Date(Date.now() - 40 * 60000).toISOString(), total: 17.05,
    items: [
      { menuItem: menuItems[7], quantity: 2 },
      { menuItem: menuItems[10], quantity: 3 },
    ],
  },
  {
    id: 'o4', tableNumber: 3, status: 'new', createdAt: new Date(Date.now() - 2 * 60000).toISOString(), total: 10.90,
    items: [
      { menuItem: menuItems[8], quantity: 1 },
      { menuItem: menuItems[12], quantity: 1 },
    ],
  },
];

export const roleLabels: Record<UserRole, { ua: string; en: string }> = {
  super_admin: { ua: 'Super Admin', en: 'Super Admin' },
  owner: { ua: 'Owner', en: 'Owner' },
  manager: { ua: 'Manager', en: 'Manager' },
  waiter: { ua: 'Waiter', en: 'Waiter' },
  kitchen: { ua: 'Kitchen', en: 'Kitchen' },
  cashier: { ua: 'Cashier', en: 'Cashier' },
  customer: { ua: 'Guest', en: 'Customer' },
};

export const staffMembers = [
  { id: 's1', name: 'Olena Kovalenko', role: 'manager' as UserRole, email: 'olena@boss.eu', active: true },
  { id: 's2', name: 'Andriy Shevchenko', role: 'waiter' as UserRole, email: 'andriy@boss.eu', active: true },
  { id: 's3', name: 'Maria Bondarenko', role: 'waiter' as UserRole, email: 'maria@boss.eu', active: true },
  { id: 's4', name: 'Ivan Petrenko', role: 'kitchen' as UserRole, email: 'ivan@boss.eu', active: true },
  { id: 's5', name: 'Natalia Tkachenko', role: 'cashier' as UserRole, email: 'natalia@boss.eu', active: false },
];
