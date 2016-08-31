#team2

Репозиторий

## Запуск базы

Устанавливаем монгу. https://www.mongodb.com/

Windows:
* Создаем папку под базу данных
    ```
    > mkdir c:\data\pepo
    ```
* Запускаем его
    ```
    > mongod --dbpath c:\data\pepo
    ```



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
nodemon server
```

## Демо
http://pepo.herokuapp.com
