# Coffee Vending Machine

[DEMO](https://github.com/user-attachments/assets/ea86d28c-5fd1-4cdb-8557-5991c335ce56)

[Попробовать](https://coffee-vending-machine.netlify.app)


Описание проекта

Этот проект представляет собой эмулятор вендинговой кофемашины. Проект разработан с использованием React, Redux и TypeScript, и включает в себя следующие ключевые экраны и функциональные возможности.

Структура проекта

1. Экран выбора продукта
   На этом экране пользователи могут выбрать напиток, который они хотят приобрести.

Выбор продукта: Пользователи видят список доступных продуктов и могут выбрать один из них.
Кнопка "Выбрать": При нажатии на кнопку, выбранный продукт сохраняется, и пользователи перенаправляются на экран выбора метода оплаты.

2. Экран выбора метода оплаты
   На этом экране пользователи могут выбрать способ оплаты: наличными или картой.

Кнопка "Оплата наличными": При нажатии пользователи перенаправляются на экран оплаты наличными.
Кнопка "Оплата картой": При нажатии пользователи перенаправляются на экран оплаты картой.

3. Экран оплаты наличными
   На этом экране пользователи могут вводить деньги с клавиатуры для оплаты.

Интерфейс ввода: Пользователи вводят сумму денег, используя клавиши от 1 до 6, каждая клавиша соответствует определенной сумме (например, 1 — 5 рублей, 2 — 10 рублей и т.д.).
Обработка ввода: Внесенные деньги добавляются к общей сумме. После внесения необходимой суммы пользователю предлагается забрать сдачу и перейти на экран приготовления напитка.
Блокировка ввода: Во время обработки ввода пользователи не могут повторно нажимать клавиши, чтобы предотвратить дублирование ввода.

4. Экран оплаты картой
   На этом экране пользователи вводят информацию о своей карте.

Интерфейс ввода: Эмулируется процесс прикладывают карту для оплаты.

- При нажатии на "1" на клавиатуре - происходит успешная транзакция.
- При нажатии на "2" на клавиатуре - происходит неудачая транзакция.

Обработка оплаты: После успешного выполнения платежа пользователи перенаправляются на экран приготовления напитка.

5. Экран приготовления напитка
   На этом экране пользователи видят прогресс приготовления их напитка.

Индикатор прогресса: Показан индикатор, который заполняется по мере прогресса приготовления. Чем меньше времени остается, тем больше заполнен индикатор.

- При нажатии на "3" на клавиатуре или ожидании конца загрузки - происходит успешно приготовление напитка
- При нажатии на "4" на клавиатуре - происходит сбой в приготовлении и выводится соответствующее сообщение
