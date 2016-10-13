'use strict';

const C = require('chanakya');

C.response('showplans', 'postback', (to, validatorResult) => {

  let buttons = validatorResult.map((plan)=> ({
    'type': 'web_url',
    'url': 'https://petersapparel.parseapp.com',
    'title': plan.name
  }));
  let plans = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'button',
        'text': `Some personalised plans for you, ${to.first_name}`,
        'buttons': buttons
      }
    }
  };
  return plans;
});

