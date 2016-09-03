block('header-hamburger-menu').content()(function () {
    var currentUser = this.ctx.currentUser || false;
    return [
        {
            elem: 'checkbox',
            tag: 'input',
            attrs: {
                type: 'checkbox',
                id: 'hamburger'
            }
        },
        {
            elem: 'label',
            tag: 'label',
            attrs: {
                for: 'hamburger'
            }
        },
        {
            block: 'dropdown-menu',
            tag: 'ul',
            content: [
                currentUser.nick ? [
                        {
                        elem: 'item',
                        tag: 'li',
                        content: {
                            elem: 'link',
                            tag: 'a',
                            attrs: {href: '/profile/'+currentUser.nick},
                            content: 'Профиль'
                        }
                    },
                    {
                        elem: 'item',
                        tag: 'li',
                        content: {
                            elem: 'link',
                            tag: 'a',
                            attrs: {href: '/profile/'+currentUser.nick+'/follow'},
                            content: 'Подписки'
                        }
                    },
                    {
                        elem: 'item',
                        tag: 'li',
                        content: {
                            elem: 'link',
                            tag: 'a',
                            attrs: {href: '/profile/'+currentUser.nick+'/subscribers'},
                            content: 'Подписчики'
                        }
                    }
                ] : '',
                {
                    elem: 'item',
                    tag: 'li',
                    content: {
                        elem: 'link',
                        tag: 'a',
                        attrs: { href: '/profile/my' },
                        content: 'Настройки'
                    }
                },
                {
                    elem: 'item',
                    tag: 'li',
                    content: {
                        elem: 'link',
                        tag: 'a',
                        attrs: { href: '/logout' },
                        content: 'Выход'
                    }
                }
            ]
        }
    ];
});
