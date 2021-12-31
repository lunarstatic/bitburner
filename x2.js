/** @param {NS} ns **/

// Infinite loop that continously hacks/grows/weakens the target server

export async function main(ns) {
    var target = "silver-helix";
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;


    if (ns.fileExists("BruteSSH.exe")) {
        ns.brutessh(target);
    }
    if (ns.fileExists("FTPCrack.exe")) {
        ns.ftpcrack(target);
    }
    if (ns.fileExists("HTTPWorm.exe")) {
        ns.httpworm(target);
    }
    if (ns.fileExists("relaySMTP.exe")) {
        ns.relaysmtp(target);
    }
    if (ns.fileExists("SQLInject.exe")) {
        ns.sqlinject(target);
    }

    ns.nuke(target);



    while (ns.hasRootAccess(target)) {
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
