'use strict';

const C = require('chanakya'),
  _ = require('lodash');

/**
 * Expectations
 */

C.expectation('greetings', ['isGreetings'], (res) => res ? ['start'] : ['fail']);

/**
 * Validators
 */

C.validator('isGreetings', null, (message) => _.includes('hi,hello,hola, howdy,hey,hmm,hm,whatup,ok,yes'.split(','), message));

/**
 * Responses
 */

C.response('fail', 'greetings', (to) => ({
  text: `I am sorry ${to.first_name}, I am unable to understand what you mean.`
}));

C.response('doPostback', 'postback', (to) => ({
  text: `${to.first_name}, I was expecting you to click on a button above!`
}));
