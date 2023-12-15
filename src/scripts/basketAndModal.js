// Строковые константа
const DOLLAR = '$';

const getDishes = () => {
  const cachedDishes = localStorage.getItem('dishes');

  if (cachedDishes) {
    return JSON.parse(cachedDishes);
  }

  return [
    { id: '0', name: 'Kala Bhuna', cost: '$10', count: '0', src: 'icons/dish21.png' },
    { id: '1', name: 'Meat Cu', cost: '$20', count: '0', src: 'icons/dish22.png' },
    { id: '2', name: 'Chose your Meals', cost: '$30', count: '0', src: 'icons/dish23.png' },
  ];
};

const setDishesToCache = () => {
  localStorage.setItem('dishes', JSON.stringify(dishes));
};

const dishes = getDishes();
const selectedDishesAmount = dishes.reduce((amount, item) => amount + Number(item.count), 0);
const basket = document.querySelector('.basket');

if (selectedDishesAmount) {
  const circleDiv = document.createElement('div');
  circleDiv.classList.add('circle');
  circleDiv.textContent = selectedDishesAmount;
  basket.after(circleDiv);
}

// Открытие модального окна
const modalOpenButtons = document.querySelectorAll('.bot__button');
const modalWrapper = document.querySelector('.modalka__wrapper');
const modalDishName = document.getElementById('modalDishName');
const modalPlus = document.getElementById('button__plus_modal');
const modalCount = document.getElementById('ModalCount');
const modalTotalCost = document.getElementById('modalTotalCost');
const modalMinus = document.getElementById('button__minus_modal');
const modalImg = document.getElementById('modalImg');

modalOpenButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const dirtyDishId = e.target.closest('.block__rectangle').getAttribute('id');
    const dishId = dirtyDishId.split('-')[1];
    const targetDish = dishes.find((dish) => dish.id === dishId);

    modalDishName.textContent = targetDish.name;
    modalImg.src = targetDish.src;
    modalCount.textContent = 0;
    modalTotalCost.textContent = '$0';
    modalWrapper.classList.add('open');

    // + модалка
    modalPlus.onclick = () => {
      modalCount.textContent = Number(modalCount.textContent) + 1;
      modalTotalCost.textContent = DOLLAR + Number(modalCount.textContent) * Number(targetDish.cost.slice(1));
    };
    // - модалка
    modalMinus.onclick = () => {
      if (modalCount.textContent > 0) {
        modalCount.textContent -= 1;
        modalTotalCost.textContent = DOLLAR + Number(modalCount.textContent) * Number(targetDish.cost.slice(1));
      }
    };
  });
});

//закрытие модального окна
const closeButton = document.querySelector('.close__button');
closeButton.addEventListener('click', () => {
  modalWrapper.classList.remove('open');
});

// Кнопка Добавления ВНУТРИ Модалки
const modalAddButton = document.getElementById('modalAddButton');

modalAddButton.addEventListener('click', (e) => {
  if (Number(modalCount.textContent) > 0) {
    if (!document.querySelector('.circle')) {
      const circleDiv = document.createElement('div');
      circleDiv.classList.add('circle');
      circleDiv.textContent = 0;
      basket.after(circleDiv);
    }
    const circle = document.querySelector('.circle');
    const modalName = e.target.closest('.modalka__rect').querySelector('.rectangle__title').textContent;
    const index = dishes.findIndex((dish) => dish.name === modalName);

    circle.textContent = Number(circle.textContent) + Number(modalCount.textContent);
    dishes[index].count = Number(dishes[index].count) + Number(modalCount.textContent);

    setDishesToCache();
  }
  modalWrapper.classList.remove('open');
});

// Нажатие на иконку корзины
let isBasketOpened = false;
const emptyBasket = document.querySelector('.empty__basket');
const basketList = document.querySelector('.basket__list');
const basketBot = document.querySelector('.basket__bot');
const totalPrice = document.querySelector('.totalPrice');

const closeBasket = () => {
  const openedRows = document.querySelectorAll('.basket__item');

  openedRows.forEach((item) => {
    const parent = item.parentNode;
    parent.removeChild(item);
  });

  document.querySelector('.empty__basket').classList.remove('open');
  document.querySelector('.basket__bot').classList.remove('open');
  document.querySelector('.basket__list').classList.remove('open');
};

basket.addEventListener('click', () => {
  if (isBasketOpened) {
    closeBasket();
  } else {
    document.querySelector('.basket__list').classList.add('open');

    const isDishesChosen = dishes.some((dish) => dish.count > 0);
    if (isDishesChosen) {
      basketBot.classList.add('open');
    } else {
      document.querySelector('.empty__basket').classList.add('open');
    }
    let sum = 0;
    dishes.forEach((dish) => {
      if (dish.count > 0) {
        const dishCost = Number(dish.cost.slice(1)) * Number(dish.count);
        const htmlText = `<div id=${dish.id} class="basket__item  open">
                            <div><img class="basket__img" src=${dish.src}></div>
                            <div class="item__name">${dish.name}</div>
                            <div class="item__price">$${dishCost}</div>
                            <div class="cart__button">
                              <div><button class="button__minus">-</button></div>
                              <div class="button_count">${dish.count}</div> 
                              <div><button class="button__plus">+</button></div>
                            </div>
                            <div><img class='trash' src="icons/close.png"></img></div>
                          </div>`;

        basketList.insertAdjacentHTML('afterbegin', htmlText);
        sum += Number(dishCost);

        // Здесь добавляем +
        let basketPlus = document.querySelector('.button__plus');
        let circle = document.querySelector('.circle');

        basketPlus.onclick = (e) => {
          let count = e.target.closest('.cart__button').querySelector('.button_count');
          let cost = e.target.closest('.basket__item').querySelector('.item__price');

          count.textContent = Number(count.textContent) + 1;
          dish.count = Number(dish.count) + 1;
          circle.textContent = Number(circle.textContent) + 1;
          cost.textContent = DOLLAR + Number(count.textContent) * dish.cost.slice(1);
          totalPrice.textContent = DOLLAR + (Number(totalPrice.textContent.slice(1)) + Number(dish.cost.slice(1)));

          setDishesToCache();
        };

        // Здесь добавляем -
        let basketMinus = document.querySelector('.button__minus');

        basketMinus.onclick = (e) => {
          let count = e.target.closest('.cart__button').querySelector('.button_count');
          if (count.textContent <= 1) return;
          let cost = e.target.closest('.basket__item').querySelector('.item__price');

          count.textContent -= 1;
          dish.count -= 1;
          circle.textContent -= 1;
          cost.textContent = DOLLAR + Number(count.textContent) * dish.cost.slice(1);
          totalPrice.textContent = DOLLAR + (Number(totalPrice.textContent.slice(1)) - Number(dish.cost.slice(1)));

          setDishesToCache();
        };
      }
    });

    totalPrice.textContent = DOLLAR + sum;

    //крестик закрытия в баскете
    let trashs = document.querySelectorAll('.trash');

    trashs.forEach((trash) => {
      trash.addEventListener('click', (e) => {
        setTimeout(() => {
          const item = e.target.closest('.basket__item');
          const idItem = item.getAttribute('id');
          const dish = dishes.find((dish) => dish.id === idItem);
          const circle = document.querySelector('.circle');
          const basketItems = document.querySelectorAll('.basket__item');

          if (basketItems.length === 1) {
            document.querySelector('.basket__bot').classList.remove('open');
            document.querySelector('.empty__basket').classList.add('open');
            document.querySelector('.circle').remove();
          } else {
            totalPrice.textContent = DOLLAR + (totalPrice.textContent.slice(1) - Number(dish.count) * Number(dish.cost.slice(1)));
          }

          circle.textContent -= dish.count;
          dish.count = '0';
          item.remove();

          setDishesToCache();
        });
      });
    });
  }

  isBasketOpened = !isBasketOpened;
});

//Закрытие корзины при расфокусировки(е) корзины
document.addEventListener('click', (e) => {
  if (e.target === basket || e.target.closest('.basket__list') === basketList || !isBasketOpened) {
    return;
  }

  closeBasket();
  isBasketOpened = false;
});
