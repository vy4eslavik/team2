/**
 * Created by Yulia on 22.08.16.
 */

block('seed-list-item').content()(function () {
    var seed = this.ctx.seed;

    var msg = seed.msg;

    //ToDo: переделать хардкод HTML на BEM объекты
     msg = msg.replace(/@[a-z0-9_-]+/ig, '<a class="link link__control" href="/profile/$&">$&</a>');
    msg = msg.replace(/href="\/profile\/@/g, 'href="/profile/');
     msg = msg.replace(/#.+?(\s|$)/g, '<a class="link link__control" href="/search/?text=$&">$&</a>');
     msg = msg.replace(/(https?:\/\/[^\s]+)/g, '<a class="link link__control" href="$&" target="_blank">$&</a>');
    //var nicks = msg.match(/@[a-z0-9_-]+/ig);
    //msg.split(/@[a-z0-9_-]+/ig);

    return [
        {
            elem: 'item',
            content: [
                {
                    block: 'profile',
                    profile: seed.profile
                },
                {
                    elem: 'message',
                    // mix: {block: 'seed-list-item', elem: 'seed-link'},
                    // url: '/seed/view/' + seed.id,
                    content: [
                        {
                            block: 'link',
                            url: '/seed/view/' + seed.id,
                            content: {
                                elem: 'date',
                                mix: {block: 'seed-list-item', elem: 'date'},
                                content: seed.datetime.toLocaleString()
                            }
                        },
                        {
                            elem: 'msg',
                            content: msg
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
                        {
                            block: 'button',
                            mods: {theme: 'islands', size: 'm', view: 'action', type: 'link'},
                            mix: {block: 'seed-list-item', elem: 'answer'},
                            url: '/seed/add/?id=' + seed.id,
                            text: 'Ответить'
                        },
                        seed.parent ? {
                            elem: 'reply',
                            content: '(Это ответ)'
                        } : ''
                    ]
                }
            ]
        }
    ];
});
