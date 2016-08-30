block('seed-list').content()(function () {
    var seeds = this.ctx.seeds;
console.log(seeds);
    return seeds.map(function (item) {
        return {
            block: 'seed-list-item',
            seed: item
        };
    }, this);


});
