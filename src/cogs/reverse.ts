import { SlashCommandBuilder } from "discord.js";
import { Cog } from "../cog.ts";

export default Cog({
	commands: {
		reverse: new SlashCommandBuilder()
			.setName("reverse")
			.setDescription("🔀")
			.addStringOption(
				(option) => option.setName("message")
				.setDescription("message to reverse")
				.setRequired(true)
			),
	},
	setup: () => ({
		commands: {
			reverse: async (interaction) => {
				const userInput: string = interaction.options.getString(
					"message",
					true,
				);

				await interaction.reply([...userInput].reverse().join(""));
			},
		},
		events: {},
	}),
});
