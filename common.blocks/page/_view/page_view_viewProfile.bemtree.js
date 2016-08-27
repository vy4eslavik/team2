block('page').mod('view', 'viewProfile').content()(function() {

    var userInfo = this.data.user || false;
    var subscribe = this.data.subscribe || false;
    var seeds = this.data.seeds || [];
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            content:[
                {
                    block: 'content',
                    content:
                    {
                        block: 'view-profile',
                        userInfo: userInfo,
                        subscribe: subscribe
                    }
                },
                {
                    block: 'seed-list',
                    seeds: seeds
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
