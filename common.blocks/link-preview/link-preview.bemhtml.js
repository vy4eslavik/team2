block('link-preview').content()(function () {
    var og = this.ctx.og;

    return [

            [
              {
                  block: 'image',
                  tag: 'img',
                  attrs: {
                      src: og.image.url
                  }
              },
              {
                  elem: 'title',
                  content: og.title
              },
              {
                  elem: 'description',
                  content: og.description
              }
            ]
        
    ];
});
