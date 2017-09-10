/**
 * Created by Rasmus on 11/07/2017.
 */
const queueHandler = require('./queueHandler.js');
const songObj = require('./song.js');
const botSettings = require('./settings.json');
const musicEvents = require('./musicEvents.js');
var dispatcher = "";
var isPlaying = false;
var message = "";
var conn = "";
var bot = "";
var command = "";


let init = function (client) {
    bot = client;
};

var onPlay = function(msg, query) {

    message = msg;

    if(message.member.voiceChannel){

        message.member.voiceChannel.join()
            .then(connection =>  {

                conn = connection;

                if(query === undefined){

                    message.reply("Write the name of the song you want after (.play)");

                } else {

                    let song = new songObj(query);

                    if(queueHandler.getList().length === 0){
                        queueHandler.addToQueue(song);

                        var somevar = playNext();
                        return somevar;

                    } else if(queueHandler.getList().length > 0){

                        message.reply(song.getYt().getInfo(song.getQuery(),function(err, info) {
                            message.reply("Added [" + info.title + "] to the queue");
                        }));

                        queueHandler.addToQueue(song);
                    }

                }

            }).catch(console.log);

    } else {

        message.reply(":x: You must be in a voice channel first!");
    }
};

var playNext = function () {


    // If songs are queued and skipped, the song doesnt play and two "No songs are queued" are displayed
    if(queueHandler.getList().length > 0){

        var currentSong = queueHandler.getList()[0];

        isPlaying = true;

        currentSong.getYt().getInfo(currentSong.getQuery(),function(err, info) {
            message.reply("Now Playing " + info.title);
        });

        dispatcher = conn.playStream(currentSong.getStream());
        return dispatcher;

    } else {

        message.reply("No songs queued at the moment");

    }

};

let onPause = function () {

    try {
        isPlaying = false;
        dispatcher.pause();

    }catch(e) {
        console.log(e);
    }


};

let onResume = function () {

    try {
        isPlaying = true
        dispatcher.resume();
    }catch(e) {
        console.log(e);
    }

};









module.exports.init   = init;
module.exports.onPlay   = onPlay;
module.exports.playNext   = playNext;
module.exports.onPause  = onPause;
module.exports.onResume = onResume;
//module.exports.onSkip   = onSkip;