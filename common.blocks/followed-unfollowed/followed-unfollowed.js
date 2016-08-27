/**
 * Created by Yulia on 26.08.16.
 */

modules.define('followed-unfollowed',['i-bem__dom','popup'], function(provide, BEMDOM){
    provide(BEMDOM.decl(this.name, {
        onSetMod : {
            'js' : {
                'inited' : function() {
                    this._link = this.findBlockInside('link')
                        .on('click', this._onLinkClick, this);

                    this._popup = this.findBlockInside('popup')
                        .setAnchor(this._link)
                        .on({ modName : 'visible', modVal : '' }, this._onPopupHide, this);

                }
            }
        },
        _onLinkClick : function() {
            this.toggleMod('opened');
        },
        _onPopupHide : function() {
            this.delMod('opened');
        }
    },{}));
});

