//define imports needed from discord

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { Cog } from "../cog.ts";


const name = "search";


//main logic for the search command. 

//1. Take in input user has from slash command
//2. check to see if there is a connection to the outline api
//3. if there is a connection, search for the input
		//if not send a message to user saying the api is down
//4. if there is a match, return in a json file
		//if no match say no matches found

//exports
export default {
	name,
	commands: [{ data: pingCommandData, execute: pingCommandExecute }],
	events: {},
}