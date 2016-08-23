/**
 * Created by Yulia on 22.08.16.
 */

block('seed-list-item').content()(function () {
    var seed = this.ctx.seed;
    var seedBlock = {
        elem: 'item',
        content: [
            {
                elem: 'left',
                content: {
                    block: 'avatar',
                    img: seed.author_ava,
                    mix: {block: 'seed-list', elem: 'avatar'}
                }
            },
            {
                elem: 'right',
                content: [
                    {
                        elem: 'title',
                        content: [
                            {
                                elem: 'name',
                                content: seed.author_name
                            },
                            {
                                elem: 'nick',
                                content: '@' + seed.author_nick
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
                elem: 'msg',
                content: seed.msg
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
