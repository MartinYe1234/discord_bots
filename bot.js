const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjAwNjg2MDgyMTI3ODIyODQ4.XT5-NA.t4L4SnUmjEXaZVUDEDdr1lSkucI';

const PREFIX = '!';

bot.on('ready', () =>{
    console.log('this bot is online');
})

//listens for input from user
bot.on('message', msg=>{
    //create array from anything after the PREFIX
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

        case 'ping':
            msg.reply('pong');
        break;
    }
})

bot.login(token);