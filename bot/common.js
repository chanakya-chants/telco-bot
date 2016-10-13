'use strict';

const C = require('chanakya');

/**
 * Expectations
 */

C.expectation('greetings', ['isGreetings'], (res) => res ? ['askage'] : ['fail']);

/**
 * Validators
 */

C.validator('isGreetings', null, (message) => message == 'hi');

/**
 * Responses
 */

C.response('fail', 'greetings', (to) => ({
  text: `I am sorry ${to.first_name}, I am unable to understand what you mean.`
}));

C.response('doPostback', 'postback', (to) => ({
  text: `${to.first_name}, I was expecting you to click on a button above!`
}));
