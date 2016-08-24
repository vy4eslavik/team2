/**
 * Created by Yulia on 22.08.16.
 */

block('seed-list-item').content()(function () {
    var seed = this.ctx.seed;

    var seedBlock = {
            elem: 'item',
            content:[
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
                                            content: 'Aug 20'
                                        },
                                    ]

                                }
                    ]
                },
                {
                    elem: 'msg',
                    content: seed.msg
                },
                {
                    elem: 'bottom',
                    content:[
                        {
                            block: 'image',
                            url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4mLmKpa_q3lgkn9Je2guQG3YMvhRMCQtpyOoSLUOjWSykvfME',
                            alt: 'Seed Image',
                            height: 'auto'
                        },
                        {
                            elem: 'actions',
                            content: [
                                {
                                    block : 'link',
                                    mods : { theme : 'greylink', size : 'm', pseudo : true },
                                    url: '#',
                                    content : 'View & Reply'
                                },
                                {
                                    block : 'link',
                                    mix: { block: 'followed-unfollowed' },
                                    mods : { theme : 'greylink', size : 'm', pseudo : true },
                                    url: '#',
                                    content : 'Followed'
                                }
                            ]
                        }
                    ]
            }
        ]
    };
    if (seed.img) {
        seedBlock.content.push({
            elem: 'bottom',
            content: {
                block: 'image',
                url: seed.img,
                alt: 'Seed Image',
                height: 'auto'
            }
        });
    }
    return [
        seedBlock
    ];
});

