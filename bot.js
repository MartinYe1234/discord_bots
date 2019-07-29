const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjAwNjg2MDgyMTI3ODIyODQ4.XT8icA.BsxxG7N2VqOT4Lm8gzhytI9WDaw';

const PREFIX = '!';

bot.on('ready', () =>{
    console.log('this bot is online');
})

//listens for input from user
bot.on('message', msg=>{

    //create array from anything after the PREFIX
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

        case 'info':

            msg.channel.sendMessage('Type !search <tag> to generate a random picture with that tag');
            break;

        case 'search':

            if (!args[1]){
                msg.channel.send('You must specify a tag');
            }
            else{
                var tag = args[1];
            }
            break;

        case 'clear':

            if(!args[1]){
                return msg.reply('please specify how many to clear.');
            }
            var num_to_del = parseInt(args[1],10) + 1;
            msg.channel.bulkDelete(num_to_del);
    }
})

bot.login(token);