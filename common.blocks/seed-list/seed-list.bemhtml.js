block('seed-list')(
    js()(function () {
        return {
            currentUser: this.ctx.currentUser
        };
    }),
    content()(function () {
        var seeds = this.ctx.seeds;

        return seeds.map(function (item) {
            return {
                block: 'seed-list-item',
                mods: item.current ? {item: 'current'} : {},
                seed: item,
                currentUser: this.ctx.currentUser
            };
        }, this);
    })
);
