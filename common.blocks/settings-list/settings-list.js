modules.define('settings-list', ['i-bem__dom', 'BEMHTML', 'events__channels'],
    function (provide, BEMDOM, BEMHTML, channels) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            channels('image-uploaded').on('preview', function (e, data) {
                                BEMDOM.replace(
                                    this.findBlockInside('avatar').domElem,
                                    BEMHTML.apply(
                                        {
                                            block: 'avatar',
                                            img: data.url,
                                            mods: {largeView: true}
                                        })
                                );
                                this.dropElemCache('avatar-image');
                            }, this);
                        }
                    }
                }
            },
            {
                live: function () {
                    this.liveBindTo('avatar-edit', 'pointerclick', function (e) {
                        e.preventDefault();
                        this.findBlockInside('attach').elem('control').click();
                    });
                }
            }
        ));
    });
