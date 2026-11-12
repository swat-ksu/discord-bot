import type { Cog } from "./cog.ts";
import leaderboard from "./cogs/leaderboard/leaderboard.ts";
import ping from "./cogs/ping.ts";
import reactionRoles from "./cogs/reaction-roles.ts";

export const cogs: Cog<any>[] = [ping, reactionRoles, leaderboard];
