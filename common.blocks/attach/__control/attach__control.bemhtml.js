block('attach').elem('control').attrs()(function() {
    if(this._attach.accept) {
        return this.extend(applyNext(), {accept: this._attach.accept});
    }else {
        return this.extend(applyNext());
    }
});
