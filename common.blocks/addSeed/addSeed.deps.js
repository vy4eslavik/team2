[
    {
        shouldDeps: [
            {
                block: 'textarea',
                mods: {
                    theme: 'islands',
                    size: 'm',
                    width: 'available'
                }
            },
            {
                block: 'input',
                mods: {
                    type: 'hidden'
                }
            },
            {
                block: 'attach',
                mods: {
                    theme: 'islands',
                    size: 'l',
                    preview: 'image'
                }
            },
            {
                block: 'clearfix'
            },
            {
                block: 'events',
                elem: 'channels',
            }
        ]
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
