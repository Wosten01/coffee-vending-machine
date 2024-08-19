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

    // Удаляем старые обработчики, если они существуют
    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
    if (this.handleStopKeyDown) {
      document.removeEventListener('keydown', this.handleStopKeyDown);
    }

    // Определяем обработчик для ввода купюр
    this.handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      switch (event.key) {
        case '1':
          setTimeout(() => callback(5), 2000);
          break;
        case '2':
          setTimeout(() => callback(10), 2000);
          break;
        case '3':
          callback(50);
          break;
        case '4':
          callback(100);
          break;
        case '5':
          callback(200);
          break;
        case '6':
          callback(500);
          break;
        default:
          break;
      }
    };

    // Определяем обработчик для остановки
    this.handleStopKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Cashin stopped');
        this.StopCashin();
      }
    };

    // Добавляем новые обработчики событий
    if (this.handleKeyDown) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
    if (this.handleStopKeyDown) {
      document.addEventListener('keydown', this.handleStopKeyDown);
    }
  },

  StopCashin() {
    // Удаляем обработчики событий
    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this.handleKeyDown = null; // Очистка ссылки
    }
    if (this.handleStopKeyDown) {
      document.removeEventListener('keydown', this.handleStopKeyDown);
      this.handleStopKeyDown = null; // Очистка ссылки
    }
    console.log('Cashin stopped');
  },

  // BankCardPurchase(amount, cb, display_cb) {
  //   console.log(`Processing card payment of ${amount}`);

  //   const messages = [
  //     'Обработка карты...',
  //     'Связь с банком...',
  //     'Проверка средств...',
  //     'Почти готово...',
  //   ];
  //   const errorMessages = [
  //     'Ошибка транзакции!',
  //     'Оплата не удалась...',
  //     'Попробуйте снова.',
  //   ];

  //   let messageIndex = 0;
  //   const interval = setInterval(() => {
  //     if (messageIndex < messages.length) {
  //       // Отображаем промежуточные сообщения
  //       display_cb(messages[messageIndex]);
  //       messageIndex++;
  //     } else {
  //       clearInterval(interval);

  //       const result = Math.random() > 0.5;
  //       cb(result);

  //       if (result) {
  //         display_cb('Транзакция успешна!');
  //       } else {
  //         let errorMessageIndex = 0;

  //         const errorInterval = setInterval(() => {
  //           if (errorMessageIndex < errorMessages.length) {
  //             display_cb(errorMessages[errorMessageIndex]);
  //             errorMessageIndex++;
  //           } else {
  //             clearInterval(errorInterval);
  //           }
  //         }, 1000);
  //       }
  //     }
  //   }, 1000);
  // },
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

    // Функция для начала транзакции
    const startTransaction = (result: boolean) => {
      const interval = setInterval(() => {
        if (messageIndex < messages.length) {
          // Отображаем промежуточные сообщения
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

    // Обработчик нажатий на клавиши
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        console.log('Success key pressed');
        transactionResult = true; // Успешная транзакция
        startTransaction(transactionResult);
      } else if (event.key === '2') {
        console.log('Failure key pressed');
        transactionResult = false; // Неуспешная транзакция
        startTransaction(transactionResult);
      }
    };

    // Добавляем слушатель событий клавиатуры
    document.addEventListener('keydown', handleKeyDown);

    // Убираем слушатель событий после завершения транзакции
    const removeListener = () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    // Удаляем слушатель при завершении транзакции
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
    console.log(`Dispensing product ${product_idx}`);

    setTimeout(() => {
      const result = Math.random() > 0.2; // 80% chance of successful dispense
      cb(result);
    }, 2000);
  },
};

export default emulator;
