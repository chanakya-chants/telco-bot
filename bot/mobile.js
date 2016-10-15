/**
 * Created by suman on 13/10/16.
 */

'use strict';

const C = require('chanakya'),
  _ = require('lodash'),
  fetch = require('node-fetch');

C.response('askMobile', 'mobile', (to) => ({
  text: `What is your mobile number ${to.first_name}? (Please include country code with +)`
}));

C.response('notNumber', 'mobile', (to, response) => ({
  text: `${to.first_name}, ${response.error.info}`
}));

C.response('invalidPhoneNo', 'mobile', (to, response) => ({
  text: `${to.first_name}, looks like ${response.number} is not a valid phone no. Please try again. Do not forget to include country code with +)`
}));

C.response('sendOTP', 'otp', (to, phoneDetails) => ({
  text: `I have send an OTP to the phone number ${phoneDetails.international_format}. Please type your OTP below after you receive it.`
}));

C.response('wrongOTP', 'otp', (to, phoneDetails) => ({
  text: `I have send an OTP to the phone number ${phoneDetails.international_format}. Please type your OTP below after you receive it.`
}));

C.response('bill', 'doPostback', function() {
  let today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '/' + dd + '/' + yyyy;
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": `Bill summary as on ${today}`,
            "image_url": "http://boiling-gorge-79536.herokuapp.com/img/bill.png",
            "subtitle": `To help you further choose a command`,
            "buttons": [
              {
                "type": "web_url",
                "title": "Detailed bill",
                "url": "http://www.google.com"
              }, {
                "type": "postback",
                "title": "Update Plan",
                "payload": "update"
              }, {
                "type": "postback",
                "title": "Recommended Plan",
                "payload": "recommended"
              }
            ]
          }
        ]
      }
    }
  };
});

C.response('recommended', 'doPostback', function() {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'Plan recommendation',
            subtitle: `Seems that you like streaming music and videos. Based on your usage, we can recommend you plans that will benefit you. Ready to check it out!!!`,
            buttons: [
              {
                type: 'postback',
                title: 'Show me better plans.',
                payload: 'plans'
              }, {
                type: 'postback',
                title: 'No',
                payload: 'start'
              }
            ]
          }
        ]
      }
    }
  };
});

C.response('plans', 'doPostback', function() {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "My Plan 299",
            // "image_url": "http://lorempixel.com/191/100/abstract/",
            "subtitle": "2GB free data usage for 45 days",
            "buttons": [
              {
                "type": "postback",
                "title": "Buy",
                "payload": "buy"
              }
            ]
          },
          {
            "title": "My Plan 499",
            // "image_url": "http://lorempixel.com/191/100/technics/",
            "subtitle": "4GB free data usage for 45 days",
            "buttons": [
              {
                "type": "postback",
                "title": "Buy",
                "payload": "buy"
              }
            ]
          }
        ]
      }
    }
  };
});

C.response('offers', 'doPostback', function() {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Digital TV",
            // "image_url": "http://lorempixel.com/191/100/abstract/",
            "subtitle": "Record up to 750 hours of live TV",
            "buttons": [
              {
                "type": "web_url",
                "title": "Buy",
                "url": "http://www.google.com"
              }
            ]
          }
        ]
      }
    }
  };
});

C.response('buy', 'greetings', function() {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "receipt",
        "recipient_name": `Suman Paul`,
        "order_number": _.random(1000000, 9999999, false),
        "currency": "INR",
        "payment_method": "Visa 2345",
        "elements": [
          {
            "title": "My Plan 499",
            "subtitle": "4GB free data usage for 45 days",
            "quantity": 1,
            "price": 499,
            "currency": "INR",
            "image_url": "http://lorempixel.com/191/100/abstract/"
          }
        ],
        "summary": {
          "subtotal": 490.00,
          "total_tax": 9.00,
          "total_cost": 499.00
        }
      }
    }
  };
});

C.expectation('mobile', ['isMobile'], (res) => {
  if (!_.isUndefined(res.success) && !res.success) {
    return {
      data: res,
      responses: ['notNumber']
    };
  } else {
    if (res.valid) {
      return {
        data: res,
        responses: ['sendOTP']
      };
    } else {
      return {
        data: res,
        responses: ['invalidPhoneNo']
      };
    }
  }
});

C.expectation('otp', ['isOTP'], (isOTP) => {
  return isOTP ? {
    data: null,
    responses: ['bill']
  } : {
    data: null,
    responses: ['wrongOTP']
  };
});

C.validator('isMobile', null, (phone) => {
  return fetch(`http://apilayer.net/api/validate?access_key=eba101687da317945a45f798464256da&number=${phone}&country_code=&format=1`)
});

C.validator('isOTP', null, (otp) => {
  return +otp === 1234
});
