/** @param {NS} ns **/
export async function main(ns) {
var maxram = 131072;


var homemoney = ns.getServerMoneyAvailable("home");
var servcost25 = ns.getPurchasedServerCost(maxram) * 25;

for (var i = 0; i < ns.getPurchasedServerLimit(); ++i) {

    if (homemoney > servcost25) {
        var hostname = "magi-" + i;
        ns.purchaseServer(hostname, maxram);
    }
}
ns.exec("bl173.js", "home", 1);
}
