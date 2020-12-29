export interface DocumentData {
	textContent?: string;
	storageURL?: string;
	deleteDate: Date;
	id: string;
}

export const uploadLimit = 20971520; // 20MB

export enum PageStatus {
	Loading = "LOADING",
	Success = "SUCCESS",
	Error = "ERROR",
	Idle = "IDLE",
}
