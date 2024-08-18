import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from '../../store/appSlice';
import { RootState } from '../../store';
import emulator from '../../core/emulator';
import { coffee as products } from '../../data/products';
import { useNavigate } from 'react-router-dom';

function PaymentMenu() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state: RootState) => state.app.selectedProduct
  );
  const [paymentMessage, setPaymentMessage] = useState('');
  const navigate = useNavigate();

  function handlePaymentMethod(method: string) {
    dispatch(setPaymentMethod(method));

    if (method === 'cash') {
      emulator.StartCashin((amount) => {
        setPaymentMessage(`Принято ${amount} рублей`);
      });
      navigate('/drink-preparation');
    } else if (method === 'card') {
      emulator.BankCardPurchase(
        products[selectedProduct!].price,
        (result) => {
          if (result) setPaymentMessage('Транзакция успешна');
        },
        setPaymentMessage
      );
      navigate('/drink-preparation');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <section className="flex flex-col items-center text-center gap-6">
        <p className="text-5xl font-thin tracking-wider">Ваш напиток</p>
        <img
          src={products[selectedProduct!].image}
          alt={products[selectedProduct!].name}
          className="w-96 h-96"
        />
        <h1 className="text-6xl font-thin tracking-wider ">
          {products[selectedProduct!].name}
        </h1>
      </section>
      <section>
        <div className="flex flex-col text-yellow-600 text-opacity-65 justify-center items-center ">
          <p className="text-4xl font-light">Итого:</p>
          <p className="text-9xl  font-bold ">
            {products[selectedProduct!].price}₽
          </p>
        </div>
      </section>

      <section className="">
        <h2 className="text-4xl font-thin text-gray-800 mb-8 text-center">
          Выберите способ оплаты
        </h2>
        <div className="flex space-x-8 justify-center">
          <button
            className="px-8 py-4 text-3xl font-light rounded-xl border bg-gray-200 border-gray-300 shadow-md hover:bg-gray-300 transition-all"
            onClick={() => handlePaymentMethod('cash')}
          >
            Оплата наличными
          </button>
          <button
            className="px-8 py-4 bg-yellow-300 text-3xl font-light rounded-xl border border-yellow-600 shadow-md hover:bg-yellow-500 transition-all"
            onClick={() => handlePaymentMethod('card')}
          >
            Оплата картой
          </button>
        </div>
        {paymentMessage && (
          <p className=" text-3xl font-bold text-center">{paymentMessage}</p>
        )}
      </section>
    </div>
  );
}

export default PaymentMenu;
