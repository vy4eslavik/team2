/**
 * Created by Yulia on 22.08.16.
 */


block('seed-list-item')(
    js()(function () {
        return {
            seedId: this.ctx.seed.id
        };
    }),
    content()(function () {
        var seed = this.ctx.seed;
        var moment = this.ctx.moment || this.require('moment');
        // moment.lang("ru");

        var msg = seed.msg;

        //ToDo: переделать хардкод HTML на BEM объекты
        msg = msg.replace(/@[a-z0-9_-]+/ig, '<a class="link link__control" href="/profile/$&">$&</a>');
        msg = msg.replace(/href="\/profile\/@/g, 'href="/profile/');
        msg = msg.replace(/#.+?(\s|$)/g, '<a class="link link__control" href="/search/?text=$&">$&</a>');
        msg = msg.replace(/\/\?text=#/g, '/?text=' + encodeURIComponent('#'));
        msg = msg.replace(/(https?:\/\/[^\s]+)/g, '<a class="link link__control" href="$&" target="_blank">$&</a>');
        //var nicks = msg.match(/@[a-z0-9_-]+/ig);
        //msg.split(/@[a-z0-9_-]+/ig);

        return [
            {
                block: 'profile',
                profile: seed.profile
            },
            {
                elem: 'message',
                content: [
                    {
                        block: 'link',
                        url: '/seed/view?seedId=' + seed.id,
                        content: {
                            elem: 'date',
                            mix: {block: 'seed-list-item', elem: 'date'},
                            content: moment(seed.datetime).fromNow()
                        }
                    },
                    {
                        elem: 'msg',
                        content: msg
                    },
                    seed.img ? {
                        block: 'image',
                        mix: {block: 'seed-list-item', elem: 'msg-image'},
                        url: seed.img,
                        alt: 'Seed Image',
                        height: 'auto'
                    } : ''
                ]

            },
            seed.urlPreview && seed.urlPreview.url ? {
                block: 'preview-url',
                previewData: seed.urlPreview
            } : '',
            {
                elem: 'bottom',
                content: [
                    seed.parent ? {
                        elem: 'reply',
                        content: '(Это ответ)'
                    } : '',
                    (this.ctx.currentUser._id == seed.profile._id) ? {
                        block: 'button',
                        mods: {
                            theme: 'islands',
                            size: 'm',
                            disabled: Boolean(seed.child.length)
                        },
                        mix: {block: 'seed-list-item', elem: 'remove'},
                        text: 'Удалить'
                    } : '',
                    {
                        block: 'button',
                        mods: {theme: 'islands', size: 'm', view: 'action', type: 'link'},
                        mix: {block: 'seed-list-item', elem: 'answer'},
                        url: '/seed/add?id=' + seed.id,
                        text: 'Ответить'
                    }
                ]
            }
        ];
    })
);
