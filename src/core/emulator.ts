import { Product } from '../data/products';

interface Emulator {
  StartCashin(callback: (amount: number) => void): void;
  StopCashin(): void;
  BankCardPurchase(
    amount: number,
    callback: (result: boolean) => void,
    display_callback: (message: string) => void
  ): void;
  BankCardCancel(): void;
  Vend(product: Product, callback: (result: boolean) => void): void;
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

    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
    if (this.handleStopKeyDown) {
      document.removeEventListener('keydown', this.handleStopKeyDown);
    }

    this.handleKeyDown = async (event) => {
      console.log(`Key pressed: ${event.key}`);
      let amount = null;
      switch (event.key) {
        case '1':
          amount = 5;
          break;
        case '2':
          amount = 10;
          break;
        case '3':
          amount = 50;
          break;
        case '4':
          amount = 100;
          break;
        case '5':
          amount = 200;
          break;
        case '6':
          amount = 500;
          break;
        default:
          break;
      }

      if (amount !== null) {
        if (this.handleKeyDown) {
          document.removeEventListener('keydown', this.handleKeyDown);
        }
        await callback(amount);
        if (this.handleKeyDown) {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      }
    };

    this.handleStopKeyDown = (event) => {
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
    console.log('Stopping Cashin');
    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this.handleKeyDown = null;
    }
    if (this.handleStopKeyDown) {
      document.removeEventListener('keydown', this.handleStopKeyDown);
      this.handleStopKeyDown = null;
    }
  },
  BankCardPurchase(amount, cb, display_cb) {
    console.log(`Processing card payment of ${amount}`);

    const messages = [
      'Обработка карты...',
      'Связь с банком...',
      'Проверка средств...',
      'Почти готово...',
    ];

    let messageIndex = 0;
    let transactionResult: boolean | null = null;

    const startTransaction = (result: boolean) => {
      const interval = setInterval(() => {
        if (messageIndex < messages.length) {
          display_cb(messages[messageIndex]);
          messageIndex++;
        } else {
          clearInterval(interval);
          cb(result);

          if (result) {
            display_cb('Транзакция успешна!');
          } else {
            const errorMessages = [
              'Ошибка транзакции!',
              'Оплата не удалась...',
              'Попробуйте снова.',
            ];
            let errorMessageIndex = 0;

            const errorInterval = setInterval(() => {
              if (errorMessageIndex < errorMessages.length) {
                display_cb(errorMessages[errorMessageIndex]);
                errorMessageIndex++;
              } else {
                clearInterval(errorInterval);
              }
            }, 1000);
          }
        }
      }, 1000);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        console.log('Success key pressed');
        transactionResult = true;
        startTransaction(transactionResult);
      } else if (event.key === '2') {
        console.log('Failure key pressed');
        transactionResult = false;
        startTransaction(transactionResult);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const removeListener = () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    const intervalCleanup = setInterval(() => {
      if (transactionResult !== null) {
        clearInterval(intervalCleanup);
        removeListener();
      }
    }, 100);
  },

  BankCardCancel() {
    console.log('Canceling card transaction');
  },

  Vend(product_idx, cb) {
    console.log(`Запуск выдачи продукта с индексом ${product_idx}`);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        console.log('Success key pressed');
        cb(true);
        removeListener();
      } else if (event.key === '2') {
        console.log('Failure key pressed');
        cb(false);
        removeListener();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const removeListener = () => {
      document.removeEventListener('keydown', handleKeyDown);
      console.log('Remove keyboard handler');
    };
  },
};

export default emulator;
