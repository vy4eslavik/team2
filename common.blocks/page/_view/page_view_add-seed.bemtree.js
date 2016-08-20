/**
 * Created by admin on 13.08.16.
 */

block('page').mod('view', 'add-seed').content()(function() {
            return [
                {
                    block: 'header'
                },
                {
                    block: 'hello',
                    content: {
                        tag: 'form',
                        attrs: {action: '/seed/add', method: 'POST'},
                        content: [
                            {
                                elem: 'greeting',
                                content: 'Add test message!'
                            },
                            {
                                block: 'input',
                                mods: {theme: 'islands', size: 'm'},
                                name: 'name',
                                placeholder: 'Please enter name'
                            },
                            {
                                block: 'input',
                                mods: {theme: 'islands', size: 'm'},
                                name: 'text',
                                placeholder: 'Please select text'
                            },
                            {
                                block: 'button',
                                mods: {theme: 'islands', size: 'm', type: 'submit'},
                                type: 'submit',
                                text: 'add'
                            }
                        ]
                    }
                },
                {
                    block: 'footer'
                }
            ]
});
