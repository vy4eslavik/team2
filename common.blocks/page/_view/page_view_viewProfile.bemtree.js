block('page').mod('view', 'viewProfile').content()(function () {
    var profile = this.data.user || false,
        currentUserId = this.data.currentUserId || '',
        subscribe = profile.subscribers.indexOf(currentUserId) >= 0,
        seeds = this.data.seeds || [];
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            content: [
                {
                    block: 'content',
                    content: [
                        {
                        block: 'profile',
                        profile: profile,
                        mods: {followInfo: true, description: true, subscribeButton: true},
                        currentUserId: currentUserId,
                        subscribe: subscribe
                        },
                        {
                            block: 'seed-list',
                            seeds: seeds
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
