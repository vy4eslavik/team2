block('seed-list').content()(function () {
    var seeds = this.data.seeds;
    

    return seeds.map(function (item) {
        return {
            block: 'seed-list-item',
            seed: item
        };
    }, this);


});
