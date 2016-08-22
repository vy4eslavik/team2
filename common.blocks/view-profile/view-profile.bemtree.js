block('view-profile').content()(function () {
    var userInfo = this.ctx.userInfo;
    return [
        {
            block: 'avatar',
            img: '../../'+userInfo.avatar,
            alt: userInfo.nick
        },
        {
            elem: 'userInfo',
            content: [
                {
                    elem: 'name',
                    content: userInfo.userData.firstName+' '+userInfo.userData.lastName
                },
                {
                    elem: 'nick',
                    content: '@'+userInfo.nick
                },
                {
                    elem: 'follow',
                    content: 'follow ('+userInfo.follow.length+')'
                },
                {
                    elem: 'subscribers',
                    content: 'subscribers ('+userInfo.subscribers.length+')'
                }
            ]
        },
        {
            elem: 'description',
            content: userInfo.userData.description
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'l' },
            text : 'Подписаться'
        },
        {
            elem: 'hr',
            tag: 'hr'
        }
    ];
});
