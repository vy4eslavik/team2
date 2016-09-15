block('settings-list').content()(function () {
    var profileSettings = this.ctx.profileSettings,
        userPath = this.ctx.userPath,
        saveInfo = '';

    if (this.ctx.formSave === 'done') {
        saveInfo = 'Изменения успешно сохранены';
    } else if (this.ctx.formSave === 'error') {
        saveInfo = 'Упс! Произошла ошибка';
    }

    var timeZones = [
        {
            text: '(GMT-03:00) Buenos Aires',
            val: -10800
        },
        {
            text: '(GMT) UTC',
            val: 0
        },
        {
            text: '(GMT+01:00) London',
            val: 3600
        },
        {
            text: '(GMT+02:00) Budapest',
            val: 7200
        },
        {
            text: '(GMT+03:00) Moscow',
            val: 10800
        }
    ];

    /*timeZones.forEach(function (item) {
        selectTimeZone.options.push(
            {
                val: item.offset,
                text: item.name
            }
        );
    });*/

    return [
        {
            elem: 'form-save',
            content: saveInfo
        },
        {
            elem: 'avatar-edit',
            content: [
                {
                    block: 'avatar',
                    img: profileSettings.avatar,
                    alt: profileSettings.nick,
                    mods: {largeView: true},
                    mix: {block: 'settings-list', elem: 'avatar-image'}
                }
            ]
        },
        {
            block: 'attach',
            name: 'newAvatar',
            id: 'newAvatar',
            accept: 'image/jpeg,image/png',
            mods: {preview: 'image'}
        },
        {
            elem: 'nick',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'editNick'},
                    content: 'Никнейм'
                },
                {
                    block: 'input',
                    name: 'nick',
                    val: profileSettings.nick,
                    id: 'editNick',
                    tabIndex: 1,
                    required: true,
                    notification: userPath,
                    mods: {theme: 'islands', size: 'l', disabled: true}
                }
            ]
        },
        {
            elem: 'first-name',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'editFirstName'},
                    content: 'Имя'
                },
                {
                    block: 'input',
                    name: 'firstName',
                    val: profileSettings.userData.firstName,
                    id: 'editFirstName',
                    tabIndex: 2,
                    mods: {theme: 'islands', size: 'l'}
                }
            ]
        },
        {
            elem: 'last-name',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'editLastName'},
                    content: 'Фамилия'
                },
                {
                    block: 'input',
                    name: 'lastName',
                    val: profileSettings.userData.lastName,
                    id: 'editLastName',
                    tabIndex: 3,
                    mods: {theme: 'islands', size: 'l'}
                }
            ]
        },
        {
            elem: 'time-zone',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'editTimeZone'},
                    content: 'Часовой пояс'
                },
                {
                    block: 'select',
                    mods: {mode: 'radio', theme: 'islands', size: 'l'},
                    name: 'timeZone',
                    id: 'editTimeZone',
                    val: profileSettings.timeZone,
                    options: timeZones
                }
            ]
        },
        {
            elem: 'about-me',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'editAboutMe'},
                    content: 'О себе'
                },
                {
                    block: 'textarea',
                    name: 'aboutMe',
                    val: profileSettings.userData.description,
                    id: 'editAboutMe',
                    tabIndex: 4,
                    mods: {theme: 'islands', size: 'l'}
                }
            ]
        },
        {
            block: 'button',
            name: 'userId',
            val: profileSettings.id,
            text: 'Сохранить',
            id: 'saveProfile',
            tabIndex: 5,
            mods: {theme: 'islands', size: 'l', type: 'submit'}
        }
    ];

});
