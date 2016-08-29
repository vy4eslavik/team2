/**
 * Created by Yulia on 22.08.16.
 */

block('seed-list-item').content()(function () {
    var seed = this.ctx.seed;

    return [
        {
            elem: 'item',
            content: [
                {
                    elem: 'left',
                    content: {
                                block : 'avatar',
                                img: seed.author_ava,
                                mix: { block : 'seed-list', elem: 'avatar' }
                    }
                },
                {
                    elem: 'right',
                    content: [
                                seed.parent? {
                                    elem: 'reply',
                                    content: 'In Reply'
                                } : '',
                                {
                                    elem: 'title',
                                    content: [
                                        {
                                          elem: 'name',
                                          content: seed.author_name
                                        },
                                        {
                                            elem: 'nick',
                                            content: '@'+seed.author_nick
                                        },
                                        {
                                            elem: 'nick',
                                            content: seed.datetime.toLocaleString()
                                        }
                                    ]

                                }
                    ]
                },
                {
                    block: 'link',
                    url: 'seed/view/?id=' + seed.id,
                    content: [
                        {
                            elem: 'msg',
                            content: seed.msg
                        },
                        seed.img?
                        {
                            block: 'image',
                            url: seed.img,
                            alt: 'Seed Image',
                            height: 'auto'
                        } : ''
                    ]

                },
                {
                    elem: 'bottom',
                    content:[
                        {
                            elem: 'actions',
                            content: [
                                {
                                    block : 'link',
                                    mods : { theme : 'greylink', size : 'm', pseudo : true },
                                    url: '/seed/add/?id=' + seed.id,
                                    content : 'Reply'
                                },
                                {
                                    block: 'followed-unfollowed',
                                    js: true,
                                    followed: seed.followed? seed.followed: 0,
                                    nick: seed.author_nick

                                }
                            ]
                        }
                    ]
            }
        ]

    }];

});
