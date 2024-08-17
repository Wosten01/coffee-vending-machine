import { useDispatch } from 'react-redux';
import { selectProduct } from '../../../store/appSlice';
import { Product } from '../../../data/products';
import ProductCard from './ProductCard';

interface ProductsWrapperProps {
  products: Product[];
}

function ProductsWrapper({ products }: ProductsWrapperProps) {
  const dispatch = useDispatch();

  const handleSelectProduct = (productId: number) => {
    dispatch(selectProduct(productId));
  };

  return (
    <section className="overflow-auto">
      <main className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={handleSelectProduct}
          />
        ))}
      </main>
    </section>
  );
}

export default ProductsWrapper;
