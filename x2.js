/** @param {NS} ns **/


export async function main(ns) {
    var hacklvl = ns.getHackingLevel();
    var tservs = ns.read("targs.txt").split('",\r\n"');
    for (var i = 3; i < tservs.length - 5; ++i) {

        var target = tservs[i].split('",');
        var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
        var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

        if (!ns.hasRootAccess(target) && ns.getServerRequiredHackingLevel(target) < hacklvl) {
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
            if (!ns.hasRootAccess(target) && ns.getServerRequiredHackingLevel(target) < hacklvl) {
                ns.nuke(target);
            }
        }
    }

    var tservs = ns.read("targs.txt").split('",\r\n"');
    for (var i = 3; i < tservs.length - 5; ++i) {
        var target = tservs[i].split('",');
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
}
