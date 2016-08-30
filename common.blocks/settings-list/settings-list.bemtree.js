block('settings-list').content()(function () {
    var profileSettings = this.ctx.profileSettings;
    var userPath = this.ctx.userPath;
    var formSave = {
        elem: 'form-save'
    };
    if(this.ctx.formSave === 'done'){
        formSave.content = 'Изменения успешно сохранены';
    }else if(this.ctx.formSave === 'error'){
        formSave.content = 'Упс! Произошла ошибка';
    }

    var timeZones = [
        {
            name: '(GMT-03:00) Buenos Aires',
            value: 'Buenos Aires',
            offset: -10800
        },
        {
            name: '(GMT) UTC',
            value: 'UTC',
            offset: 0
        },
        {
            name: '(GMT+01:00) London',
            value: 'London',
            offset: 3600
        },
        {
            name: '(GMT+02:00) Budapest',
            value: 'Budapest',
            offset: 7200
        },
        {
            name: '(GMT+03:00) Moscow',
            value: 'Moscow',
            offset: 10800
        }
    ];

    var selectTimeZone = {
        block: 'select',
        mods: { mode : 'radio', theme : 'islands', size : 'l' },
        name: 'timeZone',
        id: 'editTimeZone',
        val: profileSettings.timeZone,
        options: []
    };

    timeZones.forEach(function (item) {
        selectTimeZone.options.push(
            {
                val: item.offset,
                text: item.name
            }
        );
    });

    return [
        formSave,
        {
            elem: 'avatar-edit',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'newAvatar'},
                    content: {
                        block: 'avatar',
                        img: profileSettings.avatar,
                        alt: profileSettings.nick
                    }
                },
                {
                    block: 'attach',
                    name: 'newAvatar',
                    id: 'newAvatar',
                    accept: 'image/jpeg,image/png',
                    mods: { theme: 'islands', size: 'l'},
                    button: 'Новый аватар'
                }
            ]
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
                selectTimeZone
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
