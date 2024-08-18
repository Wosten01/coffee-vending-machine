import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CashIcon from '../../shared/CashIcon';

function CashPayment() {
  const navigate = useNavigate();
  const { selectedProduct, enteredAmount } = useSelector(
    (state: RootState) => state.app
  );

  if (!selectedProduct) {
    return (
      <div className="h-full w-full flex justify-center items-center text-center text-red-500 font-light text-8xl ">
        Нет выбранного продукта
      </div>
    );
  }

  const requiredAmount = selectedProduct.price;
  const change = enteredAmount - requiredAmount;
  const isSufficient = enteredAmount >= requiredAmount;

  const handleReturn = () => {
    navigate('/payment-selection');
  };

  const handleDispenseChange = () => {
    // Здесь должна быть логика для выдачи сдачи
    // Например, вызывать функцию эмулятора
    // emulator.DispenseChange(change, () => {});
    navigate('/drink-preparation');
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center p-6">
      <h1 className="text-5xl font-thin tracking-wider ">Платежный экран</h1>
      <section className="flex justify-center items-center p-6 w-full">
        <div className="flex flex-col text-5xl text-center font-thin tracking-widest gap-4">
          <div className=" flex flex-col items-center p-4 text-center ">
            <CashIcon className="fill-green-600" width={200} height={200} />
          </div>
          <div className="flex flex-col gap-4">
            <p className="">Необходимая сумма: </p>
            <span className="text-8xl font-bold  text-yellow-600 text-opacity-65">
              {requiredAmount.toFixed(0)}₽
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className=" font-thin">Введенная сумма: </p>
            <span className="text-8xl font-bold  text-yellow-600 text-opacity-65">
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
            className="px-8 py-4 text-3xl font-light bg-yellow-300 rounded-xl border  border-gray-300 shadow-md hover:bg-yellow-500 transition-all"
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
