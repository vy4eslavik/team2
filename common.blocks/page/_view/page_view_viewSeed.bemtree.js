/**
 * Created by Yulia on 29.08.16.
 */


block('page').mod('view', 'viewSeed').content()(function() {

    var seeds = this.data.seeds || [],
        currentUser = this.data.currentUser || {};
    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: {
                block: 'seed-list',
                seeds: seeds,
                currentUser: currentUser
            }
        },
        {
            block: 'footer'
        }
    ];
});
