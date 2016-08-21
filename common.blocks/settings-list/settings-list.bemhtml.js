block('settings-list')(
    // js()(true),
    tag()('form'),
    attrs()(function() {
        return {action: '/profile/my', method: 'POST', enctype: 'multipart/form-data'};
    })
);
