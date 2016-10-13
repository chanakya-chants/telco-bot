'use strict';

const C = require('chanakya'),
  _ = require('lodash'),
  fetch = require('node-fetch');

C.expectation('age', ['isValidAge'], (res) => {
  switch (res.response) {
  case 'notInAgeLimit':
    return {
      data: res.age,
      responses: ['notInAgeLimit']
    };
    break;
  case 'ageNaN':
    return {
      data: res.age,
      responses: ['ageNaN']
    };
    break;
  default:
    return {
      data: res.plans,
      responses: ['showplans']
    };
  }
});

C.validator('isValidAge', null, (message) => {

  let age = +message;
  let returnData;

  if (age > 60 || age < 18) {
    returnData = {
      age: age,
      response: 'notInAgeLimit'
    };
  }
  else if (_.isNaN(age)) {
    returnData = {
      age: message,
      response: 'ageNaN'
    };
  }
  else {
    returnData = fetch('http://www.mocky.io/v2/57ff29b01300006123dee3a6');
  }

  return returnData;
});

C.response('askage', 'age', (to) => ({
  text: `${to.first_name}, How old are you?`
}));

C.response('notInAgeLimit', 'greetings', (to) => ({
  text: `${to.first_name}, Sorry you are not in permissible age. We serve customer only above 18 years, or below 60 years.`
}));

C.response('ageNaN', 'age', (to, age) => ({
  text: `${to.first_name}, I don't think that "${age}" is your age. Age should be only numbers.`
}));
