/**
 * Created by Yulia on 26.08.16.
 */

block('followed-unfollowed').content()(function() {
    var followed = this.ctx.followed;
    var nick = this.ctx.nick;
    return [
        {
            block : 'link',
            mods : { pseudo : true, theme : 'islands' },
            content : followed? 'Followed': 'Unfollowed'
        },
        {
            block : 'popup',
            mods : { target : 'anchor',  autoclosable : true },
            content : followed?
            {
                block : 'link',
                mods : { theme : 'greylink', size : 'm'},
                url: '/unfollow/' + nick,
                content : 'Unfollow'
            } : {
                block : 'link',
                mods : { theme : 'greylink', size : 'm'},
                url: '/follow/'+ nick,
                content : 'Follow'
            }
        }
        ]

});
