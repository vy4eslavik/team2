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
                attr: { href: '/home' },
                content: 'Home'
            }
        },
        {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attr: { href: '' },
                content: 'Edit Profile'
            }
        },
        {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attr: { href: '' },
                content: 'Seed'
            }
        },
        {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attr: { href: '' },
                content: 'Log Out'
            }
        }
    ];
});