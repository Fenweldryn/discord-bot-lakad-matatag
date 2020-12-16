const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = "!";
const path = require("path");
const fs = require('fs');
const folder = '/audios';

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'list') {
        message.reply("\n!lakad\n!next\n!eta\n!tuiona");
    } else if (command == "lakad") {
        play(message.member.voice.channel, 'lakad_matatag.mp3');
    } else if (command == 'next') {
        play(message.member.voice.channel, 'next_level_play.mp3');        
    } else if (command == "tuiona") {
        play(message.member.voice.channel, 'tuiona.mp3');        
    } else if (command == 'eta') {
        play(message.member.voice.channel, 'eta.mp3');        
    }
});  

function play(voiceChannel, fileName) {    
    if (voiceChannel) {
        voiceChannel.join().then(connection => {
            console.log(path.join(__dirname, folder, '/', fileName));
            let dispatcher = connection.play(path.join(__dirname, folder, '/', fileName), { volume: 0.7 });
            dispatcher.on("finish", () => {
                console.log('Finished playing!');
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
        
    }
}

client.login(config.BOT_TOKEN);