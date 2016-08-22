({
    shouldDeps: [
        {
            mods: { view: ['404', 'home','profile','seed', 'editProfile', 'addSeed'] }
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
        {   block : 'input',
            mods : { theme: 'islands', size : 'm' }
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'm', type : 'submit' }
        }
    ]
})
