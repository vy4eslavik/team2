block('subscribe-button')(
    js()(function () {
        return {
            subscribers: this.ctx.userInfo.subscribers.length,
            userId: this.ctx.userInfo.id
        };
    }),
    content()(function () {
        var userInfo = this.ctx.userInfo,
            currentUser = this.ctx.currentUser,
            button = {
                block: 'button',
                mix: {elem: 'subscribe'},
                mods: {theme: 'islands', size: 'l'},
                text: this.ctx.subscribe ? 'Отписаться' : 'Подписаться'
            };

        if (currentUser === userInfo.id) {
            button.mods.type = 'link';
            button.url = '/profile/my';
            button.mix = {};
            button.text = 'Редактировать профиль';
        }
        return button;
    })
);
