/**
 * Created by admin on 20.08.16.
 */


block('addSeed')(
    js()(true),
    tag()('form'),
    attrs()(function() {
        return {
            action: '/seed/add',
            method: 'POST',
            enctype: 'multipart/form-data'};
    })
);
