block('profile')(
    js()(function () {
        return {
            subscribers: this.ctx.profile ? this.ctx.profile.subscribers.length : 0
        };
    }),
    content()(function () {
        var profile = this.ctx.profile || false,
            mods = this.ctx.mods || false;
        if (!profile) {
            return 'Упс. Профиль не загрузился';
        }
        var firstName = profile.userData.firstName? profile.userData.firstName : '';
        var lastName = profile.userData.lastName? profile.userData.lastName : '';
        var name = firstName + ' ' + lastName;
        return [
            {
                block: 'link',
                mix: {block: 'profile', elem: 'link'},
                url: '/profile/' + profile.nick,
                content: [
                    {
                        block: 'avatar',
                        img: profile.avatar,
                        alt: profile.nick,
                        width: 80,
                        height: 80,
                        mods: {largeView: mods.largeView},
                        mix: {block: 'profile'},
                    },
                    {
                        elem: 'username',
                        tag: 'span',
                        content: name
                    },
                    {
                        elem: 'nick',
                        mix: {block: 'profile', elem: 'nick'},
                        tag: 'span',
                        content: ' @' + profile.nick
                    },
                    mods.description && profile.userData.description ? {
                        elem: 'description',
                        mix: {block: 'profile', elem: 'description'},
                        content: profile.userData.description
                    } : '',
                    mods.subscribeButton && !mods.followInfo? {
                        block: 'subscribe-button',
                        profile: profile,
                        currentUserId: this.ctx.currentUserId,
                        subscribe: this.ctx.subscribe
                    } : ''
                ]
            },
            mods.followInfo ? [
                {
                    elem: 'statistics',
                    content: [
                        {
                            block: 'link',
                            mix: {block: 'profile', elem: 'follow'},
                            url: '/profile/'+profile.nick+'/follow',
                            content: 'подписки (' + profile.follow.length + ')'
                        },
                        {
                            block: 'link',
                            mix: {block: 'profile', elem: 'subscribers'},
                            url: '/profile/'+profile.nick+'/subscribers',
                            content: 'подписчики (' + profile.subscribers.length + ')'
                        },
                        {
                            elem: 'seeds',
                            content: 'сиды (' + profile.seedsCount + ')'
                        }
                    ]
                }
            ] : '',
            mods.subscribeButton && mods.followInfo ? {
                block: 'subscribe-button',
                profile: profile,
                currentUserId: this.ctx.currentUserId,
                subscribe: this.ctx.subscribe
            } : ''
        ];
    })
);
