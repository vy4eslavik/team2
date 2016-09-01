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
                    block: 'seed-list',
                    attrs: (seeds && seeds.length) ? {
                        'data-last': seeds[seeds.length-1].datetime.getTime()/1000
                    } : '',
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
