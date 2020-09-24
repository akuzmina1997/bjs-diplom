"use strict"

//Реализация страницы «Личный кабинет пользователя»

//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = function () {
     ApiConnector.logout(response => {
          if (response.success) {
               location.reload();
          } 
     });
}

//Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
  });

//Получение текущих курсов валюты
const rates = new RatesBoard();


//Операции с деньгами
const money = new MoneyManager();

//Реализуйте пополнение баланса:
money.addMoneyCallback = (data) => {
}
//Реализуйте конвертирование валюты:
money.conversionMoneyCallback = (data) => {
}
//Реализуйте перевод валюты:
money.sendMoneyCallback = (data) => {
}

//Работа с избранным
let favorites = new FavoritesWidget;

ApiConnector.getFavorites( (response) => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data);
    }
})

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(response.success, `Добавление пользователя ${data.name}`)
        }

        else
            favorites.setMessage(response.success, response.error)
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(response.success, `Удаление пользователя №${data}`)
        }

        else
            favorites.setMessage(response.success, response.error)
    })
}
