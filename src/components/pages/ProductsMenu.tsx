import { useDispatch } from 'react-redux';
import { selectProduct } from '../../store/appSlice';
import products from '../../data/products';

function ProductsMenu() {
  const dispatch = useDispatch();

  const handleSelectProduct = (productId: number) => {
    dispatch(selectProduct(productId));
  };

  return (
    <div className="p-4 h-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Выбор напитка:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border-slate-700 border overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleSelectProduct(product.id)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
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
        ))}
      </div>
    </div>
  );
}

export default ProductsMenu;
