block('page').mod('view', 'home').content()(function() {

    var seeds = this.data.seeds || [];
    return [
        {
            block: 'header'
        },
        {
          block: 'profile'
        },
        {
            block: 'seed-list',
            seeds: seeds
        },
        {
            block: 'footer'
        }
    ];
});
