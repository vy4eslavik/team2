block('settings-setup-list')(
    // js()(true),
    tag()('form'),
    attrs()(function() {
        return {action: '/profile/setup', method: 'POST'};
    })
);
