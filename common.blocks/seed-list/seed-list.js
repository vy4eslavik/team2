modules.define('seed-list', ['i-bem__dom', 'BEMHTML','jquery', 'events__channels'], function (provide, BEMDOM, BEMHTML,$,channels, moment) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: {
                    inited: function () {

                        var shouldLoad = false;

                        // подгружать старые сиды
                        this.bindToWin('scroll', function (e) {
                            var top = window.pageYOffset || document.documentElement.scrollTop;
                            var height = document.body.offsetHeight;
                            if ((window.innerHeight + window.scrollY) >= height) {
                                shouldLoad = true;
                            }

                            if (shouldLoad) {
                                  var xhr = new XMLHttpRequest();

                                  xhr.open('GET', '/', false);
                                  xhr.setRequestHeader('isajax','true');
                                  xhr.setRequestHeader('fromtime',this.domElem.context.dataset.oldest);

                                  xhr.send();
                                  shouldLoad = false;

                                  if (xhr.status != 200) {
                                      // error
                                  } else {
                                      // append
                                      var seeds = JSON.parse(xhr.responseText);

                                      if (seeds.length) {
                                          this.domElem.context.dataset.oldest = new Date(seeds[seeds.length-1].datetime).getTime()/1000;

                                          BEMDOM.append(
                                              this.domElem,
                                              seeds.map(function (item) {
                                                return BEMHTML.apply({
                                                    block: 'seed-list-item',
                                                    seed: item
                                                }, this)
                                              },this).join('')

                                            );
                                      }
                                  }
                            }
                        });

                        // Проверить есть ли новые
                        setTimeout(this._doPoll.bind(this),10000);

                        channels('new-seeds').on('fetch', function(e, data) {
                            this._doFetch.call(this);
                        }, this);

                    }
                }
            },
            _doFetch: function () {
                $.ajax({
                    url: '/',
                    method: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader('isajax','true');
                        request.setRequestHeader('newest',this.domElem.context.dataset.last);
                    },
                    context: this
                }).done(function (data) {
                    var seeds = JSON.parse(data);

                    if (seeds.length) {
                        this.domElem.context.dataset.last = new Date(seeds[0].datetime).getTime()/1000;

                        BEMDOM.prepend(
                            this.domElem,
                            seeds.map(function (item) {
                              return BEMHTML.apply({
                                  block : 'seed-list-item',
                                  seed: item
                              }, this)
                            },this).join('')

                          );
                    }
                });



            },
            _doPoll: function () {
                $.ajax({
                    url: '/seeds/notify',
                    data: 'newest='+this.domElem.context.dataset.last,
                    method: 'POST',
                    context: this
                }).done(function (data) {
                    if (~~data > 0) {
                        channels('new-seeds').emit('update', {seedCount: data});
                    }
                    setTimeout(this._doPoll.bind(this),10000);
                });
            }

        },
        {
            /* статические методы */
        }
    ));

});
