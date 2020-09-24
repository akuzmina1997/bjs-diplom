"use strict"

const userNew = new UserForm();

//loginFormCallback — функция, которая будет выполняться при попытке авторизации
userNew.loginFormCallBack = function (data) { 
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } 

        else {
        newUser.setLoginErrorMessageBox(response.error);
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
         newUser.setRegisterErrorMessage(response.error);
            location.reload();
         }
    });
}

//пользователи:
//login: oleg@demo.ru, password: demo
//login: ivan@demo.ru, password: demo
//login: petr@demo.ru, password: demo
//login: galina@demo.ru, password: demo
//login: vladimir@demo.ru, password: demo