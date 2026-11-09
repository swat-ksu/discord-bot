import { SlashCommandBuilder } from "discord.js";
import { createCog } from "../cog.ts";

export default createCog({
	commands: {
		ping: new SlashCommandBuilder().setName("ping").setDescription("🏓"),
	},
	setup: () => ({
		commands: {
			ping: async (interaction) => {
				interaction.reply("pong");
			},
		},
		events: {},
	}),
});
