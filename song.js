/**
 * Created by Rasmus on 12/07/2017.
 */
class song {

    constructor(query){

        const yt = require('ytdl-core');

        this.yt = yt;

        this.query = query;

        var stringArray = query.substr(0, 5);

        if(stringArray === "https"){

            this.stream = yt(query, {audioonly: true});

        } else {

            this.stream = yt.downloadFromInfo(query, {audioonly: true});
        }


    }
    getYt(){
        return this.yt;
    }

    getStream(){
        return this.stream;
    }

    getQuery(){
        return this.query;
    }


}

module.exports = song;
