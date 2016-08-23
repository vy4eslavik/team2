block('input').match(function(){ return this._input.notification; })(
    mix()({ elem: 'notification' }),
    content()(function() {
        return [
            {elem: 'box', content: {elem: 'control'}},
            {block: 'notification', tag: 'span', content: this._input.notification}
        ];
    })
);
