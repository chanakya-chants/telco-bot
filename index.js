/**
 * Created by suman on 16/05/16.
 */


var C = require('chanakya'),
  Cfb = require('chanakya-facebook');

var bot = C.bootstrap({
  mount: 'bot',
  expectation: 'greetings',
  token: 'EAAQUkgHTgBABAIuhzaZBq2ufTIZBwBcSkHNMvjLBKMj2nkSWp8CuUZBvwPUPTCClROpxoeVgGJK87RuvveZAacrxbDdkjSCF4374PIekkaZAxwnLqaeZBGuhWPXu1oVP6UuHQ6HgRmMZCOq7qGCwlQye1FtMOTaFtc7nCpxHSwxSwZDZD'
});

Cfb.init(bot);
