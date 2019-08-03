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
    //the type of command to execute
    var action = args[0];
    //the bits that come after
    var parts = args.slice(1).join(" ");
    //different commands that can be executed
    //info command
    if (action === "info"){
        message.channel.send('Type !cmds to see all available commands');
    }
    //search command
    else if (action == "search"){
        if (!args[1]){
            message.channel.send('You must specify a tag');
        }
        else{
            var error_msg = "sorry, I couldn't find any pictures D:";
            var tags = args.slice(1);

            //find images
            gen_img(message, tags);

            //output some info along with the image
            const embed = new Discord.RichEmbed()
            .addField('Current Server',message.guild.name)
            .addField('User Name', message.author.username)
            .addField('Tag(s) searched:', tags)
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription("Image search results");
            message.channel.send(embed);
        }
    }
    //cmds command
    else if(action === "cmds"){
        msg1 = "Type !search <tag> to search an image with the specified tag, to specify multiple tags simple put a space in between tags.";
        msg2 = "Type !clear <amount> to delete indicated amount of previous messages (the command is not included in the amount)";

        message.channel.send({embed: {
            color: 3447003,
            title: "Commands:",
            fields: [
                { name: "Available Commands", value: (msg1 +"\n\n"+msg2), inline: true}
                ]
            }
        });
    }
    //clear command
    else if (action === "clear"){
        //if no amount is specified
        if(!args[1]){
            return message.reply('please specify how many to clear(an integer under 100).');
        }
        //delete amount + 1 to account for the clear command itself
        var num_to_del = parseInt(args[1],10) + 1;
        message.channel.bulkDelete(num_to_del);
    }

});

//
function gen_img(message, tags){

    var options = {
        url: "https://www.shutterstock.com/search/" + tags,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, body){
        if (error){
            message.channel.send("Sorry, the website would not load!");
            return;
        }
        //load the body of the website
        $ = cheerio.load(body);

        var urls = []

        $('img').each(function(i,image){
            urls[i] = $(image).attr('src');
        });
        //if there are no images
        if (!urls.length) {
            message.channel.send("Sorry, couldn't find anything!");
            return;
        }
        //return a random image out of the list of images
        //generates a random index
        index = Math.floor((Math.random() * urls.length));
        //send the image out
        message.channel.send( urls[index] );
    });
}