import { coffee } from '../../../data/products';
import ProductsWrapper from './ProductsWrapper';

function ProductsMenu() {
  return (
    <div className="p-4 w-full h-full flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Выбор напитка</h1>
      <ProductsWrapper products={coffee}></ProductsWrapper>
    </div>
  );
}

export default ProductsMenu;
