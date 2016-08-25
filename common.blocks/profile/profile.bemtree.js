block('profile').content()(function() {
    var profile = this.ctx.profile || {};
    return [
        {
          block : 'avatar',
          img: profile.avatar,
          mix: { block : 'profile', elem: 'avatar' }
        },
        {
          elem : 'seeds',
          content : [
            {
              block : 'link',
              mods : { theme : 'greylink', size : 'm', pseudo : true },
              url: '#',
              content : 'Seeds(0)'
            }
          ]
        },
        {
          elem : 'follow',
          content: [
            {
              block : 'link',
              mods : { theme : 'greylink', size : 'm', pseudo : true },
              url: '#',
              content : 'Follow(' + profile.follow.length + ')'
            }
          ]
        }
        /// TODO: контент фейковый, сделать ссылкой и корректное отображение количества Seeds и follow в соответствии с БД

    ];
});
