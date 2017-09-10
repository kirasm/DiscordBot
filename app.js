const botSettings = require('./settings.json');
const musicEvents = require('./musicEvents.js');
const eventHandler = require('./eventHandler.js');
const queueHandler = require('./queueHandler.js');
const utility = require('./utility.js');
const discord = require('discord.js');
const client = new discord.Client();
var dispatcher = "dff";

client.on('ready', async() => {

    console.log('Logged in as ' + client.user.tag );
    musicEvents.init(client);

});


client.on('message', msg => {


    var command = msg.content.split(" ")[0];
    var query = msg.content.split(" ")[1];

    if(command === botSettings.prefix + "play") {

        musicEvents.onPlay(msg, query, function(returnValue) {

        });
    }

    if (command === botSettings.prefix + "pause") {
        musicEvents.onPause(msg);
    }

    if (command === botSettings.prefix + "skip") {
        onSkip();
    }

    if (command === botSettings.prefix + "resume") {

        musicEvents.onResume(msg);
    }

    if (command === botSettings.prefix + "invite") {
        utility.joinServer(client);
    }

    if (command === botSettings.prefix + "ping") {
        msg.channel.send(`\`${msg.createdTimestamp - Date.now()} ms\``);
    }



});



if(typeof dispatcher !== "string"){

    dispatcher.on('end', () => {

        queueHandler.removeLastInQueue();
        dispatcher = musicEvents.playNext();

    });
}

let onSkip = function () {

    console.log(typeof dispatcher);

    dispatcher.end();

};


client.login(botSettings.token);



