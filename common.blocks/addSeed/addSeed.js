modules.define('addSeed', ['i-bem__dom', 'BEMHTML', 'events__channels', 'keyboard__codes', 'jquery'],
    function (provide, BEMDOM, BEMHTML, channels, keyCodes, $) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            var self = this;
                            channels('image-loading').on('preview', this._imagePreview, this);
                            this.findBlockInside('textarea').bindTo('keyup', function (e) {
                                if (e.keyCode === keyCodes.SPACE || e.keyCode === keyCodes.BACKSPACE || e.keyCode === keyCodes.DELETE) {
                                    var pattern = /([-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/?[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)/i;
                                    var link = e.currentTarget.value.match(pattern);
                                    self._urlPreview(link);
                                }
                            });
                        }
                    }
                },
                _imagePreview: function (e, data) {
                    var media = this.findBlockInside('media');
                    var attach = this.findBlockInside('attach');
                    switch (data.state) {
                        case 1:
                            BEMDOM.update(
                                media.domElem,
                                BEMHTML.apply([
                                    {
                                        block: 'image',
                                        mix: {block: 'preview', elem: 'image'},
                                        url: data.url
                                    }
                                ])
                            );
                            break;
                        case 2:
                            BEMDOM.update(
                                media.domElem,
                                BEMHTML.apply([
                                    {
                                        block: 'preview-img',
                                        content: [
                                            {
                                                block: 'image',
                                                mix: {block: 'preview-img', elem: 'image'},
                                                width: '100%',
                                                url: data.url
                                            },
                                            {
                                                elem: 'clear',
                                                content: 'x'
                                            }
                                        ]
                                    }
                                ])
                            );
                            media.findBlockInside('preview-img').bindTo('clear', 'pointerclick', function (e) {
                                e.preventDefault();
                                attach.elem('clear').click();
                            });
                            break;
                        case 'clear':
                            BEMDOM.destruct(media.findBlockInside('preview-img').domElem);
                            break;
                        default:
                            media.domElem.text('Упс! Картинка не загрузилась');
                            break;
                    }
                },
                _urlPreview: function (link) {
                    var media = this.findBlockInside('media');
                    if (!link) {
                        BEMDOM.update(
                            media.domElem,
                            ''
                        );
                        return;
                    }
                    $.get('/seed/getPreviewUrl', {url: link[0]})
                        .done(function (data) {
                            BEMDOM.update(
                                media.domElem,
                                data.previewUrl
                            );
                            media.findBlockInside('preview-url').bindTo('clear', 'pointerclick', function (e) {
                                e.preventDefault();
                                BEMDOM.destruct(media.findBlockInside('preview-url').domElem);
                            });
                        });
                }
            }
        ));
    });
