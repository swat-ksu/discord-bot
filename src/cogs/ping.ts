import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { Cog } from "../cog.ts";

const name = "ping";

const pingCommandData = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("🏓");

async function pingCommandExecute(interaction: ChatInputCommandInteraction) {
	await interaction.reply("pong");
}

export default {
	name,
	commands: [{ data: pingCommandData, execute: pingCommandExecute }],
	events: {},
} satisfies Cog;
