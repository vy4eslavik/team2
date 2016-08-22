block('page').mod('view', 'viewProfile').content()(function() {

    var userInfo = this.data.user || '';
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
                        userInfo: userInfo
                    }
                },
                {
                    block: 'seed-list',
                    seeds: []
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
