export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const coffee: Product[] = [
  {
    id: 1,
    name: 'Эспрессо',
    price: 79,
    image: './src/assets/coffee/espresso.png',
  },
  {
    id: 2,
    name: 'Латте',
    price: 129,
    image: './src/assets/coffee/latte.png',
  },
  {
    id: 3,
    name: 'Капучино',
    price: 129,
    image: './src/assets/coffee/cappuccino.png',
  },
  {
    id: 4,
    name: 'Американо',
    price: 119,
    image: './src/assets/coffee/americano.png',
  },
  {
    id: 5,
    name: 'Доппио',
    price: 109,
    image: './src/assets/coffee/double-espresso.png',
  },
  {
    id: 6,
    name: 'Макиато',
    price: 129,
    image: './src/assets/coffee/macchiato.png',
  },
];
