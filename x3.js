/** @param {NS} ns **/

// Infinite loop that continously hacks/grows/weakens the target server

export async function main(ns) {
var target = "megacorp";

// Defines how much money a server should have before we hack it
// 75% of the server's max money
var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

// Defines the maximum security level the target server can
// have. If the target's security level is higher than this,
// we'll weaken it before doing anything else
var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

	while (true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			// If the server's security level is above our threshold, weaken it
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			// If the server's money is less than our threshold, grow it
			await ns.grow(target);
		} else {
			// Otherwise, hack it
			await ns.hack(target);
		}
	}


}
