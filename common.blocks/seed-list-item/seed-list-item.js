modules.define('seed-list-item', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name,
        {
            restoreMsg: '',
            restoreImage: '',
            restoreUrlPreview: '',
            restoreBottom: '',
            restoreSeed: false,
            onSetMod: {
                'js': {
                    'inited': function () {
                        this.restoreMsg = this.elem('msg').clone();
                        this.restoreBottom = this.elem('bottom').clone();
                        this.restoreImage = this.elem('msg-image').clone();
                        this.restoreUrlPreview = this.findBlockInside('preview-url') && this.findBlockInside('preview-url').domElem.clone();
                    }
                }
            },
            _onDelete: function (data) {
                if (data.seed) {
                    this.restoreSeed = data.seed;
                    BEMDOM.update(
                        this.elem('msg'),
                        'Удалено'
                    );
                    BEMDOM.destruct(this.elem('msg-image'));
                    this.findBlockInside('preview-url') && BEMDOM.destruct(this.findBlockInside('preview-url').domElem);
                    BEMDOM.update(
                        this.elem('bottom'),
                        data.restoreButton
                    );
                    this.dropElemCache('msg-image');
                }
            },
            _restoreSeed: function () {
                var self = this;
                $.post('/seed/add', {seed: this.restoreSeed})
                    .done(function (data) {
                        if (data) {
                            BEMDOM.update(
                                self.elem('msg'),
                                self.restoreMsg
                            );
                            BEMDOM.append(
                                self.elem('message'),
                                self.restoreImage
                            );
                            BEMDOM.after(
                                self.elem('message'),
                                self.restoreUrlPreview
                            );
                            BEMDOM.update(
                                self.elem('bottom'),
                                self.restoreBottom
                            );
                        }
                    });
            }
        },
        {
            live: function () {
                this.liveBindTo('remove', 'pointerclick', function (e) {
                    var self = this;
                    if (e.currentTarget.attr('disabled')) {
                        return;
                    }
                    e.preventDefault();
                    $.get('/seed/remove', this.params)
                        .done(function (data) {
                            self._onDelete(data);
                        });
                });
                this.liveBindTo('restore', 'pointerclick', function (e) {
                    this._restoreSeed();
                });
            }
        }
    ));
});
