block('page').mod('view', 'viewProfile').content()(function () {
    var userInfo = this.data.user || false;
    var subscribe = this.data.subscribe || false;
    var seeds = this.data.seeds || [];
    var currentUser = this.data.currentUser || '';
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
                        subscribe: subscribe,
                        currentUser: currentUser
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
