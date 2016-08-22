/**
 * Created by admin on 20.08.16.
 */

block('addSeed').content()(function() {
    return {
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
});
