block('view-profile')(
    js()(true),
    content()(function () {
    var userInfo = this.ctx.userInfo;
    var subscribeText = this.ctx.subscribe ? 'Отписаться' : 'Подписаться' ;
    if(!userInfo){ return 'Упс! Произошла ошибка!'; }
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
            block: 'button',
            mix: {elem: 'subscribe'},
            mods: { theme: 'islands', size: 'l' },
            text: subscribeText
        },
        {
            elem: 'hr',
            tag: 'hr'
        }
    ];
    })
);
