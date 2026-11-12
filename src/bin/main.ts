import "dotenv/config";
import { Client, Events, GatewayIntentBits, Partials } from "discord.js";

import { type Context } from "../cog.ts";
import { cogs } from "../cogs.ts";
import { getEnv } from "../env.ts";

const env = getEnv();

const ctx: Context = { env };

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const setupCogs = cogs.map((cog) => cog.setup(ctx));

for (const cog of setupCogs) {
	for (const [event, listener] of Object.entries(cog.events)) {
		client.on(event, listener);
	}
}

const commands = new Map(setupCogs.flatMap((cog) => Object.entries(cog.commands)));

client.on(Events.ClientReady, (readyClient) => {
	console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	try {
		const command = commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName}?`);
			return;
		}

		await command(interaction);
	} catch (error) {
		console.error(error);

		const content =
			"There was an error while executing this command, more information has been logged.";

		try {
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content });
			} else {
				await interaction.reply({ content });
			}
		} catch (error) {
			console.error(error);
		}
	}
});

await client.login(env.DISCORD_TOKEN);
