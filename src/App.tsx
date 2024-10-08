import ProductsMenu from './components/pages/ProductsMenu';
import PaymentMenu from './components/pages/PaymentMenu';
import DrinkPreparation from './components/pages/DrinkPreparation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CashPayment from './components/pages/PaymentMenu/CashPayment';
import CardPayment from './components/pages/PaymentMenu/CardPayment';

function App() {
  return (
    <div className="p-10">
      <div className="fixed-screen border border-black rounded-xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsMenu />} />
            <Route path="/payment-selection" element={<PaymentMenu />} />
            <Route path="/cash" element={<CashPayment />} />
            <Route path="/card" element={<CardPayment />} />
            <Route path="/drink-preparation" element={<DrinkPreparation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
