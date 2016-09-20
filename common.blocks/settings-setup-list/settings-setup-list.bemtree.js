block('settings-setup-list').content()(function () {
    var profileSettings = this.ctx.profileSettings;
    var userPath = this.ctx.userPath;
    userPath.replace(/\//g,"/<wbr>");
    // userPath = "http:/<wbr>/<wbr>localhost:3000/<wbr>profile/<wbr>vy4eslavik";
    var formSave = {
        elem: 'form-save'
    };
    if(this.ctx.formSave === 'done'){
        formSave.content = 'Изменения успешно сохранены';
    }else if(this.ctx.formSave === 'errorexists'){
        formSave.content = 'Упс! Такой ник занят';
    }else if(this.ctx.formSave === 'errornoformat'){
        formSave.content = 'Упс! Ник должен состоять только из английский знаков, цифр';
    }else if(this.ctx.formSave === 'error'){
        formSave.content = 'Упс! Произошла ошибка';
    }

    return [
        formSave,
        profileSettings.nick.indexOf('should-change-') > -1 ? {
            'block': 'content',
            'content': 'Для окончания регистрации вы должны выбрать ник'
        } : {
            'block': 'content',
            'content': 'Теперь вы можете пользоваться всеми функциями'
        },
        {
            elem: 'nick',
            content: [
                {
                    block: 'label',
                    attrs: {'for': 'editNick'},
                    content: 'Никнейм'
                },
                profileSettings.nick.indexOf('should-change-') > -1 ? {
                    block: 'input',
                    name: 'nick',
                    val: '',
                    id: 'editNick',
                    tabIndex: 1,
                    required: true,
                    mods: {theme: 'islands', size: 'l', disabled: false}
                } : {
                    block: 'input',
                    name: 'nick',
                    val: profileSettings.nick,
                    id: 'editNick',
                    tabIndex: 1,
                    required: true,
                    notification: 'Адрес вашей страницы: ' + userPath,
                    mods: {theme: 'islands', size: 'l', disabled: true}
                }
            ]
        },
        profileSettings.nick.indexOf('should-change-') > -1 ? {
            block: 'button',
            name: 'userId',
            val: profileSettings.id,
            text: 'Сохранить',
            id: 'saveProfile',
            tabIndex: 5,
            mods: {theme: 'islands', size: 'l', type: 'submit'}
        } : ''
    ];

});
