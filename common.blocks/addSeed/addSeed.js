modules.define('addSeed', ['i-bem__dom', 'BEMHTML', 'events__channels'],
    function (provide, BEMDOM, BEMHTML, channels) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            var preview = this.findBlockInside('preview');
                            var attach = this.findBlockInside('attach');
                            channels('image-uploaded').on('preview', function (e, data) {
                                if (data.clear) {
                                    preview.elem('image').length && BEMDOM.destruct(preview.findBlockInside('image').domElem);
                                    preview.elem('clear').length && BEMDOM.destruct(preview.elem('clear'));
                                    preview.unbindFrom('clear', 'pointerclick');
                                } else {
                                    BEMDOM.update(
                                        preview.domElem,
                                        BEMHTML.apply([
                                            {
                                                block: 'image',
                                                mix: {block: 'preview', elem: 'image'},
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
