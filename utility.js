/**
 * Created by Rasmus on 11/07/2017.
 */

let joinServer = function (client) {

    try{
        client.generateInvite(['ADMINISTRATOR']).then(link => {
            console.log(link);
        });
    }catch (e){

    }
    
}; 

module.exports.joinServer = joinServer;