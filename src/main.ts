import {
	ChatInputCommandInteraction,
	Client,
	Events,
	GatewayIntentBits,
	REST,
	Routes,
	SlashCommandBuilder,
} from "discord.js";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_GUILD = process.env.DISCORD_GUILD;

if (!DISCORD_CLIENT_ID || !DISCORD_TOKEN || !DISCORD_GUILD) {
	throw new Error("Missing environment variables");
}

const commands = [
	new SlashCommandBuilder().setName("ping").setDescription(`ping`),
].map((command) => command.toJSON());

const rest = new REST().setToken(DISCORD_TOKEN);

try {
	console.log("Started refreshing application (/) commands.");

	await rest.put(
		Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD),
		{ body: commands },
	);

	console.log("Successfully reloaded application (/) commands.");
} catch (error) {
	console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (readyClient) => {
	console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	try {
		switch (interaction.commandName) {
			case "ping":
				await ping(interaction);
				break;
		}
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

async function ping(interaction: ChatInputCommandInteraction) {
	await interaction.reply("pong");
}

client.login(DISCORD_TOKEN);
