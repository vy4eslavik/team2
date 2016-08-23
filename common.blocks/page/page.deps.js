({
    shouldDeps: [
        {
            mods: { view: ['404', 'home','profile','seed', 'editProfile', 'addSeed','login'] }
        },
        'header',
        'body',
        'footer',
        'layout',
        'image',
        'button',
        'search-icon',
        'header-menu',
        'seed-list',
        'body',
        'content',
        'settings-list',
        'profile',
        'seed-list-item',
        {   block : 'input',
            mods : { theme: 'islands', size : 'm' }
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'm', type : 'submit' }
        },
        'login'
    ]
})
