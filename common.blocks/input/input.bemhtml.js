block('input')(
    mix()(function(){
        if(this._input.notification) return { elem: 'notification' };
    }),
    content()(function() {
        var notification;
        if (this._input.notification) {
            notification = {block: 'notification', tag: 'span', content: this._input.notification};
        }
        return [
            {elem: 'box', content: {elem: 'control'}},
            notification
        ]
    })
);
