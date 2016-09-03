/**
 * Created by admin on 13.08.16.
 */

block('page').mod('view', 'addSeed').content()(function () {
    return [
        {
            block: 'header'
        },
        {
            block: 'addSeed',
            replyTo: this.data.seedReplyTo,
            js: true
        },
        {
            block: 'footer'
        }
    ]
});
