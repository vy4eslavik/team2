block('attach').elem('control').match(function(){ return this._attach.accept; })(
    attrs()(function() {
        return this.extend(applyNext(), {accept: this._attach.accept});
    })
);
