import type { ChatInputCommandInteraction, ClientEvents } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import type { Env } from "./env.ts";

export type Context = {
	env: Env;
};

export type Cog<Commands extends string> = {
	commands: Record<Commands, SlashCommandBuilder>;
	setup: (ctx: Context) => {
		commands: {
			[K in Commands]: (
				interaction: ChatInputCommandInteraction,
			) => Promise<void>;
		};
		events: {
			[K in keyof ClientEvents]?: (...args: ClientEvents[K]) => Promise<void>;
		};
	};
};

export function Cog<const Commands extends string>(cog: Cog<Commands>) {
	return cog;
}
