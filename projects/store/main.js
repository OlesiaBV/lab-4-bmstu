// Получаем элементы
const userSurname = document.querySelector('[name="surname"]');
const userName = document.querySelector('[name="name"]');
const goodsElements = document.querySelectorAll('.checkbox'); // Все чекбоксы товаров
const countElements = document.querySelectorAll('input[type="number"]'); // Все поля для количества
const btn = document.querySelector('.btn');
const resultElem = document.querySelector('.sum'); // Элемент для вывода общей суммы

// Объект для хранения количества каждого товара
const countGoods = {
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
};

// Объект для хранения цены каждого товара
const choicePriceGoods = {
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
};

// Функция для пересчета итоговой суммы
function updateTotal() {
    let total = 0;

    // Перебираем все товары и суммируем
    for (let product in choicePriceGoods) {
        if (choicePriceGoods[product] !== 0) {
            let quantity = countGoods[product];
            total += choicePriceGoods[product] * quantity;
        }
    }

    // Обновляем итоговую сумму в элементе
    resultElem.textContent = `${total} р.`; 
}

// Функция для обработки события на изменение количества
function onCountChange(event) {
    const productId = event.target.id;
    let quantity = parseInt(event.target.value);

    // Проверка на ввод некорректных чисел
    if (isNaN(quantity) || quantity < 0) {
        quantity = 0; // Если введено некорректное значение, сбрасываем на 0
        event.target.value = 0;
    }

    // Обновляем количество товара в объекте
    countGoods[productId] = quantity;

    // Пересчитываем итог
    updateTotal();
}

// Функция для обработки события на изменение состояния чекбокса
function onCheckboxChange(event) {
    const productId = event.target.getAttribute('data-goods');
    const productPrice = parseInt(event.target.value);

    // Если чекбокс отмечен
    if (event.target.checked) {
        choicePriceGoods[productId] = productPrice;
        // Устанавливаем количество товара по умолчанию в 1
        countGoods[productId] = 1;
        document.querySelector(`#${productId}`).value = 1; // Устанавливаем значение в поле ввода
    } else {
        // Если чекбокс снят, сбрасываем цену и количество
        choicePriceGoods[productId] = 0;
        countGoods[productId] = 0;
        document.querySelector(`#${productId}`).value = 0;
    }

    // Пересчитываем итог
    updateTotal();
}

// Функция для обработки нажатия на кнопку "Оформить заказ"
function onOrderSubmit() {
    const surname = userSurname.value.trim();
    const name = userName.value.trim();
    const total = resultElem.textContent;

    // Проверяем, что все данные введены
    if (!surname || !name) {
        alert("Пожалуйста, введите ваше имя и фамилию.");
        return;
    }

    // Проверка на наличие хотя бы одного выбранного товара
    let anyProductSelected = false;
    goodsElements.forEach(checkbox => {
        if (checkbox.checked) {
            anyProductSelected = true;
        }
    });

    if (!anyProductSelected) {
        alert("Выберите хотя бы один товар для заказа.");
        return;
    }

    // Выводим сообщение с заказом
    alert(`Заказ оформлен! \n\nИмя: ${name} ${surname}\nИтого: ${total}`);
}

// Привязываем обработчики событий к элементам
countElements.forEach(input => {
    input.addEventListener('input', onCountChange); // используем 'input' для обработки изменений в реальном времени
});

goodsElements.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange); // обработчик изменения состояния чекбокса
});

btn.addEventListener('click', onOrderSubmit); // обработчик нажатия на кнопку оформления

// Инициализация итоговой суммы
updateTotal();
