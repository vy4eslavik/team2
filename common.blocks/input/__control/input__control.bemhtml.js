block('input').elem('control').attrs()(function() {
    if(this._input.required) {
        return this.extend(applyNext(), {required: 'required'});
    }else {
        return this.extend(applyNext());
    }
});
