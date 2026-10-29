import {
	Events,
	MessageReaction,
	User,
	type PartialMessageReaction,
	type PartialUser,
} from "discord.js";
import type { Cog } from "../cog.ts";

const name = "reaction-roles";

const reactionRoleMessageIds = ["1565492712612958400"];

const reactionEmojiToRole: Record<string, string> = {
	"🧑‍🏫": "1565102990094901268" /* @SwAT Mentor */,
};

async function onMessageReactionAdd(
	reaction: MessageReaction | PartialMessageReaction,
	user: User | PartialUser,
) {
	if (reaction.partial) await reaction.fetch();
	if (!reactionRoleMessageIds.includes(reaction.message.id)) return;
	if (!reaction.emoji.name) return;

	const roleId = reactionEmojiToRole[reaction.emoji.name];
	if (!roleId) return;

	const guild = reaction.message.guild;
	if (!guild) return;

	const member = await guild.members.fetch(user.id);
	if (!member) return;

	await member.roles.add(roleId);
}

async function onMessageReactionRemove(
	reaction: MessageReaction | PartialMessageReaction,
	user: User | PartialUser,
) {
	if (reaction.partial) await reaction.fetch();
	if (!reactionRoleMessageIds.includes(reaction.message.id)) return;
	if (!reaction.emoji.name) return;

	const roleId = reactionEmojiToRole[reaction.emoji.name];
	if (!roleId) return;

	const guild = reaction.message.guild;
	if (!guild) return;

	const member = await guild.members.fetch(user.id);
	if (!member) return;

	await member.roles.remove(roleId);
}

export default {
	name,
	commands: [],
	events: {
		[Events.MessageReactionAdd]: onMessageReactionAdd,
		[Events.MessageReactionRemove]: onMessageReactionRemove,
	},
} satisfies Cog;
