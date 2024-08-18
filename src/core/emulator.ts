// emulator.d.ts
interface Emulator {
  StartCashin(callback: (amount: number) => void): void;
  StopCashin(): void;
  BankCardPurchase(
    amount: number,
    callback: (result: boolean) => void,
    display_callback: (message: string) => void
  ): void;
  BankCardCancel(): void;
  Vend(product_idx: number, callback: (result: boolean) => void): void;
}

const emulator: Emulator = {
  StartCashin(callback) {
    console.log('Cashin started');

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      if (event.key == '1') {
        setTimeout(() => {
          callback(5);
        }, 1000);
      } else if (event.key == '2') {
        setTimeout(() => {
          callback(10);
        }, 1000);
      } else if (event.key == '3') {
        setTimeout(() => {
          callback(50);
        }, 1000);
      } else if (event.key == '4') {
        setTimeout(() => {
          callback(100);
        }, 1000);
      }
    };

    // Обработчик для остановки
    const handleStopKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Cashin stopped');
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleStopKeyDown);
      }
    };

    // Добавляем обработчики событий
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleStopKeyDown);
  },

  StopCashin() {
    console.log('Cashin stopped');
  },

  BankCardPurchase(amount, cb, display_cb) {
    console.log(`Processing card payment of ${amount}`);

    const messages = [
      'Приложите карту',
      'Обработка карты',
      'Связь с банком',
      'Проверка средств',
      'Транзакция успешна',
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < messages.length) {
        display_cb(messages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(interval);
        const result = Math.random() > 0.1; // 90% chance of successful transaction
        cb(result);
        display_cb(result ? 'Транзакция успешна' : 'Ошибка транзакции');
      }
    }, 1000);
  },

  BankCardCancel() {
    console.log('Canceling card transaction');
  },

  Vend(product_idx, cb) {
    console.log(`Dispensing product ${product_idx}`);

    setTimeout(() => {
      const result = Math.random() > 0.2; // 80% chance of successful dispense
      cb(result);
    }, 2000);
  },
};

export default emulator;
