#team2

Pepo repo

## Запуск базы

Устанавливаем монгу. https://www.mongodb.com/

Windows:
* Создаем папку под базу данных 
    ```
    >mongod --dbpath c:\data\pepo
    ```
* Запускаем его
    ```
    mongod --dbpath c:\data\pepo
    ```
* И пусть работает.

macOS:
* ??????????????

Linux:
* Ubuntu - рекомендуется 12.04 | 14.04 | 16.04
* Инструкция: [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/)
* Особенности Ubuntu 16.04:
  * Для автомтического запуска MongoDB при старте системы, cоздать файл [/lib/systemd/system/mongod.service](https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/#ubuntu-16-04-only-create-systemd-service-file)
  * Выполнить команду  
  ```
     sudo systemctl start mongod
     sudo systemctl enable mongod
  ``` 


## Билд БЭМ
```
enb make
```

## Запуск сайта

```
node server
```

## Заполняем БД фейковые данными

Запускаем 
```
node server/createDB.js
```
Открываем страничку http://localhost:3000/fakedata

На странице http://localhost:3000/tmp-home будет стрингифай того, что лежит в БД с сидами

## Структура базы
```javascript
seeds = {
    id: '',
    msg: '',
    datetime: '',
    parent: '', //Твит на который сделали ответ
    author: '', //authorId
    img: '',
    latlng: {},
    link: {} //id в кэше сниппетов ссылок
};

user = {
    id: '',
    nick: '',
    userData: {
        firstName: '',
        lastName: '',
        aboutMe: ''
    },
    timeZone: '',
    follow: [], //на кого мы подписаны
    subscribers: [] //наши подписчики
}
```

## Роуты
* /
* /login
* /profile/nick
* /home/
* /search/
* /seed/id
* /profile/my
* /signup
* /logout
