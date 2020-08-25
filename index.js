/**************************************
*   Project: Servo-Skull
*   Version: 0.0.01
*   Author: ArmouredHeart#1208
*   Date: 19-08-2020
***************************************/

// *** Imports ***
const DISCORD = require("discord.js");
const CONFIG = require("./config.json"); // point to config file
const CLIENT = new DISCORD.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); // create a new Discord client

// *** Listeners ***

// when the client is ready, run this code
// this event will only trigger one time after logging in
CLIENT.once('ready', () => {

    try{
        //send messege in console upon login
        console.log(`Connecting as '${CLIENT.user.tag}'...`);
        console.log('Ready!');
    } catch(e) {
        console.log(`--> ERROR: ${e}`)
    }

});

// Listen for reactions
CLIENT.on('messageReactionAdd', async (reaction, user) => {
    
    // this gives people the basic role when they react to the rules message
    // no idea how this works. 
    let applyRole = async () => {
        //console.log(`Looking for role...`);
        let role = reaction.message.guild.roles.cache.find(role => role.name == CONFIG.basicRoleName);
        let member = reaction.message.guild.members.cache.find(member => member.id == user.id);
        if (role && member) {
            logger(`Giving member '${member.user.tag}' the role '${role.name}'!`);
            await member.roles.add(role);
        }
    }

    // I don't understand partials
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            if (msg.id === CONFIG.rulesAcceptMessageID) {
                //console.log("Cached - Applied");
                applyRole();
            }
        }
        catch (e) {
            logger(`--> ERROR: ${e}`);
        }
    } else {
        //console.log("Not a Partial");
        if (reaction.message.id === CONFIG.rulesAcceptMessageID) {
            //console.log("Not a Partial - applied")
            applyRole();
        }
    }

});

// Listen for messages
CLIENT.on('message', message => {
	//TODO implement
});

// *** Methods ***

/**
 * Helper method that outputs errors and actions taken by this bot
 * to its control interface.
 * @param {String} output_text 
 */
function logger(output_text) {
    console.log(`${output_text}`);
}

// *** Login ***

// login to Discord with your app's token
try{
    CLIENT.login(CONFIG.token);
} catch(e){
    logger(`--> ERROR during login: ${e}`);
}