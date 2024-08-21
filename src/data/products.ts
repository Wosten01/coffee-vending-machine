export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  time: number;
};

export const coffee: Product[] = [
  {
    id: crypto.randomUUID(),
    name: 'Эспрессо',
    price: 79,
    image: '/src/assets/coffee/espresso.png',
    // time: 30,
    time: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Латте',
    price: 129,
    image: '/src/assets/coffee/latte.png',
    time: 60,
  },
  {
    id: crypto.randomUUID(),
    name: 'Капучино',
    price: 129,
    image: '/src/assets/coffee/cappuccino.png',
    time: 60,
  },
  {
    id: crypto.randomUUID(),
    name: 'Американо',
    price: 119,
    image: '/src/assets/coffee/americano.png',
    time: 40,
  },
  {
    id: crypto.randomUUID(),
    name: 'Доппио',
    price: 109,
    image: '/src/assets/coffee/double-espresso.png',
    time: 40,
  },
  {
    id: crypto.randomUUID(),
    name: 'Макиато',
    price: 129,
    image: '/src/assets/coffee/macchiato.png',
    time: 60,
  },
  {
    id: crypto.randomUUID(),
    name: 'Флэт Уайт',
    price: 129,
    image: '/src/assets/coffee/flat-white.png',
    time: 75,
  },
];
