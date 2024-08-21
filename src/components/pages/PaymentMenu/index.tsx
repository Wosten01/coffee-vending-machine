import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import emulator from '../../../core/emulator';
import { useNavigate } from 'react-router-dom';
import NothingToShowScreen from '../../shared/NothingToShowScreen';
import { addToAmount, resetApp, setVendStatus } from '../../../store/appSlice';
import {
  resetStatus,
  setProcessing as setCashProcessing,
} from '../../../store/cashAcceptorSlice';
import {
  setStatusMessage,
  setProcessing as setCardProcessing,
  resetCardAcceptor,
} from '../../../store/cardAcceptorSlice';
import { Product } from '../../../data/products';

function PaymentMenu() {
  const selectedProduct = useSelector(
    (state: RootState) => state.app.selectedProduct
  );
  const cashStatus = useSelector(
    (state: RootState) => state.cashAcceptor.status
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vend = (selectedProduct: Product) => {
    emulator.Vend(selectedProduct, (result) => {
      if (result) {
        console.log('The vending machine works and will work successfuly');
        dispatch(setVendStatus({ status: true }));
      } else {
        console.log('Vending failure');
        dispatch(setVendStatus({ status: false }));
      }
    });
  };

  useEffect(() => {
    if (!selectedProduct) {
      dispatch(resetApp());
      navigate('/');
    }
  }, [selectedProduct, navigate, dispatch]);

  if (!selectedProduct) {
    return <NothingToShowScreen text="Нет выбранного продукта" />;
  }

  function handlePaymentMethod(method: string) {
    if (method === 'cash') {
      emulator.StartCashin(async (amount) => {
        if (cashStatus === 'idle') {
          dispatch(setCashProcessing());
          await new Promise((resolve) => setTimeout(resolve, 2000));
          dispatch(addToAmount({ amount: amount }));
          dispatch(resetStatus());
        }
      });

      navigate('/cash');
    } else if (method === 'card') {
      if (selectedProduct) {
        emulator.BankCardPurchase(
          selectedProduct.price,
          (result: boolean) => {
            if (result) {
              setTimeout(() => {
                navigate('/drink-preparation');
                vend(selectedProduct);
              }, 2000);
            } else {
              dispatch(setCardProcessing({ status: false }));
            }
          },
          (message: string) => {
            dispatch(setCardProcessing({ status: true }));
            dispatch(setStatusMessage({ message: message }));
          }
        );
        navigate('/card');
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <section className="flex flex-col items-center text-center gap-6">
        <p className="text-5xl font-thin tracking-wider">Ваш напиток</p>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-80 h-80"
        />
        <h1 className="text-6xl font-thin tracking-wider ">
          {selectedProduct.name}
        </h1>
      </section>
      <section>
        <div className="flex flex-col text-yellow-600 text-opacity-65 justify-center items-center ">
          <p className="text-4xl font-light">Итого:</p>
          <p className="text-9xl  font-bold ">{selectedProduct.price}₽</p>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-6">
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
              className="text-3xl font-light px-8 py-4 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition-all"
              onClick={() => handlePaymentMethod('card')}
            >
              Оплата картой
            </button>
          </div>
        </section>

        <section className="">
          <button
            className="px-8 py-4 bg-yellow-300 text-3xl font-light rounded-xl border border-yellow-600 shadow-md hover:bg-yellow-500 transition-all"
            onClick={() => {
              navigate('/');
              dispatch(resetCardAcceptor());
              dispatch(resetStatus());
              dispatch(resetApp());
            }}
          >
            Вернуться
          </button>
        </section>
      </section>
    </div>
  );
}

export default PaymentMenu;
