import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CardIcon from '../../shared/CardIcon';
import NothingToShowScreen from '../../shared/NothingToShowScreen';
import { useEffect } from 'react';
import { resetApp } from '../../../store/appSlice';
import emulator from '../../../core/emulator';
import { resetCardAcceptor } from '../../../store/cardAcceptorSlice';
import { resetStatus } from '../../../store/cashAcceptorSlice';

function CardPayment() {
  const navigate = useNavigate();
  const { selectedProduct } = useSelector((state: RootState) => state.app);
  const { isProcessing } = useSelector(
    (state: RootState) => state.cardAcceptor
  );
  const dispatch = useDispatch();
  const { statusMessage } = useSelector(
    (state: RootState) => state.cardAcceptor
  );

  useEffect(() => {
    if (!selectedProduct) {
      dispatch(resetCardAcceptor());
      dispatch(resetStatus());
      dispatch(resetApp());
      navigate('/');
      emulator.BankCardCancel();
    }
  }, [selectedProduct, navigate, dispatch]);

  const handleCancel = () => {
    dispatch(resetCardAcceptor());
    emulator.BankCardCancel();
    navigate('/payment-selection');
  };

  if (!selectedProduct) {
    return <NothingToShowScreen text="Нет выбранного продукта" />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-between items-center p-6">
      <h1 className="text-5xl font-thin tracking-wider">Оплата картой</h1>
      <section className="flex justify-center items-center p-6 w-full">
        <div className="flex flex-col text-5xl text-center font-thin tracking-widest gap-2">
          <div className="flex flex-col items-center p-4 text-center">
            <CardIcon className="fill-blue-600 " width={250} height={250} />
            <section className="flex flex-col items-center justify-center h-full w-full">
              <p className="h-32 text-center text-4xl font-light text-blue-600 flex items-center justify-center">
                <span>{statusMessage}</span>
              </p>
            </section>
          </div>
          <div className="flex flex-col gap-4">
            <p className="">Необходимая сумма:</p>
            <span className="text-8xl font-bold text-yellow-600 text-opacity-65">
              {selectedProduct.price.toFixed(0)}₽
            </span>
          </div>
        </div>
      </section>

      {!isProcessing ? (
        <section className="h-20">
          <button
            className="px-8 py-4 text-3xl font-light bg-yellow-300 rounded-xl border border-gray-300 shadow-md hover:bg-yellow-500 transition-all"
            onClick={handleCancel}
          >
            Вернуться
          </button>
        </section>
      ) : (
        <section className="h-20"></section>
      )}
    </div>
  );
}

export default CardPayment;
