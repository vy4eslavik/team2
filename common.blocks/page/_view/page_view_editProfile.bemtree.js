block('page').mod('view', 'editProfile').content()(function() {
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            content: [
                {
                    block: 'content',
                    content: [
                        {
                            block: 'settings-list',
                            //TODO установить action и method для формы
                            attrs: {autocomplete:'on', action: '#'}
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
