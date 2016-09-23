block('page').mod('view', 'home').content()(function () {

    var seeds = this.data.seeds || [],
        profile = this.data.profile || {},
        currentUser = this.data.currentUser || {};
    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: seeds.length > 0 ? {
                block: 'seed-list',
                attrs: (seeds && seeds.length) ? {
                    'data-oldest': seeds[seeds.length - 1].datetime.getTime() / 1000,
                    'data-last': seeds[0].datetime.getTime() / 1000
                } : '',
                js: true,
                seeds: seeds,
                currentUser: currentUser
            } : {
                block: 'content',
                content: [
                    {
                        elem: 'hello-world',
                        content: [
                            'Привет, ' + profile.userData.firstName + '!',
                            {
                                elem: 'br',
                                tag: 'br'
                            },
                            'На твоей главной странице пусто, потому, ' +
                            'что у тебя нет подписок и сидов. Подпишись на кого-нибудь: ',
                            {
                                block: 'link',
                                url: '/profiles',
                                mods: {theme: 'islands', size: 'l'},
                                content: 'Список профилей'
                            }
                        ]
                    }
                ]

            }
        },
        {
            block: 'footer'
        }
    ];
});
