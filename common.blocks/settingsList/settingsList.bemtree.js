block('settingsList').content()(function () {
    var user = {
        nick: 'vy4eslavik',
        userData: {
            firstName: 'Вячеслав',
            lastName: 'Ляутин',
            aboutMe: 'Всё хорошо'
        },
        timezone: '',
        follow: [],
        subscribers: []
    };
    return [
        //TODO Добавить блок аватар когда он будет
        {
            elem: 'label',
            tag: 'label',
            attrs: {'for': 'editFirstName'},
            content: 'Имя'
        },
        {
            block: 'input',
            name: 'firstName',
            val: user.userData.firstName,
            id: 'editFirstName',
            tabIndex: 1,
            mods: {theme: 'islands', size: 'm'}
        },
        {
            elem: 'label',
            tag: 'label',
            attrs: {'for': 'editLastName'},
            content: 'Фамилия'
        },
        {
            block: 'input',
            name: 'lastName',
            val: user.userData.lastName,
            id: 'editLastName',
            tabIndex: 2,
            mods: {theme: 'islands', size: 'm'}
        },
        {
            elem: 'label',
            tag: 'label',
            attrs: {'for': 'editAboutMe'},
            content: 'О себе'
        },
        {
            block: 'textarea',
            name: 'aboutMe',
            val: user.userData.aboutMe,
            id: 'editAboutMe',
            tabIndex: 3,
            mods: {theme: 'islands', size: 'xl',  width: 'available'},
            attrs: {cols: '33', rows: '4'}
        },
        {
            block: 'button',
            name: 'saveProfile',
            val: user.nick,
            text: 'Сохранить',
            id: 'saveProfile',
            tabIndex: 4,
            mods: {theme: 'islands', size: 'm', type: 'submit'}
        }
    ];
});