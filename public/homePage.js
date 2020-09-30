"use strict"

//Реализация страницы «Личный кабинет пользователя»

//Выход из личного кабинета
const logoutButton = new LogoutButton(); //


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
const errorMessageBlock = new errorMessageBlock(); //класс с сообщением

function getStocks () { 
  ApiConnector.getStocks (response => {
    if (response.success) {
      rates.clearTable();
      rates.fillTable(response.data);
    }
    
    else {
      rates.errorMessageBlock(response.error);
  }
  })
}

getStocks ();
setInterval (getStocks, 60000);

//setTimeout(ApiConnector.getStocks(response => {
    //if (response.success) {
      //rates.clearTable();
     // rates.fillTable(response.data);
   // }
 //}), 60000);

//setInterval(ApiConnector.getStocks(response => {
    //if (response.success) {
      //rates.clearTable();
      //rates.fillTable(response.data);
  //}
//}), 60000);


//Операции с деньгами
const money = new MoneyManager();

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        return money.setMessage(true, 'Operation completed successfully');
      }
      return money.setMessage(false, 'Server error: Re-submit the form');
    })
  }

        //Реализуйте пополнение баланса:
        money.addMoneyCallback = (data) => {
            ApiConnector.addMoney(data, response => {
                if (response.success) {
                ProfileWidget.showProfile(response.data);
                return money.setMessage(true, 'Operation completed successfully');
                }
                return money.setMessage(false, 'Server error: Re-submit the form');
            })
        }

        //Реализуйте конвертирование валюты:
        money.conversionMoneyCallback = (data) => {
            ApiConnector.convertMoney(data, response => {
                if (response.success) {
                  ProfileWidget.showProfile(response.data);
                  return money.setMessage(true, 'Operation completed successfully');
                }
                return money.setMessage(false, 'Server error: Re-submit the form');
              })
        }

        //Реализуйте перевод валюты:
        money.sendMoneyCallback = (data) => {
            ApiConnector.transferMoney(data, response => {
                if (response.success) {
                  ProfileWidget.showProfile(response.data);
                  return money.setMessage(true, 'Operation completed successfully');
                }
                return money.setMessage(false, 'Server error: Re-submit the form');
              })
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
