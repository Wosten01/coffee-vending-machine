type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Эспрессо',
    price: 79,
    imageUrl: 'https://via.placeholder.com/150x100?text=Espresso',
  },
  {
    id: 2,
    name: 'Латте',
    price: 129,
    imageUrl: 'https://via.placeholder.com/150x100?text=Latte',
  },
  {
    id: 3,
    name: 'Капучино',
    price: 129,
    imageUrl: 'https://via.placeholder.com/150x100?text=Cappuccino',
  },
];

export default products;
