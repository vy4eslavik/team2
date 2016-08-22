/**
 * Created by dnsuser on 19.08.16.
 */

block('page').mod('view', 'seed').content()(function() {
    return [
        {
            block: 'header'
        },
        'Place for Seed Page<br>',
        {
            block: 'link',
            url: '/seed/add',
            mods : { theme : 'islands', size : 'm', pseudo : true },
            content: 'add seed'
        }
    ];
});
