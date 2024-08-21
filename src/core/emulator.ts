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

    const startTransaction = async (result: boolean) => {
      while (messageIndex < messages.length) {
        display_cb(messages[messageIndex]);
        messageIndex++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      await cb(result);

      if (result) {
        display_cb('Транзакция успешна!');
      } else {
        messageIndex = 0;
        const errorMessages = [
          'Ошибка транзакции!',
          'Оплата не удалась...',
          'Попробуйте снова.',
        ];
        let errorMessageIndex = 0;

        while (errorMessageIndex < errorMessages.length) {
          display_cb(errorMessages[errorMessageIndex]);
          errorMessageIndex++;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await cb(result);
      }
    };

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === '1' || event.key === '2') {
        document.removeEventListener('keydown', handleKeyDown);
        console.log(`${event.key === '1' ? 'Success' : 'Failure'} key pressed`);

        transactionResult = event.key === '1';
        await startTransaction(transactionResult);

        if (!transactionResult) {
          document.addEventListener('keydown', handleKeyDown);
        }
      }
    };

    if (transactionResult === null) {
      document.addEventListener('keydown', handleKeyDown);
    }

    if (transactionResult !== null) {
      document.removeEventListener('keydown', handleKeyDown);
    }
  },

  BankCardCancel() {
    console.log('Canceling card transaction');
  },

  Vend(product, cb) {
    console.log(`Launching vending a product with id: ${product.id}`);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '3') {
        console.log('Success key pressed');
        cb(true);
        removeListener();
      } else if (event.key === '4') {
        console.log('Failure key pressed');
        cb(false);
        removeListener();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const removeListener = () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },
};

export default emulator;
