import { CronJob } from "quirrel/vercel";
import fetch from "node-fetch";

export default CronJob("api/delete", "0 * * * *", async () => {
	try {
		await fetch("/api/delete");
	} catch (error) {
		console.error(error);
	}
});
