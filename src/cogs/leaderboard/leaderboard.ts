import { readFile } from "node:fs/promises";

import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import { Octokit } from "octokit";
import sharp from "sharp";

import { Cog } from "../../cog.ts";

const template = await readFile(new URL("template.typ", import.meta.url), "utf8");

export default Cog({
	commands: {
		leaderboard: new SlashCommandBuilder()
			.setName("leaderboard")
			.setDescription("GitHub activity leaderboard"),
	},
	setup: (ctx) => {
		const octokit = new Octokit({ auth: ctx.env.GITHUB_TOKEN });
		const compiler = NodeCompiler.create();

		return {
			commands: {
				leaderboard: async (interaction) => {
					await interaction.deferReply();

					// const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
					// 	org: ctx.env.GITHUB_ORG,
					// 	per_page: 100,
					// });

					// const stats = await octokit.rest.repos.getContributorsStats({
					// 	owner: ctx.env.GITHUB_ORG,
					// 	repo: repo.name,
					// });

					const data = {};

					const svg = compiler.plainSvg({
						mainFileContent: template,
						inputs: {
							data: JSON.stringify(data),
						},
					});

					const png = await sharp(Buffer.from(svg)).png().toBuffer();

					const file = new AttachmentBuilder(png, { name: "leaderboard.png" });

					await interaction.editReply({ files: [file] });
				},
			},
			events: {},
		};
	},
});
