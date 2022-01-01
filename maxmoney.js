/** @param {NS} ns **/
export async function main(ns) {
    
	var servs = ns.read("servs.txt").split('",\r\n"');
	for (var e = 1; e < servs.length - 1; ++e) {
		var serv = servs[e].split('",');
		ns.tprint("Max money for " + serv + ": $" + ns.nFormat(ns.getServerMaxMoney(serv), '0,0') + " LEVEL: " + ns.getServerRequiredHackingLevel(serv));
	}

}
