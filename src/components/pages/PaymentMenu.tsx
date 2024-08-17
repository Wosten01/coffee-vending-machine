import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from '../../store/appSlice';
import { RootState } from '../../store';
import emulator from '../../core/emulator';
import { coffee as products } from '../../data/products';

function PaymentMenu() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state: RootState) => state.app.selectedProduct
  );
  const [paymentMessage, setPaymentMessage] = useState('');

  function handlePaymentMethod(method: string) {
    dispatch(setPaymentMethod(method));

    if (method === 'cash') {
      emulator.StartCashin((amount) => {
        setPaymentMessage(`Принято ${amount} рублей`);
      });
    } else if (method === 'card') {
      emulator.BankCardPurchase(
        products[selectedProduct!].price,
        (result) => {
          if (result) setPaymentMessage('Транзакция успешна');
        },
        setPaymentMessage
      );
    }
  }

  return (
    <div>
      <h2>Выберите способ оплаты</h2>
      <div className="flex space-x-4 mt-4">
        <button
          className="p-4 border rounded shadow hover:bg-gray-100"
          onClick={() => handlePaymentMethod('cash')}
        >
          Оплата наличными
        </button>
        <button
          className="p-4 border rounded shadow hover:bg-gray-100"
          onClick={() => handlePaymentMethod('card')}
        >
          Оплата картой
        </button>
      </div>
      {paymentMessage && <p>{paymentMessage}</p>}
    </div>
  );
}

export default PaymentMenu;
