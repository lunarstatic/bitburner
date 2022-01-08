/** @param {NS} ns **/
export async function main(ns) {
	var i = 0;

	while (i <= 24) {
		var hostname = "magi-" + i;
		ns.killall(hostname);
		ns.deleteServer(hostname);
		i = i + 1;

	}
}
