import coffee from '../../../data/products';
import ProductsWrapper from './ProductsWrapper';

function ProductsMenu() {
  return (
    <div className="p-5 w-full h-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Выбор напитка</h1>
      <ProductsWrapper products={coffee}></ProductsWrapper>
    </div>
  );
}

export default ProductsMenu;
