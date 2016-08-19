/**
 * Created by yulia on 18.08.16.
 */

block('header-menu').content()(function() {

    return [
        {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attrs: { href: '/home' },
                content: 'Home'
            }
        },
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
                attrs: { href: '/seed' },
                content: 'Seed'
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
    ];
});