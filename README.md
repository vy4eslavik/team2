#team2

Pepo repo

## Запуск базы

Устанавливаем монгу. https://www.mongodb.com/

Создаем папку под базу данных
```
windows:
>mongod --dbpath c:\data\pepo

mac:
??????????????

Linux:
??????????????
```

Запускаем его
```
mongod --dbpath c:\data\pepo
```
И пусть работает.

## Билд БЭМ
```
enb make
```

## Запуск сайта

```
node server
```

## Заполняем БД фейковые данными

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
        firstName: ''
        //...
    },
    timeZone: '',
    follow: [], //на кого мы пописаны
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
