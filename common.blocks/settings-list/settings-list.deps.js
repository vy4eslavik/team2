[
    {
    shouldDeps: [
        {
            block: 'attach',
            mods: {preview: 'image'}
        },
        {
            block: 'select',
            mods: {
                mode: 'radio',
                theme: 'islands',
                size: 'l'
            }
        },
        {
            block: 'input',
            mods: {
                theme: 'islands',
                size: 'l',
                disabled: true
            }
        },
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 'l'
            }
        },
        {
            block: 'events',
            elem: 'channels',
        },
        'avatar', 'label']
    },
    {
        tech: 'js',
        mustDeps: [
            {
                block: 'avatar',
                tech: 'bemhtml'
            }
        ]
    }
]
