Psychologists Service Application

Цей застосунок розроблений для компанії, що пропонує послуги психологів. Застосунок дозволяє користувачам переглядати психологів, сортувати їх за різними критеріями та зберігати улюблених фахівців в розділ "Обрані".

Функціонал
1. Home Page
Мета: Привітати користувача та закликати його до дії.
Елементи:
Заголовок сайту.
Слоган компанії.
Заклик до початку роботи із посиланням, що перенаправляє на сторінку "Psychologists".

2. Psychologists Page
Мета: Надати користувачеві перелік психологів та можливість сортувати їх за різними критеріями.
Функціонал сортування:
За алфавітом: від A до Z або від Z до A.
За ціною: від найнижчої ціни або від найвищої.
За популярністю: від найнижчого рейтингу або від найвищого.

3. Favorites Page
Мета: Надати користувачеві можливість переглядати збережених улюблених психологів.
Доступ: Приватна сторінка, доступна після того, як користувач додає психологів до "обраних".

Технічні деталі
Стек технологій:
React — для побудови компонентів UI.
React Router — для навігації між сторінками.
Firebase — для автентифікації та зберігання даних користувачів.
Структура проекту

├── public
├── src
│   ├── components
│   │   ├──       
│   │   ├── 
│   │   └── 
│   ├── pages
│   │   ├──  
│   │   ├──  
│   │   └──         
│   ├── firebase             
│   └── App.jsx             
├── README.md
└── package.json
Як запустити проект
Клонуйте репозиторій:

1.
git clone https://github.com/ваш_репозиторій.git
Встановіть залежності:

2.
npm install
Створіть конфігураційний файл Firebase, додайте свої ключі:

3.
src/firebase/firebaseConfig.js
Запустіть проект:

4.
npm start

Автор
Леся Коткова — розробник цього проєкту.