modules.define('addSeed', ['i-bem__dom', 'BEMHTML', 'events__channels'],
    function (provide, BEMDOM, BEMHTML, channels) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            var preview = this.findBlockInside('preview');
                            var attach = this.findBlockInside('attach');
                            channels('image-loading').on('preview', function (e, data) {
                                switch (data.state) {
                                    case 1:
                                        BEMDOM.update(
                                            preview.domElem,
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
                                            preview.domElem,
                                            BEMHTML.apply([
                                                {
                                                    block: 'image',
                                                    mix: {block: 'preview', elem: 'image'},
                                                    width: '100%',
                                                    url: data.url
                                                },
                                                {
                                                    block: 'preview',
                                                    elem: 'clear',
                                                    content: 'x'
                                                }
                                            ])
                                        );
                                        preview.bindTo('clear', 'pointerclick', function(e) {
                                            e.preventDefault();
                                            attach.elem('clear').click();
                                        });
                                        break;
                                    case 'clear':
                                        preview.elem('image').length && BEMDOM.destruct(
                                            preview.findBlockInside('image').domElem
                                        );
                                        preview.elem('clear').length && BEMDOM.destruct(preview.elem('clear'));
                                        preview.unbindFrom('clear', 'pointerclick');
                                        break;
                                    default:
                                        preview.domElem.text('Упс! Картинка не загрузилась');
                                        break;
                                }
                                preview.dropElemCache('image clear');
                                attach.dropElemCache('clear');
                            }, this);
                        }
                    }
                }
            }
        ));
    });
