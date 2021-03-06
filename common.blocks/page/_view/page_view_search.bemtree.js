block('page').mod('view', 'search').content()(function () {

    var seeds = this.data.seeds || [];
    var users = this.data.users || [];
    var currentUser = this.data.currentUser || {};
    var search = this.data.search || '';

    return [
        {
            block: 'header',
            currentUser: currentUser,
            search: search
        },
        {
            block: 'content',
            content: [
                seeds.length > 0 ? {
                    block: 'seed-list',
                    seeds: seeds,
                    currentUser: currentUser
                } : users.map(function (user) {
                    return {
                        block: 'profile',
                        profile: user,
                        mods: {subscribeButton: true},
                        currentUserId: currentUser._id,
                        subscribe: user.subscribers.indexOf(currentUser._id) >= 0
                    };
                })
            ]
        }
    ];
});
