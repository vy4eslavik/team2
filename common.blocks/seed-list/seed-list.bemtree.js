block('seed-list').content()(function() {
    var seeds = this.ctx.seeds;



    return seeds.map(function(item) {
        //var isCurrent = this.data.page.url === item.url,
        //    title = typeof item.title === 'string' ? item.title : item.title[lang];

        return {
            elem: 'item',
            content: [
                {
                    block : 'avatar',
                    img: item.author_ava,
                    mix: { block : 'seed-list', elem: 'avatar' }
                },
                'My Seed'
            ]
        };
    }, this);


});
