modules.define('addSeed', ['i-bem__dom', 'BEMHTML','jquery', 'events__channels'], function (provide, BEMDOM, BEMHTML,$,channels) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: {
                    inited: function () {

                        var foundLink = false;
                        console.log('ready to listen keyboard');
                        this.findBlockInside('textarea').on('change', function (e) {
                            var text = e.target._val;
                            var regex = /(https?:\/\/[^\s]+)/g;
                            var url;
                            if (regex.test(text)) {
                                url = text.match(regex)[0];
                                console.log(url);
                                $.ajax({
                                    url: '/og-scraper',
                                    method: 'POST',
                                    data: {url: url},
                                    context: this
                                }).done(function(data){
                                    console.log(data);
                                    console.log(this);
                                    this.elem('og').val(JSON.stringify(data));
                                    BEMDOM.update(
                                        this.elem('preview'),
                                        JSON.stringify(data)
                                    );
                                });
                            }
                        }, this);

                    }
                }
            }

        },
        {
            /* статические методы */
        }
    ));

});
