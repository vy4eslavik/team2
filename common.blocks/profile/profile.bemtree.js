block('profile').content()(function() {
    return [
        {
          block : 'avatar',
          img: 'https://pp.vk.me/c624620/v624620916/54645/sVzPtL8zip8.jpg',
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
              content : 'Follow(25)'
            }
          ]
        }
        /// TODO: контент фейковый, сделать ссылкой и корректное отображение количества Seeds и follow в соответствии с БД

    ];
});
