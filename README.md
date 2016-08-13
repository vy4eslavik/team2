#team2

Pepo repo

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
