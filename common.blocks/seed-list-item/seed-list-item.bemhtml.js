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
                    block: 'profile',
                    profile: seed.profile
                },
                {
                    block: 'link',
                    url: '/seed/view/' + seed.id,
                    content: [
                        {
                            elem: 'date',
                            mix: {block: 'seed-list-item', elem: 'date'},
                            content: seed.datetime.toLocaleString()
                        },
                        {
                            elem: 'msg',
                            content: seed.msg
                        },
                        seed.img ?
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
                    content: [
                        seed.parent ? {
                            elem: 'reply',
                            content: '(Это ответ)'
                        } : '',
                        {
                            block: 'button',
                            mods: {theme: 'islands', size: 'm', view: 'action', type: 'link'},
                            mix: {block: 'seed-list-item', elem: 'answer'},
                            url: '/seed/add/?id=' + seed.id,
                            text: 'Ответить'
                        }
                    ]
                }
            ]
        }
    ];
});
