block('page').mod('view', 'viewSubscription').content()(function () {
    var profiles = this.data.profiles || [],
        currentUserId = this.data.currentUserId || '';

    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: profiles.map(function (profile) {
                return {
                    block: 'profile',
                    mods: {subscribeButton: true},
                    profile: profile,
                    subscribe: profile.subscribeState,
                    currentUserId: currentUserId
                };
            }, this)
        }
    ];
});
