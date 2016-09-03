block('page').mod('view', 'search').content()(function() {

    var seeds = this.data.seeds || [];
    var users = this.data.users || [];
    var profile = this.data.profile || {};

    return [
          {
              block: 'header'
          },

          {
          block: 'content',
          content: [
            seeds.length > 0 ? {
                block: 'seed-list',
                seeds: seeds
              } : users.map(function(user){
                return {
                  block: 'profile',
                  profile: user,
                  mods: {subscribeButton: true},
                  currentUserId: profile.id,
                  subscribe: user.subscribers.indexOf(profile.id) >= 0
                };
              })
          ]
        }
    ];
});
