block('page').mod('view', 'home').content()(function () {

    var seeds = this.data.seeds || [],
        profile = this.data.profile || {};
    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: [
                {
                    block: 'profile',
                    mods: {followInfo: true, description: false, subscribeButton: false},
                    profile: profile
                },
                {
                    block: 'seed-list',
                    attrs: {
                        'data-last': seeds[seeds.length-1].datetime.getTime()/1000
                    },
                    js: true,
                    seeds: seeds
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
