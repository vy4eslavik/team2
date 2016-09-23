({
    shouldDeps: [
        {
            mods: {view: ['404', 'home','seed', 'editProfile', 'addSeed', 'login', 'setupProfile', 'viewProfile', 'viewProfiles', 'viewSeed', 'viewSubscription', 'search']}
        },
        'header',
        'body',
        'footer',
        'layout',
        'image',
        'button',
        'search-icon',
        'header-menu',
        'header-hamburger-menu',
        'header-notification',
        'seed-list',
        'body',
        'content',
        'settings-list',
        'settings-setup-list',
        'profile',
        {
            block: 'seed-list-item',
            mods: {item: 'current'}
        },
        {   block : 'input',
            mods : { theme: 'islands', size : 'm' }
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'm', type : 'submit' }
        },
        'login',
        'select',
        'addSeed',
        'events__channels',
        {
            block: 'link',
            mods: {
                theme: 'islands',
                size: 'l'
            }
        },
        'preview-url'
    ]
})
