// emulator.d.ts
interface Emulator {
  StartCashin(cb: (amount: number) => void): void;
  StopCashin(): void;
  BankCardPurchase(
    amount: number,
    cb: (result: boolean) => void,
    display_cb: (message: string) => void
  ): void;
  BankCardCancel(): void;
  Vend(product_idx: number, cb: (result: boolean) => void): void;
}

const emulator: Emulator = {
  StartCashin(cb) {
    console.log('Cashin started');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        setTimeout(() => {
          cb(10); // Simulate receiving a 10-unit bill
        }, 1000);
      } else if (event.key === '2') {
        setTimeout(() => {
          cb(50); // Simulate receiving a 50-unit bill
        }, 1000);
      }
    };

    const handleStopKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Cashin stopped');
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleStopKeyDown);
      }
    };

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
