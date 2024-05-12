class Header {
  constructor(header, list) {
    this.button = header.querySelector(".header__button");
    this.menu = header.querySelector(".header__nav");
    this.menuButton = header.querySelector(".header__menu-button");
    this.innerList = header.querySelector(".header__inner-list");
    this.menuClose = header.querySelector(".header__nav-cancel");
    this.casesButton = header.querySelector(".header__link-cases");

    this.menuClose.addEventListener("click", () =>
      this.showMenu.call(this.menu)
    );
    document.body.addEventListener("click", (e) => {
      const target = e.target;
      const headerBtns = document.querySelectorAll('.header__button');
      const headerInnerList = document.querySelectorAll('.header__inner-list');


      if(!e.target.closest('.header__inner-list')) {
        headerBtns.forEach(item => {
          item.classList.remove('header__button--active');
          item.style.pointerEvents = 'auto'
      })
      headerInnerList.forEach(item => {
          item.classList.remove('header__inner-list--active');
      })

      }


      if (e.target.closest('.header__button')) {
        e.target.style.pointerEvents = 'none'
        e.target.classList.toggle("header__button--active");
        e.target.nextElementSibling.classList.toggle("header__inner-list--active");
      }else if (
        this.innerList.classList.contains("header__inner-list--active") &&
        !this.searchParent(target, "header__inner-list")
      ) {
        this.button.classList.remove("header__button--active");
        this.innerList.classList.remove("header__inner-list--active");
      }

    });

    this.menuButton.addEventListener("click", () =>
      this.showMenu.call(this.menu)
    );
    if (this.casesButton) {
      this.casesButton.addEventListener("click", () => {
        if (this.menu.classList.contains("header__nav--active")) {
          this.showMenu.call(this.menu);
        }
      });
    }
  }

  searchParent(tag, className) {
    if (!tag) return false;
    if (tag.classList.contains(className)) {
      return true;
    }
    return this.searchParent(tag.parentElement, className);
  }
  showMenu() {
    this.classList.toggle("header__nav--active");
    document.body.classList.toggle("body--overflow");
  }
}
new Header(document.querySelector(".header"));

class Cases {
  constructor(inner) {
    if (!inner) return;
    this.controllersList = inner.querySelector(".cases__list-buttons");
    this.content = inner.querySelector(".cases__content");
    this.controllers = inner.querySelectorAll(".cases__button");
    this.lists = inner.querySelectorAll(".cases__list");
    this.select = inner.querySelector(".cases__list-select");
    this.selectText = inner.querySelector(".cases__select-text");
    this.result = {};
    this.active = {
      button: null,
      list: null,
    };

    this.select.addEventListener("click", () => {
      this.controllersList.classList.toggle("cases__list-buttons--active");
      this.content.classList.toggle("cases__content--opacity");
    });
    this.lists.forEach((list) => (this.result[list.dataset.index] = list));
    this.controllers.forEach((button) => {
      if (button.classList.contains("cases__button--active")) {
        this.active.button = button;
        this.showList(button.dataset.index);
      }
      button.addEventListener("click", () => this.clickButton(button));
    });
  }

  clickButton(button) {
    this.active.button.classList.remove("cases__button--active");
    button.classList.add("cases__button--active");
    this.active.button = button;
    if (this.content.classList.contains("cases__content--opacity"))
      this.content.classList.remove("cases__content--opacity");
    if (this.controllersList.classList.contains("cases__list-buttons--active"))
      this.controllersList.classList.remove("cases__list-buttons--active");
    this.showList(button.dataset.index);
  }

  showList(index) {
    if (this.active.list)
      this.active.list.classList.remove("cases__list--active");
    const list = this.result[index];
    this.selectText.textContent = this.active.button.textContent;
    list.classList.add("cases__list--active");
    this.active.list = list;
  }
}
new Cases(document.querySelector(".cases__inner"));

class Popup {
  constructor(popup) {
    if (!popup) return;
    this.button = document.querySelector(".top__popup-button");
    this.close = popup.querySelector(".top__cancel");
    this.popup = popup;
    this.success = document.querySelector(".top__form-success");

    document.body.addEventListener("click", (e) => {
      const target = e.target;
      if (e.target === this.button) {
        this.popup.classList.add("top__popup--active");
        document.body.classList.add("body--overflow");
      } else if (
        this.searchParent(target, "top__cancel") ||
        target.classList.contains("top__popup")
      ) {
        this.popup.classList.remove("top__popup--active");
        document.body.classList.remove("body--overflow");
        if (this.success.classList.contains("top__form-success--active"))
          this.success.classList.remove("top__form-success--active");
      }
    });
  }

  searchParent(tag, className) {
    if (!tag) return false;
    if (tag.classList.contains(className)) {
      return true;
    }
    return this.searchParent(tag.parentElement, className);
  }
}
new Popup(document.querySelector(".top__popup"));

// class Form {
//   constructor(form) {
//     if (!form) return;
//     for (let i = 0; i < form.length; i++) {
//       let current = form[i];
//       if (this.social && !this.socialTwo) {
//         this.socialTwo = current;
//         continue;
//       }
//       if (current.name) this[current.name] = current;
//     }
//     this.error = form.querySelector(".top__form-error");
//     this.success = document.querySelector(".top__form-success");
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       let name = this.checkLength(this.name);
//       let number = this.checkLength(this.number);
// 		let email = this.checkLength(this.email);


//       let company = this.company ? this.checkLength(this.company) : true;
//       let result = name && number && email;
//       if (result && company) {
//         this.error.textContent = "";
//         this.success.classList.add("top__form-success--active");
//         form.reset();
//       }
//     });
//   }

//   checkLength(input) {
//     if(input) {
//       const parent = input.parentElement;
//       if (input.value.length > 0) {
//         parent.classList.remove("top__form-item--error");
//         return true;
//       }
//       parent.classList.add("top__form-item--error");
//       this.error.textContent = "Пожалуйста, заполните все поля...";
//     }

//   }
// }
// new Form(document.querySelector(".top__form"));

class Timer {
  constructor(timer) {
    if (!timer) return;

    this.localStorageKey = 'timerStartTime';
    this.hours = timer.querySelector(".top__time-hours");
    this.minute = timer.querySelector(".top__time-minute");
    this.second = timer.querySelector(".top__time-second");

    // Получаем время старта из localStorage, если оно есть
    const storedStartTime = localStorage.getItem(this.localStorageKey);
    if (storedStartTime) {
      this.date = new Date(parseInt(storedStartTime, 10));
    } else {
      // Если время старта не сохранено, начинаем отсчет с 3:06:06
      this.date = new Date("1995-12-17T03:06:06");
    }

    // Обновляем таймер каждую секунду
    setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    // Увеличиваем время на одну секунду
    this.date.setSeconds(this.date.getSeconds() - 1);

    // Отображаем новое время на таймере
    this.writeTime(this.hours, this.date.getHours());
    this.writeTime(this.minute, this.date.getMinutes());
    this.writeTime(this.second, this.date.getSeconds());

    // Сохраняем текущее время старта в локальное хранилище
    localStorage.setItem(this.localStorageKey, this.date.getTime().toString());
  }

  writeTime(tag, time) {
    tag.textContent = time < 10 ? "0" + time : time;
  }
}

new Timer(document.querySelector(".top__time"));


const inputField = document.querySelector('.top__form-number');

inputField.addEventListener('input', function(event) {
  let input = event.target.value.replace(/\D/g, ''); // Удаление всех нецифровых символов

  if (input.length > 10) {
    input = input.slice(0, 10); // Ограничение ввода только 10 цифрами
  }

  // Форматирование номера телефона
  let formattedInput = '(' + input.slice(0, 3) + ') ' + input.slice(3, 6) + ' ' + input.slice(6, 8) + ' ' + input.slice(8, 10);

  event.target.value = formattedInput;
});


// Получаем форму
const topForm = document.querySelectorAll('.top__form');
const topFormsuccess = document.querySelector('.top__form-success');


topForm.forEach(item => {
  const company = item[name="company"];
  const email = item[name="email"];
  const userName = item[name="name"];
  const number = item[name="number"];
  const formError = item.querySelector('.top__form-error');
  // Пожалуйста, заполните все поля...

  function validMail(email) {
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  }


  item.addEventListener('submit', (e) => {
    e.preventDefault();
    if(company) {
      if(company.value === '') {
        company.parentElement.classList.add('top__form-item--error');
        formError.textContent = "Пожалуйста, заполните все поля...";
      } else {
        company.parentElement.classList.remove('top__form-item--error');
        formError.textContent = "";
      }
    }

    if(email) {
      if(!validMail(email.value)) {
        email.parentElement.classList.add('top__form-item--error');
        formError.textContent = "Пожалуйста, заполните все поля...";
      } else {
        email.parentElement.classList.remove('top__form-item--error');
        formError.textContent = "";
      }
    }

    if(userName.value === '') {
      userName.parentElement.classList.add('top__form-item--error');
      formError.textContent = "Пожалуйста, заполните все поля...";
    } else {
      userName.parentElement.classList.remove('top__form-item--error');
      formError.textContent = "";
    }

    if(number.value.length < 15) {
      number.parentElement.classList.add('top__form-item--error');
      formError.textContent = "Пожалуйста, заполните все поля...";
    } else {
      number.parentElement.classList.remove('top__form-item--error');
      formError.textContent = "";
    }



  // Отправка формы==========
  if(company !== undefined && email !== undefined) {
    if(company.value && validMail(email.value) && number.value.length == 15 && userName.value) {
      fetchFunc(item);
    }
  } else {
    if(number.value.length == 15 && userName.value) {
      fetchFunc(item);
    }
  }
})
// Конец submit

function fetchFunc(form) {
  // Создаем новый объект FormData, чтобы получить данные формы
  var formData = new FormData(form);

  // Отправляем данные формы на сервер с помощью Fetch API
  fetch('https://marlov.ru/wp-content/themes/marlov/sender.php', {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    // Проверяем статус ответа сервера
    if (response.ok) {
      // Выводим сообщение об успешной отправке данных
      console.log('Данные успешно отправлены.');
      // Показываем окно об успешной отправке
      topFormsuccess.classList.add('top__form-success--active');
    } else {
      // Выводим сообщение об ошибке
      console.error('Ошибка при отправке данных. Пожалуйста, попробуйте позже.');
    }
  })
  .catch(function(error) {
    // Выводим сообщение об ошибке в консоль
    console.error('Произошла ошибка:', error);
  });
}



}) // Конец foreach








// document.addEventListener("DOMContentLoaded", function() {
//   // Получаем форму
//   var form = document.querySelector('.top__form');

//   // Добавляем обработчик события отправки формы
//   form.addEventListener('submit', function(event) {
//     // Отменяем стандартное действие отправки формы
//     event.preventDefault();

//     // Создаем новый объект FormData, чтобы получить данные формы
//     var formData = new FormData(form);

//     // Отправляем данные формы на сервер с помощью Fetch API
//     fetch('https://marlov.ru/wp-content/themes/marlov/sender.php', {
//       method: 'POST',
//       body: formData
//     })
//     .then(function(response) {
//       // Проверяем статус ответа сервера
//       if (response.ok) {
//         // Выводим сообщение об успешной отправке данных
//         console.log('Данные успешно отправлены.');
//         // Показываем окно об успешной отправке
//         topFormsuccess.classList.add('top__form-success--active');
//       } else {
//         // Выводим сообщение об ошибке
//         console.error('Ошибка при отправке данных. Пожалуйста, попробуйте позже.');
//       }
//     })
//     .catch(function(error) {
//       // Выводим сообщение об ошибке в консоль
//       console.error('Произошла ошибка:', error);
//     });
//   });
// });
