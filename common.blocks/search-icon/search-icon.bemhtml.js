block('search-icon').content()(function() {
    return [
        {
            block: 'image',
            url: this.ctx.img || '/Search.png',
            alt: this.ctx.alt || 'search icon'
        }
    ];
});
