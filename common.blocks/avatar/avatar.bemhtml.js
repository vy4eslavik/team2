block('avatar').content()(function() {
    return [
        {
            block: 'image',
            url: this.ctx.img || '/img/no-photo.gif',
            alt: this.ctx.alt || 'Здесь должен быть аватар',
            width: this.ctx.width || 80,
            height: this.ctx.height || 80
        }
    ];
});
