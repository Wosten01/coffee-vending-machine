import ProductsMenu from './components/pages/ProductsMenu';
import PaymentMenu from './components/pages/PaymentMenu';
import DrinkPreparation from './components/pages/DrinkPreparation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="p-10">
      <div className="fixed-screen border border-black rounded-xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsMenu />} />
            <Route path="/payment-selection" element={<PaymentMenu />} />
            <Route path="/drink-preparation" element={<DrinkPreparation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
