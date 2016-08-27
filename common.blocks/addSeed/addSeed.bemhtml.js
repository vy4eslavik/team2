/**
 * Created by admin on 20.08.16.
 */


block('addSeed')(
    tag()('form'),
    attrs()(function() {
        return {action: '/seed/add', method: 'POST'};
    }),
    content()(function() {
        return [
            {
                block: 'textarea',
                mods: {theme: 'islands', size: 'm', width : 'available'},
                name: 'text',
                attrs: {
                    maxlength: 140,
                    required: true
                },
                placeholder: 'Введите сообщение'
            },
            {
                block: 'button',
                mods: {theme: 'islands', size: 'm', type: 'submit'},
                type: 'submit',
                text: 'add'
            }
        ];
    })
);
