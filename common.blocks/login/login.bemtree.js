block('login').content()(function () {
    return [
        {
            elem: 'center',
            content: {
                block: 'link',
                url: '/',
                content:{
                    block: 'image',
                    url: '/img/pepo.png',
                    width: '120px'
                }
            }
        },
        {
            elem: 'please',
            content: 'Пожалуйста, авторизируйтесь'
        },
        {
            elem: 'facebook',
            content: {
                block: 'button',
                mods: {theme: 'fvbutton', type: 'link'},
                url: '/login/facebook',
                text: 'Через facebook',
                icon: {
                    block: 'icon',
                    mods: {
                        social: 'facebook'
                    }
                }
            }
        },
        {
            elem: 'vkontakte',
            content: {
                block: 'button',
                mods: {theme: 'fvbutton', type: 'link'},
                url: '/login/vkontakte',
                text: 'Через vkontakte',
                icon: {
                    block: 'icon',
                    mods: {
                        social: 'vk'
                    }
                }
            }
        }
    ]
});
