const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjAwNjg2MDgyMTI3ODIyODQ4.XT5QlA.Zn6uDAmPlUsqVNFNDVbK3CAOkLo';

bot.on('ready', () =>{
    console.log('this bot is online');
})

bot.on('message', msg=>{
    if(msg.content === "HELLO"){
        msg.reply("yes?");
    }
})

bot.login(token);