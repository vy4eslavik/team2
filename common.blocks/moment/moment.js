/**
 * Created by admin on 03.09.16.
 */

/**
 * @module moment
 * @description Provide Moment.js (load if it does not exist).
 */

modules.define(
    'moment',
    ['loader_type_js'],
    function(provide, loader) {

        var url = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.js';
        /* global jQuery */

        function doProvide(preserveGlobal) {
            /**
             * @exports
             * @type Function
             */
            provide(moment);
        }

        // typeof jQuery !== 'undefined'?
        //     doProvide(true) :
            loader(url, doProvide);
    });
