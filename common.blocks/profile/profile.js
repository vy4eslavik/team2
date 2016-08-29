modules.define('profile', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function () {
                    var subscribersCount = Number(this.params.subscribers);
                    var subscribeButton = this.findBlockInside('subscribe-button');
                    var subscribersLink = this.findBlockInside('subscribers', 'link');
                    if(subscribeButton && subscribersLink) {
                        subscribeButton.on('subscribe', function () {
                            subscribersLink.domElem.text('subscribers ('+(++subscribersCount)+')');
                        });
                        subscribeButton.on('unSubscribe', function () {
                            subscribersLink.domElem.text('subscribers ('+(--subscribersCount)+')');
                        });
                    }
                }
            }
        }
    }));
});
