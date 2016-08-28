block('profile')(
    content()(function () {
        var profile = this.ctx.profile,
            mods = this.ctx.mods;
        return [
            {
                block: 'avatar',
                img: profile.avatar,
                alt: profile.nick
            },
            {
                elem: 'userInfo',
                content: [
                    {
                        block: 'link',
                        mix: {elem: 'name'},
                        url: '/profile/'+profile.nick,
                        content: [
                            profile.userData.firstName + ' ' + profile.userData.lastName,
                            {
                                elem: 'nick',
                                tag: 'span',
                                content: '@' + profile.nick
                            }
                        ]
                    },
                    mods.description ? {
                        elem: 'description',
                        content: profile.userData.description
                    } : '',
                    mods.followInfo ? [
                        {
                            block: 'link',
                            mix: {elem: 'follow'},
                            url: '/profile/'+profile.nick+'/follow',
                            content: 'follow (' + profile.follow.length + ')'
                        },
                        {
                            block: 'link',
                            mix: {elem: 'subscribers'},
                            url: '/profile/'+profile.nick+'/subscribers',
                            content: 'subscribers (' + profile.subscribers.length + ')'
                        },
                        {
                            elem: 'seeds',
                            content: 'seeds (' + profile.seedsCount + ')'
                        }
                    ] : '',
                    mods.subscribeButton ? {
                        block: 'subscribe-button',
                        profile: profile,
                        currentUserId: this.ctx.currentUserId,
                        subscribe: this.ctx.subscribe
                    } : ''
                ]
            }
        ];
    })
);
