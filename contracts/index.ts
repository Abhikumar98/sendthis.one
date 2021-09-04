export interface DocumentData {
	textContent?: string;
	storageURL?: string;
	deleteDate: Date;
	id: string;
	code: string;
	isPasswordProtected: boolean;
	password?: string;
	fileNames?: string[];
	deleted?: boolean;
}

export const uploadLimit = 20971520; // 20MB

export enum PageStatus {
	Loading = "LOADING",
	Success = "SUCCESS",
	Error = "ERROR",
	Idle = "IDLE",
}

export const getURL = (): string => {
	const url =
		process?.env?.URL && process.env.URL !== ""
			? process.env.URL
			: process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ""
			? process.env.VERCEL_URL
			: "http://localhost:3000";
	return url.includes("http") ? url : `https://${url}`;
};

const DEFAULT_TITLE = "Sendthis.one";
const DEFAULT_TITLE_TEMPLATE = "Sendthis.one";
const DEFAULT_DESCRIPTION = "Share files and text anonymously";
const DEFAULT_CANONICAL = getURL();
const SITE_NAME = "Sendthis.one";
const DEFAULT_OG_IMAGE = `${DEFAULT_CANONICAL}/supershot.png`;
const TWITTER_HANDLE = "@abhikumar_98";
const TWITTER_CARD_TYPE = "summary_large_image";
const FAVICON_LINK = "/favicon.ico";

export const SEO = {
	DEFAULT_TITLE,
	DEFAULT_TITLE_TEMPLATE,
	DEFAULT_DESCRIPTION,
	DEFAULT_CANONICAL,
	SITE_NAME,
	DEFAULT_OG_IMAGE,
	TWITTER_HANDLE,
	TWITTER_CARD_TYPE,
	FAVICON_LINK,
};
