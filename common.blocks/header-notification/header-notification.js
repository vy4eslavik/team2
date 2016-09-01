modules.define('header-notification', ['i-bem__dom', 'BEMHTML','jquery', 'events__channels'], function (provide, BEMDOM, BEMHTML,$,channels) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: {
                    inited: function () {
                        channels('new-seeds').on('update', function(e, data) {
                            BEMDOM.update(this.domElem, 'Новых сидов:'+data.seedCount);
                        }, this);

                        this.domElem.on('click', this._emitSeedsUpdate.bind(this));

                    }
                }
            },

            _emitSeedsUpdate: function() {
                channels('new-seeds').emit('fetch', {newSeeds: true});
                $("html, body").animate({ scrollTop: 0 }, "fast");
                BEMDOM.update(this.domElem, '');
            }

        },
        {
            /* статические методы */
        }
    ));

});
