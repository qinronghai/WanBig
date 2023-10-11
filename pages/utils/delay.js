export function delay(milSec) {
	console.log("延迟2秒.....");
	return new Promise((resolve) => {
		setTimeout(resolve, milSec);
	});
}
