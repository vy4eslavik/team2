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
                            block: 'settingsList',
                            tag: 'form',
                            //TODO установить action и method для формы
                            attrs: {autocomplete:'on'}
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
