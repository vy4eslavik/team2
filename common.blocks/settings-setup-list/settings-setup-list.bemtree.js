block('settings-setup-list').content()(function () {
    var profileSettings = this.ctx.profileSettings;
    var userPath = this.ctx.userPath;
    var formSave = {
        elem: 'form-save'
    };
    if(this.ctx.formSave === 'done'){
        formSave.content = 'Изменения успешно сохранены';
    }else if(this.ctx.formSave === 'errorexists'){
        formSave.content = 'Упс! Такой ник занят';
    }else if(this.ctx.formSave === 'error'){
        formSave.content = 'Упс! Произошла ошибка';
    }

    return [
        formSave,
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
                    val: '',
                    id: 'editNick',
                    tabIndex: 1,
                    required: true,
                    notification: userPath,
                    mods: {theme: 'islands', size: 'l', disabled: false}
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
