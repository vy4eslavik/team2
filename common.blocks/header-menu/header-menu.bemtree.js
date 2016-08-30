/**
 * Created by yulia on 18.08.16.
 */

block('header-menu').content()(function() {

    var isAuthenticated = this.data.isAuthenticated;

    return [
        (isAuthenticated && this.data.view !== 'addSeed')?
        {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attrs: { href: '/seed/add' },
                content: 'Add Seed'
            }
        } : '',
        isAuthenticated ? {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attrs: { href: '/profile/my' },
                content: 'Edit Profile'
            }
        } : '',
        isAuthenticated ? {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attrs: { href: '/logout' },
                content: 'Log Out'
            }
        } : {
            elem: 'item',
            tag: 'li',
            content: {
                elem: 'link',
                tag: 'a',
                attrs: {href: '/login'},
                content: 'Log In'
            }
        }
    ];
});
