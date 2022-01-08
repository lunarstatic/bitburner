/** @param {NS} ns **/
export async function main(ns) {
	var target = ns.args[0];

	var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
	var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

	ns.tprint(target + " Max Money: " + ns.getServerMaxMoney(target));

	while (ns.hasRootAccess(target)) {

		if (ns.getServerSecurityLevel(target) > securityThresh) {

			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {

			await ns.grow(target);
		} else {

			await ns.hack(target);
		}

	}
}
