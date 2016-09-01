block('header-hamburger-menu').content()(function () {

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
                {
                    elem: 'item',
                    tag: 'li',
                    content: {
                        elem: 'link',
                        tag: 'a',
                        attrs: { href: '/profile/my' },
                        content: 'Edit Profile'
                    }
                },
                {
                    elem: 'item',
                    tag: 'li',
                    content: {
                        elem: 'link',
                        tag: 'a',
                        attrs: { href: '/logout' },
                        content: 'Log Out'
                    }
                }
            ]
        }
    ];
});
