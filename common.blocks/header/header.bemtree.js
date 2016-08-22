
block('header').content()(function() {
    return [
        {
            block: 'layout',
            content: [
                {
                    elem: 'left',
                    content: {
                        block: 'image',
                        url: '/img/pepo.png'
                    }
                },
                {
                    elem: 'right',
                    content:{
                    tag: 'form',
                    attrs: { action: '' },
                    content: [
                        {
                            block: 'input',
                            name: 'text',
                            val: 'Search for seeds'
                        },
                        {
                            block: 'search-icon'
                        }
                    ]
                }

                }
            ]
        },
        {
            block: 'header-menu',
            tag: 'ul'
        }
    ];
});



