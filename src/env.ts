export type Env = {
	DISCORD_CLIENT_ID: string;
	DISCORD_TOKEN: string;
	DISCORD_GUILD: string;
	GITHUB_TOKEN: string;
	GITHUB_ORG: string;
};

export function getEnv(): Env {
	const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
	const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
	const DISCORD_GUILD = process.env.DISCORD_GUILD;
	const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
	const GITHUB_ORG = process.env.GITHUB_ORG;

	if (!DISCORD_CLIENT_ID) {
		throw new Error("Missing environment variable: DISCORD_CLIENT_ID");
	}

	if (!DISCORD_TOKEN) {
		throw new Error("Missing environment variable: DISCORD_TOKEN");
	}

	if (!DISCORD_GUILD) {
		throw new Error("Missing environment variable: DISCORD_GUILD");
	}

	if (!GITHUB_TOKEN) {
		throw new Error("Missing environment variable: GITHUB_TOKEN");
	}

	if (!GITHUB_ORG) {
		throw new Error("Missing environment variable: GITHUB_ORG");
	}

	return { DISCORD_CLIENT_ID, DISCORD_TOKEN, DISCORD_GUILD, GITHUB_TOKEN, GITHUB_ORG };
}
