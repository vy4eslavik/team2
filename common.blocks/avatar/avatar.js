modules.define('avatar', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function () {
                    if(this.findBlockInside('avatar').hasMod('largeView', true)) {
                        if (BEMDOM.win.height() < BEMDOM.win.width()) {
                            this.delMod('largeView');
                            this.findBlockInside('image').domElem.attr({width: 80, height: 80});
                        }
                        this.bindToWin('resize', function (e) {
                            if (BEMDOM.win.height() < BEMDOM.win.width()) {
                                this.delMod('largeView');
                                this.findBlockInside('image').domElem.attr({width: 80, height: 80});
                            }else{
                                this.setMod('largeView');
                                this.findBlockInside('image').domElem.attr({width: '100%', height: 'auto'});
                            }
                        });
                    }
                }
            }
        }
    }));
});

