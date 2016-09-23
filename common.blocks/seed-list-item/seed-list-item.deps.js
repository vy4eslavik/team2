/**
 * Created by Yulia on 26.08.16.
 */


[
    {

        mustDeps: {block: 'i-bem', elems: ['dom', 'i18n']},
        shouldDeps: [
            'followed-unfollowed', 'profile', 'moment', 'preview-url',
            {
                block: 'popup',
                mods: {
                    theme: 'islands',
                    target: 'anchor',
                    autoclosable: true
                }
            },
            {
                block: 'button',
                mods: {
                    theme: 'islands',
                    size: 'm',
                    type: 'link',
                    view: 'action',
                    disabled: true
                }
            }
        ]
    }
]
