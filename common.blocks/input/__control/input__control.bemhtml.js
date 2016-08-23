block('input').elem('control').match(function(){ return this._input.required; })(
    attrs()(function() {
        return this.extend(applyNext(), {required: 'required'});
    })
);
