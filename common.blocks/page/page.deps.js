({
    shouldDeps: [
        {
            mods: {view: ['404', 'home','profile','seed', 'editProfile', 'addSeed', 'login', 'setupProfile', 'viewProfile', 'viewSeed', 'viewSubscription']}
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
        'seed-list-item',
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
        'events__channels'
    ]
})
