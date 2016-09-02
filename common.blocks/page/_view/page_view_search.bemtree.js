block('page').mod('view', 'search').content()(function() {

    var seeds = this.data.seeds || [];
    var profile = this.data.profile || {};

    console.log(seeds); 
    return [
        {
            block: 'header'
        },
        /*{
          block: 'profile',
          profile: this.data.profile || ''
        },*/
        {
            block: 'seed-list',
            seeds: seeds
        }
    ];
});
