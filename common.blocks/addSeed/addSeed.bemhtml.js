/**
 * Created by admin on 20.08.16.
 */


block('addSeed')(
    tag()('form'),
    attrs()(function() {
        return {
            action: '/seed/add',
            method: 'POST',
            enctype: 'multipart/form-data'};
    }),
    mix()({block: 'clearfix'})
);
