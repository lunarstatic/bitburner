/** @param {NS} ns **/
export async function main(ns) {
	var target = ns.args[0];

	var mThresh = ns.getServerMaxMoney(target) * 0.75;
	var sThresh = ns.getServerMinSecurityLevel(target) + 5;

	while (ns.hasRootAccess(target)) {

		if (ns.getServerSecurityLevel(target) > sThresh) {

			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < mThresh) {

			await ns.grow(target);
		} else {

			await ns.hack(target);
		}

	}
}
