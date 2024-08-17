import { Product } from '../../../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: number) => void;
}

function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="bg-white rounded-xl border-slate-700 border overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 p-4"
      onClick={() => onSelect(product.id)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover p-2"
      />
      <div className="p-4">
        <h2 className="text-xl font-thin text-center">{product.name}</h2>
        <div className="flex justify-center items-center">
          <span className="text-5xl font-semibold text-center">
            {product.price.toFixed(0)}₽
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
