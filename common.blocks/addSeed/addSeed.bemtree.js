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
                placeholder: 'О чём будет сид?'
            },
            {
                block: 'preview'
            },
            this.ctx.replyTo ? {
                block: 'input',
                name: 'parent',
                mods: {type: 'hidden'},
                val: this.ctx.replyTo
            } : '',
            {
                block: 'button',
                mods: {theme: 'islands', size: 'l', type: 'submit'},
                type: 'submit',
                text: 'Написать'
            },
            {
                block: 'attach',
                name: 'image',
                id: 'attachImage',
                accept: 'image/gif,image/jpeg,image/jpg,image/png',
                mods: { theme: 'islands', size: 'l', preview: 'image'},
                button: {
                    block: 'button',
                    icon: {
                        block: 'icon',
                        url: '/img/icon-camera.svg'
                    }
                }
            }
        ]
    }
});
