/**
 * Created by Yulia on 22.08.16.
 */

block('seed-list-item').content()(function() {
    var seed = this.ctx.seed;
    return [
        {
        elem: 'item',
        content: [
            {
                block : 'avatar',
                img: seed.author_ava,
                mix: { block : 'seed-list', elem: 'avatar' }
            },
            {
                elem: 'title',
                content: [
                    {
                      elem: 'name',
                      tag: 'span',
                      content: seed.author_name
                    },
                    {
                        elem: 'nick',
                        tag: 'span',
                        content: '@'+seed.author_nick
                    },
                    {
                        elem: 'nick',
                        tag: 'span',
                        content: '- Aug 20'
                    },
                ]

            },
            {
                elem: 'msg',
                content: seed.msg
            },
            {
                block: 'image',
                url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4mLmKpa_q3lgkn9Je2guQG3YMvhRMCQtpyOoSLUOjWSykvfME',
                alt: 'Seed Image',
                width: '100%',
                height: 'auto'

            }
        ]
}];
});
