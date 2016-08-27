block('view-profile')(
    content()(function () {
        var userInfo = this.ctx.userInfo,
            currentUser = this.ctx.currentUser;
        return [
            {
                block: 'avatar',
                img: '../../' + userInfo.avatar,
                alt: userInfo.nick
            },
            {
                elem: 'userInfo',
                content: [
                    {
                        elem: 'name',
                        content: userInfo.userData.firstName + ' ' + userInfo.userData.lastName
                    },
                    {
                        elem: 'nick',
                        content: '@' + userInfo.nick
                    },
                    {
                        elem: 'follow',
                        content: 'follow (' + userInfo.follow.length + ')'
                    },
                    {
                        elem: 'subscribers',
                        content: 'subscribers (' + userInfo.subscribers.length + ')'
                    }
                ]
            },
            {
                elem: 'description',
                content: userInfo.userData.description
            },
            button,
            {
                block: 'subscribe-button',
                userInfo: userInfo,
                currentUser: currentUser
            },
            {
                elem: 'hr',
                tag: 'hr'
            }
        ];
    })
);
