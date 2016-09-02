block('subscribe-button')(
    js()(function () {
        return {
            userId: this.ctx.profile.id,
            userNick: this.ctx.profile.nick
        };
    }),
    content()(function () {
        var userId = this.ctx.profile.id,
            currentUserId = this.ctx.currentUserId,
            button = {
                block: 'button',
                mix: {block: 'subscribe-button', elem: 'subscribe'},
                mods: {theme: 'islands', size: 'l'},
                text: this.ctx.subscribe ? 'Отписаться' : 'Подписаться'
            };

        if (currentUserId === userId) {
            button.mix.elem = 'edit-profile';
            button.text = 'Редактировать профиль';
        }
        return button;
    })
);
