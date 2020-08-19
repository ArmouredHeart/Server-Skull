/**************************************
*   Project: Servo-Skull
*   Version: 0.0.01
*   Author: Daniel Rideout (ArmouredHeart)
*   Date: 19-08-2020
***************************************/

// *** Imports ***
const Commando = require("discord.js-commando");
const config = require("./config.json");
const client = new Commando.Client({
    commandPrefix: config.prefix,
    unknownCommandResponse: config.unknownCommandResponse,
    owner: config.owner,
    disableEveryone: config.disableEveryone
});

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
try{
    client.login(config.token);
} catch(e){
    console.log(`--> ERROR on Login: ${e}`);
}