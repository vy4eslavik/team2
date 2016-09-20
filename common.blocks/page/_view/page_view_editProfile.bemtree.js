block('page').mod('view', 'editProfile').content()(function () {

    var profileSettings = this.data.profileSettings || {};
    var userPath = this.data.userPath || '';
    var formSave = this.data.formSave || null;
    return [
        {
            block: 'header'
        },
        {
            block: 'content',
            content: [
                {
                    block: 'settings-list',
                    profileSettings: profileSettings,
                    userPath: userPath,
                    formSave: formSave
                }
            ]
        },
        {
            block: 'footer'
        }
    ];
});
