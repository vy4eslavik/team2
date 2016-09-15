modules.define('avatar', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function () {
                    if(this.findBlockInside('avatar').hasMod('largeView', true)) {
                        if (BEMDOM.win.height() < BEMDOM.win.width()) {
                            this.findBlockInside('avatar').delMod('largeView');
                        }
                        this.bindToWin('resize', function (e) {
                            if (BEMDOM.win.height() < BEMDOM.win.width()) {
                                this.findBlockInside('avatar').delMod('largeView');
                            }else{
                                this.findBlockInside('avatar').setMod('largeView');
                            }
                        });
                    }
                }
            }
        }
    }));
});

