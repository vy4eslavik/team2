modules.define('seed-list', ['i-bem__dom', 'BEMHTML'], function (provide, BEMDOM, BEMHTML) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: {
                    inited: function () {

                        var shouldLoad = false;
                        this.bindToWin('scroll', function(e) {
                            var top = window.pageYOffset || document.documentElement.scrollTop;
                            console.log('scroll' + top);
                            if (top > 1200) {
                                shouldLoad = true;
                            }

                            if (shouldLoad) {
                                  var xhr = new XMLHttpRequest();

                                  xhr.open('GET', '/', false);
                                  xhr.setRequestHeader('isajax','true');

                                  xhr.send();
                                  shouldLoad = false;

                                  if (xhr.status != 200) {
                                  // error
                                  console.log( xhr.status + ': ' + xhr.statusText );
                                  } else {
                                  // append
                                  var seeds = JSON.parse(xhr.responseText);

                                  BEMDOM.append(
                                      this.domElem,
                                      BEMHTML.apply({
                                         block : 'seed-list',
                                         seeds: seeds
                                     })
                                      /*seeds.map(function (item) {
                                        return BEMHTML.apply({
                                            block : 'seed-list-item',
                                            seed: item
                                        })
                                      },this).join('')*/

                                    );
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
