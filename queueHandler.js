/**
 * Created by Rasmus on 12/07/2017.
 */
var songQueue = [];

let addToQueue = function (song) {

    songQueue.push(song);
};

let removeFirstInQueue = function () {

    songQueue.pop();

};

let removeLastInQueue = function () {

    songQueue.shift();

};


let getList = function () {

    return songQueue;
};

module.exports.addToQueue              = addToQueue;
module.exports.getList                 = getList;
module.exports.removeFirstInQueue      = removeFirstInQueue;
module.exports.removeLastInQueue       = removeLastInQueue;
//module.exports.removeSpecificFromQueue = removeSpecificFromQueue;







