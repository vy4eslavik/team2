block('addSeed').content()(function () {
    return {
        content: [
            {
                block: 'textarea',
                mods: {theme: 'islands', size: 'm', width: 'available'},
                name: 'text',
                attrs: {
                    maxlength: 140,
                    required: true
                },
                placeholder: 'Введите сообщение'
            },
            this.ctx.replyTo ? {
                block: 'input',
                name: 'parent',
                mods: {type: 'hidden'},
                val: this.ctx.replyTo
            } : '',
            {
                block: 'button',
                mods: {theme: 'islands', size: 'm', type: 'submit'},
                type: 'submit',
                text: 'add'
            }
        ]
    }
});
