/**
 * Created by el on 01.09.16.
 */


modules.define('attach', ['i-bem__dom', 'events__channels', 'strings__escape'],
    function (provide, BEMDOM, channels, escape, attach) {
        provide(attach.decl({modName: 'preview', modVal: 'image'}, {
                _onChange: function () {
                    this.getVal() ?
                        this._updatePreview() :
                        this._clear();
                },
                _updatePreview: function () {
                    var fileName = extractFileNameFromPath(this.getVal());
                    var files = this.elem('control')[0].files;

                    if (/(png|jpg|jpeg|gif)$/i.test(fileName) && window.FileReader && files && files[0]) {
                        var reader = new FileReader();
                        reader.onloadstart = function (e) {
                            channels('image-loading').emit('preview',
                                {
                                    url: '/img/loader.gif',
                                    state: reader.readyState
                                });
                        };
                        reader.onload = function (e) {
                            channels('image-loading').emit('preview',
                                {
                                    url: e.target.result,
                                    state: reader.readyState
                                });
                        };
                        reader.onerror = function (e) {
                            channels('image-loading').emit('preview', {state: reader.error});
                        };
                        reader.readAsDataURL(files[0]);
                    }

                    this
                        ._updateFileElem()
                        ._emitChange();
                },
                _clear: function (data) {
                    var control = this.elem('control'),
                        name = control.attr('name'),
                        tabIndex = control.attr('tabindex'),
                        accept = control.attr('accept');

                    BEMDOM.replace(
                        control,
                        '<input' +
                        ' class="' + control.attr('class') + '"' +
                        ' type="file"' +
                        (accept ? ' accept="' + accept + '"' : '') +
                        (name ? ' name="' + name + '"' : '') +
                        (tabIndex ? ' tabindex="' + tabIndex + '"' : '') +
                        '/>');

                    BEMDOM.destruct(this.elem('file'));

                    this.domElem.append(this.elem('no-file')); // use append because only detached before

                    channels('image-loading').emit('preview', {state: 'clear'});
                    return this
                        .dropElemCache('control file')
                        ._emitChange(data);
                }
            },
            {
                live: function () {
                    this
                        .liveBindTo('clear', 'click', this.prototype._onClearClick)
                        .liveBindTo('control', 'change', this.prototype._onChange);

                    return this.__base.apply(this, arguments);
                }
            }));

        function extractFileNameFromPath(path) {
            return path.split('\\').pop(); // we need this only in windows
        }
    });
