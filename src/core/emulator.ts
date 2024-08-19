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

interface EmulatorState {
  handleKeyDown: ((event: KeyboardEvent) => void) | null;
  handleStopKeyDown: ((event: KeyboardEvent) => void) | null;
}

const emulator: Emulator & EmulatorState = {
  handleKeyDown: null as ((event: KeyboardEvent) => void) | null,
  handleStopKeyDown: null as ((event: KeyboardEvent) => void) | null,

  StartCashin(callback) {
    console.log('Cashin started');

    // Определяем обработчик для ввода купюр
    this.handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      if (event.key === '1') {
        callback(5);
      } else if (event.key === '2') {
        callback(10);
      } else if (event.key === '3') {
        callback(50);
      } else if (event.key === '4') {
        callback(100);
      }
    };

    this.handleStopKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Cashin stopped');
        this.StopCashin();
      }
    };

    if (this.handleKeyDown) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
    if (this.handleStopKeyDown) {
      document.addEventListener('keydown', this.handleStopKeyDown);
    }
  },

  StopCashin() {
    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
    if (this.handleStopKeyDown) {
      document.removeEventListener('keydown', this.handleStopKeyDown);
    }
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
