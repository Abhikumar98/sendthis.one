export interface DocumentData {
	textContent?: string;
	storageURL?: string;
	deleteDate: Date;
	id: string;
	code: string;
	isPasswordProtected: boolean;
	password?: string;
	fileNames?: string[];
}

export const uploadLimit = 20971520; // 20MB

export enum PageStatus {
	Loading = "LOADING",
	Success = "SUCCESS",
	Error = "ERROR",
	Idle = "IDLE",
}
