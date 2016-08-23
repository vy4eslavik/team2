block('seed-list').content()(function() {
    var seeds = this.ctx.seeds;



    return seeds.map(function(item) {
        //var isCurrent = this.data.page.url === item.url,
        //    title = typeof item.title === 'string' ? item.title : item.title[lang];

        return {
            block: 'seed-list-item',
            seed: item
        };
    }, this);


});
