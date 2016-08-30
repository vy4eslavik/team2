/**
 * Created by Yulia on 29.08.16.
 */


block('page').mod('view', 'viewSeed').content()(function() {

    var seed = this.data.seed || [];
    return [
        {
            block: 'header'
        },
        {
            block: 'seed-list-item',
            seed: seed
        },
        {
            block: 'footer'
        }
    ];
});
