block('profile').content()(function() {
    return [
        {
          block : 'avatar',
          mix: { block : 'profile', elem: 'avatar' },
        },
        {
          elem : 'seeds',
          content : [
            {
              block : 'link',
              mods : { theme : 'islands', size : 'm', pseudo : true },
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
              mods : { theme : 'islands', size : 'm', pseudo : true },
              url: '#',
              content : 'Follow(25)'
            }
          ]
        }
        /// TODO: контент фейковый, сделать ссылкой и корректное отображение количества Seeds и follow в соответствии с БД

    ];
});
