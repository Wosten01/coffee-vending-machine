import { useDispatch } from 'react-redux';
import { selectProduct } from '../../../store/appSlice';
import { Product } from '../../../data/products';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

interface ProductsWrapperProps {
  products: Product[];
}

function ProductsWrapper({ products }: ProductsWrapperProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectProduct = (product: Product) => {
    dispatch(selectProduct(product));
    navigate('/payment-selection');
  };

  return (
    <section className="overflow-auto">
      <main className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
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
