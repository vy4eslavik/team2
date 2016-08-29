/**
 * Created by Yulia on 29.08.16.
 */


block('page').mod('view', 'view').content()(function() {

    var seed = this.data.seed || [];
    return [
        {
            block: 'header'
        },
        {
            block: 'footer'
        }
    ];
});
