block('page').mod('view', 'home').content()(function() {

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
            js: true,
            seeds: seeds
        },
        {
            block: 'footer'
        }
    ];
});
