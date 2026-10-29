import { REST, Routes } from "discord.js";
import { cogs } from "../cog.ts";
import { getEnv } from "../env.ts";

const env = getEnv();
const rest = new REST().setToken(env.DISCORD_TOKEN);

try {
	console.log("Started refreshing application (/) commands.");

	const commandData = cogs.flatMap((cog) =>
		cog.commands.map((command) => command.data.toJSON()),
	);

	await rest.put(
		Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, env.DISCORD_GUILD),
		{ body: commandData },
	);

	console.log("Successfully reloaded application (/) commands.");
} catch (error) {
	console.error(error);
}
