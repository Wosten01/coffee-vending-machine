// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store';
// import CardIcon from '../../shared/CardIcon';
// import NothingToShowScreen from '../../shared/NothingToShowScreen';
// import { useEffect, useState } from 'react';
// import { resetApp } from '../../../store/appSlice';
// import emulator from '../../../core/emulator';

// function CardPayment() {
//   const navigate = useNavigate();
//   const { selectedProduct } = useSelector((state: RootState) => state.app);
//   const dispatch = useDispatch();
//   const [statusMessage, setStatusMessage] = useState(
//     'Приложите карту для оплаты.'
//   );

//   useEffect(() => {
//     if (!selectedProduct) {
//       dispatch(resetApp());
//       navigate('/');
//       emulator.BankCardCancel();
//     }
//   }, [selectedProduct, navigate, dispatch]);

//   const handleCancel = () => {
//     emulator.BankCardCancel();
//     navigate('/payment-selection');
//   };

//   useEffect(() => {
//     if (selectedProduct) {
//       emulator.BankCardPurchase(
//         selectedProduct.price,
//         (result: boolean) => {
//           if (result) {
//             setTimeout(() => navigate('/drink-preparation'), 2000);
//           }
//         },
//         (message: string) => {
//           setStatusMessage(message);
//         }
//       );
//     }
//   }, [selectedProduct, navigate]); //

//   if (!selectedProduct) {
//     return <NothingToShowScreen text="Нет выбранного продукта" />;
//   }

//   return (
//     <div className="h-full w-full flex flex-col justify-between items-center p-6">
//       <h1 className="text-5xl font-thin tracking-wider">Оплата картой</h1>
//       <section className="flex justify-center items-center p-6 w-full">
//         <div className="flex flex-col text-5xl text-center font-thin tracking-widest gap-2">
//           <div className="flex flex-col items-center p-4 text-center">
//             <CardIcon className="fill-blue-600 " width={250} height={250} />
//             <section className="flex flex-col items-center justify-center h-full w-full">
//               <p className="h-32 text-center text-4xl font-light text-blue-600 flex items-center justify-center">
//                 <span>{statusMessage}</span>
//               </p>
//             </section>
//           </div>
//           <div className="flex flex-col gap-4">
//             <p className="">Необходимая сумма:</p>
//             <span className="text-8xl font-bold text-yellow-600 text-opacity-65">
//               {selectedProduct.price.toFixed(0)}₽
//             </span>
//           </div>
//         </div>
//       </section>

//       <section className="flex gap-4 h-20">
//         <button
//           className="px-8 py-4 text-3xl font-light bg-yellow-300 rounded-xl border border-gray-300 shadow-md hover:bg-yellow-500 transition-all"
//           onClick={handleCancel}
//         >
//           Вернуться
//         </button>
//       </section>
//     </div>
//   );
// }

// export default CardPayment;
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CardIcon from '../../shared/CardIcon';
import NothingToShowScreen from '../../shared/NothingToShowScreen';
import { useEffect, useState } from 'react';
import { resetApp } from '../../../store/appSlice';
import emulator from '../../../core/emulator';

function CardPayment() {
  const navigate = useNavigate();
  const { selectedProduct } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const [statusMessage, setStatusMessage] = useState(
    'Приложите карту для оплаты.'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!selectedProduct) {
      dispatch(resetApp());
      navigate('/');
      emulator.BankCardCancel();
    }
  }, [selectedProduct, navigate, dispatch]);

  const handleCancel = () => {
    emulator.BankCardCancel();
    navigate('/payment-selection');
  };

  const processPayment = () => {
    if (selectedProduct && !isProcessing) {
      setIsProcessing(true);

      emulator.BankCardPurchase(
        selectedProduct.price,
        (result: boolean) => {
          if (result) {
            setTimeout(() => {
              setIsProcessing(false);
              navigate('/drink-preparation');
            }, 2000);
          } else {
            setIsProcessing(false);
            if (retryCount < 3) {
              // Установите максимальное количество попыток
              setRetryCount(retryCount + 1);
            } else {
              setStatusMessage(
                'Не удалось завершить оплату. Попробуйте снова.'
              );
            }
          }
        },
        (message: string) => {
          setStatusMessage(message);
          setIsProcessing(false);
        }
      );
    }
  };

  useEffect(() => {
    processPayment();
  }, [selectedProduct, navigate, retryCount, processPayment]);

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

      <section className="flex gap-4 h-20">
        <button
          className="px-8 py-4 text-3xl font-light bg-yellow-300 rounded-xl border border-gray-300 shadow-md hover:bg-yellow-500 transition-all"
          onClick={handleCancel}
        >
          Вернуться
        </button>
      </section>
    </div>
  );
}

export default CardPayment;
