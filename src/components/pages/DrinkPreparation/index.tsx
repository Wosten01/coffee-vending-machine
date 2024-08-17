import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { resetApp } from '../../../store/appSlice';
import emulator from '../../../core/emulator';

const DrinkPreparation: React.FC = () => {
  const selectedProduct = useSelector(
    (state: RootState) => state.app.selectedProduct
  );
  const dispatch = useDispatch();

  const handlePrepareDrink = () => {
    emulator.Vend(selectedProduct!, (result) => {
      if (result) {
        alert('Ваш напиток готов!');
        dispatch(resetApp());
      } else {
        alert('Ошибка приготовления напитка!');
      }
    });
  };

  return (
    <div>
      <h2>Ваш напиток готовится...</h2>
      <button
        className="p-4 border rounded shadow hover:bg-gray-100 mt-4"
        onClick={handlePrepareDrink}
      >
        Эмуляция приготовления
      </button>
    </div>
  );
};

export default DrinkPreparation;
