const C = require('chanakya');

C.response('start', 'doPostback', (to) => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: `Welcome to Telco eCare`,
          subtitle: `Hello! What would you like to do?`,
          buttons: [
            {
              type: 'postback',
              title: 'Mobile',
              payload: 'askMobile'
            }, {
              type: 'postback',
              title: 'Fixed line & Broadband',
              payload: 'askFLBB'
            }, {
              type: 'postback',
              title: 'DTH',
              payload: 'askDTH'
            }
          ]
        }
      ]
    }
  }
}));
