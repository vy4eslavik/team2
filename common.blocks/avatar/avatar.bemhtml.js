block('avatar')(
    js()(true),
    content()(function () {
        var mods = this.ctx.mods || false;
        return [
            {
                block: 'image',
                url: this.ctx.img || '/img/no-photo.gif',
                alt: this.ctx.alt || 'Здесь должен быть аватар',
                width: mods.largeView ? '100%' : (this.ctx.width || 80),
                height: mods.largeView ? 'auto' : (this.ctx.height || 80)
            }
        ];
    })
);
