/** @param {NS} ns **/
export async function main(ns) {
	var target = "ecorp"

	
	var hackamt = 1000000000000;
	var weaktime = ns.getWeakenTime(target);
	var growtime = ns.getGrowTime(target);
	var hacktime = ns.getHackTime(target);
	var threads = ns.hackAnalyzeThreads(target, hackamt);
	var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
	var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	var maxram = ns.getServerMaxRam(target);
	var usedram = ns.getServerUsedRam(target);
	var availram = maxram - usedram;



	ns.tprint("Threads needed to hack 1t from : " + target + " " + ns.nFormat(ns.hackAnalyzeThreads(target, hackamt), '0,0'));
	ns.tprint("Time needed to weaken : " + target + " " + ns.tFormat(ns.getWeakenTime(target), '0,0'));
	ns.tprint("Time needed to grow : " + target + " " + ns.tFormat(ns.getGrowTime(target), '0,0'));
	ns.tprint("Time needed to hack : " + target + " " + ns.tFormat(ns.getHackTime(target), '0,0'));




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
