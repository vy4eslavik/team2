block('seed-list').content()(function() {
    var seeds = this.ctx.seeds;



    return seeds.map(function(item) {
        return {
            block: 'seed-list-item',
            seed: item
        };
    }, this);


});
