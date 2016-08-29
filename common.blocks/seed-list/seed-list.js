modules.define('seed-list', ['i-bem__dom', 'BEMHTML'], function (provide, BEMDOM, BEMHTML) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: {
                    inited: function () {

                        var shouldLoad = false;
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
                                  xhr.setRequestHeader('fromtime',this.domElem.context.dataset.last);

                                  xhr.send();
                                  shouldLoad = false;

                                  if (xhr.status != 200) {
                                      // error
                                      console.log( xhr.status + ': ' + xhr.statusText );
                                  } else {
                                      // append
                                      var seeds = JSON.parse(xhr.responseText);

                                      if (seeds.length) {
                                          this.domElem.context.dataset.last = new Date(seeds[seeds.length-1].datetime).getTime()/1000;

                                          BEMDOM.append(
                                              this.domElem,
                                              seeds.map(function (item) {
                                                return BEMHTML.apply({
                                                    block : 'seed-list-item',
                                                    seed: item
                                                })
                                              },this).join('')

                                            );
                                      }
                                  }
                            }
                        });

                    }
                }
            }

        },
        {
            /* статические методы */
        }
    ));

});
