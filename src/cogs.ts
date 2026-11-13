import type { Cog } from "./cog.ts";
import ping from "./cogs/ping.ts";
import reactionRoles from "./cogs/reaction-roles.ts";
import reverse from "./cogs/reverse.ts";

export const cogs: Cog<any>[] = [ping, reactionRoles, reverse];
