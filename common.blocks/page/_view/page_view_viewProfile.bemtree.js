block('page').mod('view', 'viewProfile').content()(function () {
    var profile = this.data.user || false,
        currentUser = this.data.currentUser || {},
        subscribe = profile.subscribers.indexOf(currentUser._id) >= 0,
        seeds = this.data.seeds || [];
    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: [
                {
                    block: 'profile',
                    profile: profile,
                    mods: {followInfo: true, description: true, subscribeButton: true, largeView: true},
                    currentUserId: currentUser._id,
                    subscribe: subscribe
                },
                {
                    block: 'seed-list',
                    seeds: seeds,
                    currentUser: currentUser
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
