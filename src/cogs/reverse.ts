import { SlashCommandBuilder } from "discord.js";

import { Cog } from "../cog.ts";

const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

export default Cog({
	commands: {
		reverse: new SlashCommandBuilder()
			.setName("reverse")
			.setDescription("🔀")
			.addStringOption((option) =>
				option.setName("message").setDescription("message to reverse").setRequired(true),
			),
	},
	setup: () => ({
		commands: {
			reverse: async (interaction) => {
				const userInput = interaction.options.getString("message", true);

				const segments = [...segmenter.segment(userInput)];
				const reversed = segments
					.map((s) => s.segment)
					.reverse()
					.join("");

				await interaction.reply(reversed);
			},
		},
		events: {},
	}),
});
