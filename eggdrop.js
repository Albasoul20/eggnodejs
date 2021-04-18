var irc = require('irc');
const request = require('request');
const cheerio = require('cheerio');

var client = new irc.Client('irc.albasoul.com', 'Horoskopi', {
    channels: ['#shqiperia'],
    userName: 'Albasoul',
    realName: 'Albasoul.Com Horoskopi SHQIP',
});
client.addListener('message', function (from, to, message) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();
    var dateX = dd+"-"+mm+"-"+yy;
    var command = message.split(' ')[0];
    let zodiac = message.toLowerCase().split(' ')[1];

    if (command == '!h') {
        console.log("Executing command: %s", command);

      switch(zodiac) {
        case 'dashi':  
        case 'demi':
        case 'gaforrja':
        case 'binjaket':
        case 'luani':
        case 'virgjeresha':
        case 'peshorja':
        case 'akrepi':
        case 'shigjetari':
        case 'bricjapi':
        case 'ujori':
        case 'peshqit':
        request('http://top-channel.tv/horoskopi/'+dateX+'/?shenja='+zodiac, function (error, response, body) {
                const $ = cheerio.load(body);
                var resp = $('p', '.noPadding').text();
                client.say(to, zodiac.toUpperCase()+": ("+dateX+") "+resp);
              });
        break;
        default:
        client.say(to, "Shenja horiskopit e pasakte. Shembull: !h akrepi");
      }



    }
    
    if (command == '!reg') {
    // Funksioni rregjistrimit.
    let email = message.split(' ')[1];
    let password = message.split(' ')[2];
    isChannel = to.match(/#/i); 
    if (isChannel) {
    client.say(to, "Kjo komande mund te perdoret vetem ne privat."); 
    } else {

     if (validateEmail(email)) {
         
      Client.say("NickServ", "register "+ email + " "+ password);   
      Client.say(to, "Regjistrimi u krye me sukses!");   
         
     } else {
     client.say(to, "Email nuk eshte i sakte. formati person@email.com");     
     }
        
    }
        
        
       
    }
    
    
    
    if (command == '!oper') {
    // Funksioni Oper.
    let oper = message.split(' ')[1];
    let pass = message.split(' ')[2];
    isChannel = to.match(/#/i); 
    if (isChannel) {
    // komande e dhene ne publik. Nuk merret parasysh
    } else {
     client.send('OPER ' + oper + ' ' + pass + '', '', '', '');
    }

    }
    
    

});

client.addListener('error', function(message) {
    console.log('error: ', message);
});
        
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

