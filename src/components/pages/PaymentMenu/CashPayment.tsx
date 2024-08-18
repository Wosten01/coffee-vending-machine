import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CashIcon from '../../shared/CashIcon';
import NothingToShowScreen from '../../shared/NothingToShowScreen';
import { useEffect } from 'react';
import { resetApp } from '../../../store/appSlice';
import emulator from '../../../core/emulator';

function CashPayment() {
  const navigate = useNavigate();
  const { selectedProduct, enteredAmount } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedProduct) {
      dispatch(resetApp());
      navigate('/');
      emulator.StopCashin();
    }
  }, [selectedProduct, navigate, dispatch]);

  if (!selectedProduct) {
    return <NothingToShowScreen text="Нет выбранного продукта" />;
  }

  const requiredAmount = selectedProduct.price;
  const change = enteredAmount - requiredAmount;
  const isSufficient = enteredAmount >= requiredAmount;

  const handleReturn = () => {
    emulator.StopCashin();
    navigate('/payment-selection');
  };

  const handleDispenseChange = () => {
    emulator.StopCashin();
    navigate('/drink-preparation');
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center p-6">
      <h1 className="text-5xl font-thin tracking-wider">Платежный экран</h1>
      <section className="flex justify-center items-center p-6 w-full">
        <div className="flex flex-col text-5xl text-center font-thin tracking-widest gap-4">
          <div className="flex flex-col items-center p-4 text-center">
            <CashIcon className="fill-green-600" width={150} height={150} />
            <section className="flex flex-col items-center justify-center h-full w-full">
              {enteredAmount > 0 ? (
                <div>
                  <p className=" text-center text-5xl font-thin text-green-600 flex items-center justify-center">
                    Внесено{' '}
                  </p>
                  <span className=" font-bold text-5xl text-green-600">
                    {enteredAmount.toFixed(0)}₽
                  </span>
                </div>
              ) : (
                <p className="h-32 text-center text-5xl font-thin text-green-600 flex items-center justify-center">
                  <span>Внесите банкноты в купюроприемник</span>
                </p>
              )}
            </section>
          </div>
          <div className="flex flex-col gap-4">
            <p className="">Необходимая сумма:</p>
            <span className="text-8xl font-bold text-yellow-600 text-opacity-65">
              {requiredAmount.toFixed(0)}₽
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-thin">Введенная сумма:</p>
            <span className="text-8xl font-bold text-yellow-600 text-opacity-65">
              {enteredAmount.toFixed(0)}₽
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="">Сдача:</p>
            <span className="text-8xl font-bold text-yellow-600 text-opacity-65">
              {isSufficient ? change.toFixed(0) : 0}₽
            </span>
          </div>
        </div>
      </section>

      <section className="flex gap-4 h-20">
        {!(enteredAmount > 0) && (
          <button
            className="px-8 py-4 text-3xl font-light bg-yellow-300 rounded-xl border border-gray-300 shadow-md hover:bg-yellow-500 transition-all"
            onClick={handleReturn}
          >
            Вернуться
          </button>
        )}
        {isSufficient && (
          <button
            className="px-8 py-4 disabled:bg-gray-200 bg-yellow-300 text-4xl font-light rounded-xl border shadow-md hover:bg-yellow-500 transition-all"
            onClick={handleDispenseChange}
            disabled={!isSufficient}
          >
            Выдать сдачу и начать приготовление
          </button>
        )}
      </section>
    </div>
  );
}

export default CashPayment;
