block('login').content()(function(){
    return [
      {
        elem : 'please',
        content: 'Пожалуйста, авторизируйтесь'
      },
      {
        elem : 'facebook',
        content : {
          block : 'button',
          mods : { theme : 'fvbutton', type : 'link' },
          url : '/login/facebook',
          text : 'Через facebook'
      }
      },
      {
        elem: 'vkontakte',
        content: {
          block : 'button',
          mods : { theme : 'fvbutton', type : 'link' },
          url : '/login/vkontakte',
          text : 'Через vkontakte'
      }
      }
    ]});
