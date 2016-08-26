block('page').mod('view', 'setupProfile').content()(function() {

    var profileSettings = this.data.profileSettings || {};
    var userPath = this.data.userPath || '';
    var formSave = this.data.formSave || null;
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            content: [
                {
                    block: 'content',
                    content: [
                        {
                            block: 'settings-setup-list',
                            profileSettings: profileSettings,
                            userPath: userPath,
                            formSave: formSave
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
