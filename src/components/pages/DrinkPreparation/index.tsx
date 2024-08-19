import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import NothingToShowScreen from '../../shared/NothingToShowScreen';

function DrinkPreparation() {
  const selectedProduct = useSelector(
    (state: RootState) => state.app.selectedProduct
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) {
      navigate('/');
    }
  }, [selectedProduct, navigate]);

  const time = selectedProduct?.time || 0;

  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsComplete(true);
    } else {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [secondsLeft, navigate]);

  if (!selectedProduct) {
    return <NothingToShowScreen text="Нет выбранного продукта" />;
  }

  // Вычисляем процент завершения на основе нового времени
  const totalTime = time; // То же время, которое изначально установлено в secondsLeft
  const progress = ((totalTime - secondsLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-around h-full p-6">
      <h1 className="text-5xl font-thin tracking-wider">
        Приготовление напитка
      </h1>
      <section className="relative flex flex-col items-center justify-center mt-10 w-full">
        {isComplete ? (
          <div className=" flex flex-col  text-5xl font-thin text-center">
            <p className=" mb-3">Ваш напиток готов!</p>
            <p className="mb-3">Пейте с удовольствием!</p>
            <p className="mb-3">{'😊'}</p>
          </div>
        ) : (
          <p className="text-5xl font-thin mb-10">Готовим ваш напиток!</p>
        )}
        {!isComplete && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className={`h-full bg-yellow-500 transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-8xl font-bold mt-4">
              {secondsLeft}
              <span className="font-thin text-5xl "> сек</span>
            </p>
          </div>
        )}
      </section>
      {isComplete && (
        <div className="mt-6 text-center">
          <button
            className="mt-4 px-8 py-4 bg-yellow-300 text-3xl font-light rounded-xl border border-yellow-600 shadow-md hover:bg-yellow-500 transition-all"
            onClick={() => navigate('/')}
          >
            Вернуться на главную
          </button>
        </div>
      )}
    </div>
  );
}

export default DrinkPreparation;
