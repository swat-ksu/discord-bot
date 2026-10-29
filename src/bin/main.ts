import { Client, Events, GatewayIntentBits } from "discord.js";
import { cogs, type Command } from "../cog.ts";
import { getEnv } from "../env.ts";

const env = getEnv();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

for (const cog of cogs) {
	for (const [event, listener] of Object.entries(cog.events)) {
		client.on(event, listener);
	}
}

const commands: Map<Command["data"]["name"], Command["execute"]> = new Map(
	cogs.flatMap((cog) =>
		cog.commands.map((command) => [command.data.name, command.execute]),
	),
);

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

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content });
		} else {
			await interaction.reply({ content });
		}
	}
});

client.login(env.DISCORD_TOKEN);
