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
  status: 'free' | 'occupied' | 'reserved';
  zone: string;
  orderId?: string;
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
  { id: 'salads', name: 'Салати', nameEn: 'Salads', icon: '🥗' },
  { id: 'soups', name: 'Супи', nameEn: 'Soups', icon: '🍲' },
  { id: 'main', name: 'Основні страви', nameEn: 'Main Courses', icon: '🥩' },
  { id: 'pizza', name: 'Піца', nameEn: 'Pizza', icon: '🍕' },
  { id: 'drinks', name: 'Напої', nameEn: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Десерти', nameEn: 'Desserts', icon: '🍰' },
];

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Цезар з куркою', nameEn: 'Chicken Caesar', description: 'Салат Романо, куряче філе, пармезан, соус Цезар', price: 245, category: 'salads', available: true },
  { id: '2', name: 'Грецький салат', nameEn: 'Greek Salad', description: 'Помідори, огірки, оливки, фета, оливкова олія', price: 195, category: 'salads', available: true },
  { id: '3', name: 'Борщ український', nameEn: 'Ukrainian Borscht', description: 'Традиційний борщ з пампушками та часником', price: 165, category: 'soups', available: true },
  { id: '4', name: 'Крем-суп грибний', nameEn: 'Mushroom Cream Soup', description: 'Ніжний крем-суп з білих грибів', price: 155, category: 'soups', available: true },
  { id: '5', name: 'Стейк Рібай', nameEn: 'Ribeye Steak', description: 'Стейк з мармурової яловичини, 300г', price: 685, category: 'main', available: true },
  { id: '6', name: 'Лосось на грилі', nameEn: 'Grilled Salmon', description: 'Філе лосося з овочами гриль', price: 445, category: 'main', available: true },
  { id: '7', name: 'Курка по-київськи', nameEn: 'Chicken Kyiv', description: 'Класична котлета по-київськи з маслом', price: 295, category: 'main', available: true },
  { id: '8', name: 'Маргарита', nameEn: 'Margherita', description: 'Томатний соус, моцарела, базилік', price: 225, category: 'pizza', available: true },
  { id: '9', name: 'Пепероні', nameEn: 'Pepperoni', description: 'Томатний соус, моцарела, пепероні', price: 265, category: 'pizza', available: true },
  { id: '10', name: 'Лимонад домашній', nameEn: 'Homemade Lemonade', description: 'Лимон, м\'ята, цукор, газована вода', price: 95, category: 'drinks', available: true },
  { id: '11', name: 'Капучино', nameEn: 'Cappuccino', description: 'Еспресо з молочною пінкою', price: 85, category: 'drinks', available: true },
  { id: '12', name: 'Чізкейк Нью-Йорк', nameEn: 'NY Cheesecake', description: 'Класичний чізкейк з ягідним соусом', price: 175, category: 'desserts', available: true },
  { id: '13', name: 'Тірамісу', nameEn: 'Tiramisu', description: 'Італійський десерт з маскарпоне та кавою', price: 185, category: 'desserts', available: true },
];

export const tables: TableInfo[] = [
  { id: 't1', number: 1, seats: 2, status: 'free', zone: 'Зал' },
  { id: 't2', number: 2, seats: 2, status: 'occupied', zone: 'Зал', orderId: 'o1' },
  { id: 't3', number: 3, seats: 4, status: 'free', zone: 'Зал' },
  { id: 't4', number: 4, seats: 4, status: 'reserved', zone: 'Зал' },
  { id: 't5', number: 5, seats: 6, status: 'occupied', zone: 'Зал', orderId: 'o2' },
  { id: 't6', number: 6, seats: 2, status: 'free', zone: 'Тераса' },
  { id: 't7', number: 7, seats: 4, status: 'free', zone: 'Тераса' },
  { id: 't8', number: 8, seats: 6, status: 'occupied', zone: 'Тераса', orderId: 'o3' },
  { id: 't9', number: 9, seats: 8, status: 'free', zone: 'VIP' },
  { id: 't10', number: 10, seats: 4, status: 'reserved', zone: 'VIP' },
];

export const orders: Order[] = [
  {
    id: 'o1', tableNumber: 2, status: 'in_progress', createdAt: new Date(Date.now() - 25 * 60000).toISOString(), total: 530,
    items: [
      { menuItem: menuItems[0], quantity: 1 },
      { menuItem: menuItems[4], quantity: 1 },
    ],
  },
  {
    id: 'o2', tableNumber: 5, status: 'new', createdAt: new Date(Date.now() - 5 * 60000).toISOString(), total: 775,
    items: [
      { menuItem: menuItems[2], quantity: 2 },
      { menuItem: menuItems[5], quantity: 1 },
    ],
  },
  {
    id: 'o3', tableNumber: 8, status: 'ready', createdAt: new Date(Date.now() - 40 * 60000).toISOString(), total: 650,
    items: [
      { menuItem: menuItems[7], quantity: 2 },
      { menuItem: menuItems[10], quantity: 3 },
    ],
  },
  {
    id: 'o4', tableNumber: 3, status: 'new', createdAt: new Date(Date.now() - 2 * 60000).toISOString(), total: 425,
    items: [
      { menuItem: menuItems[8], quantity: 1 },
      { menuItem: menuItems[12], quantity: 1 },
    ],
  },
];

export const roleLabels: Record<UserRole, { ua: string; en: string }> = {
  super_admin: { ua: 'Супер Адмін', en: 'Super Admin' },
  owner: { ua: 'Власник', en: 'Owner' },
  manager: { ua: 'Менеджер', en: 'Manager' },
  waiter: { ua: 'Офіціант', en: 'Waiter' },
  kitchen: { ua: 'Кухня', en: 'Kitchen' },
  cashier: { ua: 'Касир', en: 'Cashier' },
  customer: { ua: 'Гість', en: 'Customer' },
};

export const staffMembers = [
  { id: 's1', name: 'Олена Коваленко', role: 'manager' as UserRole, email: 'olena@boos.ua', active: true },
  { id: 's2', name: 'Андрій Шевченко', role: 'waiter' as UserRole, email: 'andriy@boos.ua', active: true },
  { id: 's3', name: 'Марія Бондаренко', role: 'waiter' as UserRole, email: 'maria@boos.ua', active: true },
  { id: 's4', name: 'Іван Петренко', role: 'kitchen' as UserRole, email: 'ivan@boos.ua', active: true },
  { id: 's5', name: 'Наталія Ткаченко', role: 'cashier' as UserRole, email: 'natalia@boos.ua', active: false },
];
