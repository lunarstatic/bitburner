/** @param {NS} ns **/


export async function main(ns) {


    var tservs = ns.read("targs.txt").split('",\r\n"');
    for (var i = 5; i < tservs.length - 3; ++i) {

        var target = tservs[i].split('",');
        var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
        var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

        if (!ns.hasRootAccess(target) && ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) < hacklvl) {
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
        }
    }

    var tservs = ns.read("targs.txt").split('",\r\n"');
    for (var i = 5; i < tservs.length - 3; ++i) {
        var target = tservs[i].split('",');
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
}
