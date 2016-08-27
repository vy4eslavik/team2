block('view-profile')(
    content()(function () {
        var userInfo = this.ctx.userInfo,
            currentUser = this.ctx.currentUser,
            button = {
                block: 'button',
                mix: {block: 'view-profile', elem: 'subscribe'},
                mods: {theme: 'islands', size: 'l'},
                text: this.ctx.subscribe ? 'Отписаться' : 'Подписаться'
            };
        if (!userInfo) {
            return 'Упс! Произошла ошибка!';
        }
        if (currentUser === userInfo.id) {
            button.mods.type = 'link';
            button.url = '/profile/my';
            button.mix = {};
            button.text = 'Редактировать профиль';
        }
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
                elem: 'hr',
                tag: 'hr'
            }
        ];
    })
);
