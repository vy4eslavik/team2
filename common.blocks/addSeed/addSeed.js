modules.define('addSeed', ['i-bem__dom', 'BEMHTML', 'events__channels', 'keyboard__codes', 'jquery'],
    function (provide, BEMDOM, BEMHTML, channels, keyCodes, $) {
        provide(BEMDOM.decl(this.name,
            {
                link: '',
                onSetMod: {
                    js: {
                        inited: function () {
                            var self = this;
                            channels('image-loading').on('preview', this._imagePreview, this);
                            this.findBlockInside('textarea').bindTo('keyup', function (e) {
                                if (e.keyCode !== keyCodes.SPACE && e.keyCode !== keyCodes.BACKSPACE && e.keyCode !== keyCodes.DELETE) {
                                    return;
                                }

                                if (self._urlPreview.timeout) {
                                    clearTimeout(self._urlPreview.timeout);
                                }
                                self._urlPreview.timeout = setTimeout(function () {
                                    self._urlPreview.call(self, e);
                                }, 1000);
                            });
                        }
                    }
                },
                _imagePreview: function (e, data) {
                    var media = this.findBlockInside('media'),
                        attach = this.findBlockInside('attach'),
                        urlPreview = this.findBlockInside({block: 'input', name: 'urlPreview'});

                    switch (data.state) {
                        case 1:
                            BEMDOM.update(
                                media.domElem,
                                BEMHTML.apply([
                                    {
                                        block: 'image',
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
                            urlPreview.setVal('');
                            break;
                        case 'clear':
                            media.findBlockInside('preview-img') && BEMDOM.destruct(
                                media.findBlockInside('preview-img').domElem
                            );
                            break;
                        default:
                            media.domElem.text('Упс! Картинка не загрузилась');
                            break;
                    }
                },
                _urlPreview: function (e) {
                    var media = this.findBlockInside('media'),
                        attach = this.findBlockInside('attach'),
                        urlPreview = this.findBlockInside({block: 'input', name: 'urlPreview'}),
                        pattern = /([-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/?[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)/i,
                        link = e.currentTarget.value.match(pattern);

                    if (!link) {
                        media.findBlockInside('preview-url') && BEMDOM.destruct(media.findBlockInside('preview-url').domElem);
                        urlPreview.setVal('');
                        return;
                    }
                    if (link[0] === this.link) {
                        return;
                    }
                    this.link = link[0];
                    urlPreview.setVal(link[0]);
                    BEMDOM.update(
                        media.domElem,
                        BEMHTML.apply([
                            {
                                block: 'image',
                                url: '/img/loader.gif'
                            }
                        ])
                    );
                    $.get('/seed/getPreviewUrl', {url: link[0]})
                        .done(function (data) {
                            BEMDOM.update(
                                media.domElem,
                                data.previewUrl
                            );
                            media.findBlockInside('preview-url').bindTo('clear', 'pointerclick', function (e) {
                                e.preventDefault();
                                BEMDOM.destruct(media.findBlockInside('preview-url').domElem);
                                urlPreview.setVal('');
                            });
                            attach.elem('clear').click();
                        });
                }
            }
        ));
    });
