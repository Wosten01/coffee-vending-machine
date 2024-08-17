import { useSelector } from 'react-redux';
import { RootState } from './store';
import ProductsMenu from './components/pages/ProductsMenu';
import PaymentMenu from './components/pages/PaymentMenu';
import DrinkPreparation from './components/pages/DrinkPreparation';

function App() {
  const step = useSelector((state: RootState) => state.app.step);

  return (
    <div className="p-10">
      <div className="fixed-screen border border-black rounded-xl">
        {step === 1 && <ProductsMenu />}
        {step === 2 && <PaymentMenu />}
        {step === 3 && <DrinkPreparation />}
      </div>
    </div>
  );
}

export default App;
