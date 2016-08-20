block('avatar').content()(function() {
    return [
        {
            block: 'image',
            url: this.ctx.img, // 'https://img-fotki.yandex.ru/get/16159/259818507.0/0_130be6_4116d8e7_S',
            alt: this.ctx.alt || 'Я',
            width: this.ctx.width || 80,
            height: this.ctx.height || 80
        }
    ];
});
