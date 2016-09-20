/**
 * Created by Yulia on 01.09.16.
 */


block('page').mod('view', 'viewProfiles').content()(function () {

    var profiles = this.data.users || [],
        currentUserId = this.data.currentUserId || '';

    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: profiles.map(function (profile) {
                if (profile) {
                    var subscribe = profile.subscribers ? profile.subscribers.indexOf(currentUserId) >= 0 : false;
                    if (!profile.userData.lastName) profile.userData.lastName = '';
                    return {
                        block: 'profile',
                        profile: profile,
                        mods: {followInfo: true, description: true, subscribeButton: true},
                        currentUserId: currentUserId,
                        subscribe: subscribe
                    };
                }

            })
        },
        {
            block: 'footer'
        }
    ];
});

