modules.define('subscribe-button', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function () {
                    // var currentSubscribersCount = Number(this.params.subscribers);
                    this.bindTo('subscribe', 'click', function (e) {
                        $.get(document.location.href, this.params)
                            .done(function (data) {
                                switch (data) {
                                    case true:
                                        // currentSubscribersCount++;
                                        $('.subscribe-button__subscribe .button__text').text('Отписаться');
                                        /*$('.subscribe-button__subscribers').text(
                                            'subscribers ('+currentSubscribersCount+')'
                                        );*/
                                        break;
                                    case false:
                                        // currentSubscribersCount--;
                                        $('.subscribe-button__subscribe .button__text').text('Подписаться');
                                        /*$('.view-profile__subscribers').text(
                                            'subscribers ('+currentSubscribersCount+')'
                                        );*/
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
