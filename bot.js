const Discord = require('discord.js');
const auth = require('./auth.json');
const cheerio = require('cheerio');
const request = require('request');
//we will be using shutterstock as for our images
var root_url = "https://www.shutterstock.com/search/";
//create bot
const bot = new Discord.Client();
//a ! means they are activating the bot
const PREFIX = '!';

bot.on('ready', () =>{
    console.log('Bot is online!');
})

//generates url 
def image_finder(tag){
    //page to scrape images from
    var search_url = root_url + tag;
    //store image urls
    var image_urls = [];
    //access site
    request(search_url , function(err, res, body){
        const $ = cheerio.load(body);
        $('img').each(function(i,image){
            images[i] = $(image).attr('src');
        });
    })
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
                
                //output
                const embed = new Discord.RichEmbed()
                .addField('Current Server',msg.guild.name)
                .addField('User Name', msg.author.username)
                .addField('Tag searched:', tag)
                .setImage(tobedecided)
                .setColor('LUMINOUS_VIVID_PINK')
                .setDescription("Image search results");
                
                msg.channel.send(embed);
                break;
            }
            break;

        case 'clear':
            if(!args[1]){
                return msg.reply('please specify how many to clear(an integer under 100).');
            }
            var num_to_del = parseInt(args[1],10) + 1;
            msg.channel.bulkDelete(num_to_del);
    }
})

bot.login(auth.token);