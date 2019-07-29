const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjAwNjg2MDgyMTI3ODIyODQ4.XT8ogA.FJHViv6EiJjnkTlmzAxclb-olds';

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
                const embed = new Discord.RichEmbed()
                .addField('User Name', msg.author.username)
                .addField('Tag searched:', tag)
                .setImage('https://miro.medium.com/max/630/1*pKSKQW90N0CyV4K0pXCu9w.jpeg')
                .setColor('LUMINOUS_VIVID_PINK');
                msg.channel.send(embed);
                break;
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