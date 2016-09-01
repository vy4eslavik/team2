/**
 * Created by el on 01.09.16.
 */


modules.define('attach',['i-bem__dom', 'i-bem__internal', 'control', 'jquery', 'strings__escape'],
    function(provide, BEMDOM, INTERNAL, Control, $, escape, attach) {


provide(attach.decl({ modName: 'preview', modVal: 'image' }, {
    _onChange : function() {
        this.elem('no-file').detach();
        this.getVal()?
            this
                ._updatePreview()
                ._emitChange() :
            this._clear();
    },
    _updatePreview : function() {
        var fileName = extractFileNameFromPath(this.getVal());
        var preview = '';

        this.elem('file').length && BEMDOM.destruct(this.elem('file'));
        var files = this.elem('control')[0].files;

        if (/(png|jpg|jpeg|gif)$/i.test(fileName) && window.FileReader && files && files[0]) {

            var reader = new FileReader();
            var self = this;
            reader.onload = function (e) {
                preview = '<img src="' + e.target.result + '">';
                appendPreview.call(self);
            };
            reader.readAsDataURL(files[0]);

        } else {
            this._updateFileElem();
        }

        function appendPreview() {
            BEMDOM.append(
                this.domElem,
                '<span class="' +
                this.__self.buildClass('file') + ' ' + this.__self.buildClass('file-image') + '">' +
                '<span class="' +
                this.__self.buildClass('image') + '">' +
                preview +
                '</span>' +
                '<span class="' + this.__self.buildClass('clear') + '"/>' +
                '</span>');
        }

        return this.dropElemCache('file');
    }
}));

function extractFileNameFromPath(path) {
    return path.split('\\').pop(); // we need this only in windows
}

});
