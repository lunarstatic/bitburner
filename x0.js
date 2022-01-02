/** @param {NS} ns **/


export async function main(ns) {
    var tservs = ns.read("targs.txt").split('",\r\n"');
    for (var i = 1; i < tservs.length - 7; ++i) {

        var target = tservs[i].split('",');
        var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
        var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

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
