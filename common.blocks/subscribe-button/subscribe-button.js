modules.define('subscribe-button', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function () {
                    var subscribersCount = Number(this.params.subscribers);
                    this.bindTo('subscribe', 'click', function (e) {
                        $.get('http://localhost:3000/profile/subscribe', this.params)
                            .done(function (data) {
                                switch (data) {
                                    case true:
                                        subscribersCount++;
                                        $('.subscribe-button__subscribe .button__text').text('Отписаться');
                                        $('.link__subscribers').text('subscribers ('+subscribersCount+')');
                                        break;
                                    case false:
                                        subscribersCount--;
                                        $('.subscribe-button__subscribe .button__text').text('Подписаться');
                                        $('.link__subscribers').text('subscribers ('+subscribersCount+')');
                                        break;
                                    default:
                                        console.log(data);
                                        break;
                                }
                            });
                    });
                }
            }
        }
    }));
});
