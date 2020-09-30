"use strict"

const userNew = new UserForm();

//loginFormCallback — функция, которая будет выполняться при попытке авторизации
userNew.loginFormCallback = function (data) { 
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } 

        else {
        userNew.setLoginErrorMessage(response.error);
        } 
    } );
}


//registerFormCallback — функция, которая будет выполняться при попытке регистрации
userNew.registerFormCallback = function (data) {
    ApiConnector.register(data, response => {
         if (response.success) {
          location.reload();
         } 
         
         else {
             //Выведите ошибку или обновите страницу
         userNew.setRegisterErrorMessage(response.error);
         //location.reload();
         }
    });
}

//пользователи:
//login: oleg@demo.ru, password: demo
//login: ivan@demo.ru, password: demo
//login: petr@demo.ru, password: demo
//login: galina@demo.ru, password: demo
//login: vladimir@demo.ru, password: demo