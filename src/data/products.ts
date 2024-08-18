export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const coffee: Product[] = [
  {
    id: crypto.randomUUID(),
    name: 'Эспрессо',
    price: 79,
    image: './src/assets/coffee/espresso.png',
  },
  {
    id: crypto.randomUUID(),
    name: 'Латте',
    price: 129,
    image: './src/assets/coffee/latte.png',
  },
  {
    id: crypto.randomUUID(),
    name: 'Капучино',
    price: 129,
    image: './src/assets/coffee/cappuccino.png',
  },
  {
    id: crypto.randomUUID(),
    name: 'Американо',
    price: 119,
    image: './src/assets/coffee/americano.png',
  },
  {
    id: crypto.randomUUID(),
    name: 'Доппио',
    price: 109,
    image: './src/assets/coffee/double-espresso.png',
  },
  {
    id: crypto.randomUUID(),
    name: 'Макиато',
    price: 129,
    image: './src/assets/coffee/macchiato.png',
  },
  {
    id: crypto.randomUUID(),
    name: 'Флэт Уайт',
    price: 129,
    image: './src/assets/coffee/macchiato.png',
  },
];
