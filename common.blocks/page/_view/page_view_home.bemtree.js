block('page').mod('view', 'home').content()(function () {

    var seeds = this.data.seeds || [];
    return [
        {
            block: 'header'
        },
        {
            block: 'profile',
            profile: this.data.profile || ''
        },
        {
            block: 'seed-list',
            attrs: {
                'data-last': seeds[seeds.length-1].datetime.getTime()/1000
            },
            js: true,
            seeds: seeds
        },
        {
            block: 'footer'
        }
    ];
});
