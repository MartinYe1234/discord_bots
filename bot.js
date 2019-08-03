const Discord = require('discord.js');
const auth = require('./auth.json');
const cheerio = require('cheerio');
const request = require('request');

//create bot
const bot = new Discord.Client();
//a ! means they are activating the bot
const PREFIX = '!';

//login to discord using token
bot.login(auth.token);

bot.on('ready', () =>{
    console.log('Bot is online!');
});

//listens for input from user
bot.on("message" , function(message){
    //create array from anything after the PREFIX
    var args = message.content.substring(PREFIX.length).split(" ");

    var action = args[0];

    var parts = args.slice(1).join(" ");

    //different commands that can be executed
    if (action === "info"){
        message.channel.sendMessage('Type !search <tag> to generate a random picture with that tag');
    }

    else if (action == "search"){
        if (!args[1]){
            message.channel.send('You must specify a tag');
        }
        else{
            var error_msg = "sorry, I couldn't find any pictures D:";
            var tag = args[1];

            //find images
            image(message, tag);

            //output some info along with the image
            const embed = new Discord.RichEmbed()
            .addField('Current Server',message.guild.name)
            .addField('User Name', message.author.username)
            .addField('Tag searched:', tag)
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription("Image search results");
            message.channel.send(embed);
        }
    }

    else if (action === "clear"){
        if(!args[1]){
            return message.reply('please specify how many to clear(an integer under 100).');
        }
        var num_to_del = parseInt(args[1],10) + 1;
        message.channel.bulkDelete(num_to_del);
    }
});


function image(message, tag){

    var options = {
        url: "https://www.shutterstock.com/search/" + tag,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, body){
        if (error){
            return;
        }

        $ = cheerio.load(body);

        var urls = [];

        $('img').each(function(i,image){
            urls[i] = $(image).attr('src');
        });

        console.log(urls);
        if (!urls.length) {
            message.channel.send("Sorry, couldn't find anything!");
            return;
        }
        //return first image
        message.channel.send( urls[0] );
    });

    
}

