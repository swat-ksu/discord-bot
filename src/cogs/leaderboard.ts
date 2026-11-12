import { SlashCommandBuilder } from "discord.js";
import { Octokit } from "octokit";

import { Cog } from "../cog.ts";

export default Cog({
	commands: {
		leaderboard: new SlashCommandBuilder()
			.setName("leaderboard")
			.setDescription("GitHub activity leaderboard"),
	},
	setup: (ctx) => {
		const octokit = new Octokit({ auth: ctx.env.GITHUB_TOKEN });

		return {
			commands: {
				leaderboard: async (interaction) => {
					await interaction.deferReply();

					const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
						org: "swat-ksu",
						per_page: 100,
					});

					const stats = await octokit.rest.repos.getContributorsStats({
						owner: "swat-ksu",
						repo: "...",
					});

					await interaction.reply("pong");
				},
			},
			events: {},
		};
	},
});
