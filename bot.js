const Discord = require('discord.js');

const auth = require('./auth.json');
//create bot
const bot = new Discord.Client();


const PREFIX = '!';

bot.on('ready', () =>{
    console.log('this bot is online');
})

//find an image with the specified tag
function image_url(tag){
    pass;
}


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
                var error_msg = "sorry, I couldn't find any pictures D:";
                var tag = args[1];
                var img_url = 'https://miro.medium.com/max/630/1*pKSKQW90N0CyV4K0pXCu9w.jpeg';

                const embed = new Discord.RichEmbed()
                .addField('Current Server',msg.guild.name)
                .addField('User Name', msg.author.username)
                .addField('Tag searched:', tag)
                .setImage(img_url)
                .setColor('LUMINOUS_VIVID_PINK')
                .setDescription("Image search results");
                
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

bot.login(auth.token);