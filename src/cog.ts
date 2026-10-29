import type {
	ChatInputCommandInteraction,
	ClientEvents,
	SlashCommandBuilder,
} from "discord.js";
import ping from "./cogs/ping.ts";

export interface Cog {
	name: string;
	commands: Command[];
	events: {
		[Event in keyof ClientEvents]?: (...args: ClientEvents[Event]) => void;
	};
}

export type Command = {
	data: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export const cogs: Cog[] = [ping];
