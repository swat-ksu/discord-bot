import { SlashCommandBuilder } from "discord.js";
import { Cog } from "../cog.ts";

export default Cog({
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
