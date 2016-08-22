block('seed-list').content()(function() {
    var seeds = this.ctx.seeds;



    return seeds.map(function(item) {
        //var isCurrent = this.data.page.url === item.url,
        //    title = typeof item.title === 'string' ? item.title : item.title[lang];

        return {
<<<<<<< HEAD
            elem: 'item',
            content: [
                {
                    block : 'avatar',
                    img: item.author_ava,
                    mix: { block : 'seed-list', elem: 'avatar' }
                },
                {
                    elem: 'title',
                    content: [
                        {
                          elem: 'name',
                          tag: 'span',
                          content: item.author_name
                        },
                        {
                            elem: 'nick',
                            tag: 'span',
                            content: '@'+item.author_nick
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
                    content: item.msg
                },
                {
                    block: 'image',
                    url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4mLmKpa_q3lgkn9Je2guQG3YMvhRMCQtpyOoSLUOjWSykvfME',
                    alt: 'Seed Image',
                    width: '100%',
                    height: 'auto'

                }
            ]
=======
            block: 'seed-list-item',
            seed: item
>>>>>>> seed_item
        };
    }, this);


});
