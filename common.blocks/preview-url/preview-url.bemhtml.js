block('preview-url')(
    tag()('a'),
    attrs()(function () {
        var previewData = this.ctx.previewData || {};
        return {
            href: previewData.url,
            target: '_blank'
        };
    }),
    content()(function () {
        var previewData = this.ctx.previewData || false;
        if (!previewData || (!previewData.images && !previewData.title && !previewData.description)) {
            return 'Упс. Ссылка не загрузилась.';
        }
        return [
            {
                block: 'image',
                url: previewData.images ? previewData.images[0] : '',
                alt: previewData.title,
                width: 80,
                height: 80
            },
            {
                elem: 'title',
                content: previewData.title
            },
            {
                elem: 'desc',
                content: previewData.description
            },
            {
                elem: 'clear',
                content: 'x'
            }
        ];
    })
);
