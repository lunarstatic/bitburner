/** @param {NS} ns **/
export async function main(ns) {
    ns.tail("killall.script");

var servs = ns.read("servs.txt").split('",\r\n"');
for (var e = 1; e < servs.length - 1; ++e) {
    var serv = servs[e].split('",');
    ns.killall(serv);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
var pcount = 0; //counter for private servers purchased as the for loops go through.
var pservs = ns.getPurchasedServers();
for (var r = 0; r < pservs.length; ++r) {
    pcount = r + 1;
}

ns.tprint("You have " + pcount + " private servers.");


if (pcount > 0) {
    //code to kill all running scripts on all player servers. Assumes you have the max of 25 already.
    var pservs = ns.getPurchasedServers();
    for (var int = 0; int < pservs.length; ++int) {
        var pserv = "magi-" + int;
        ns.killall(pserv);
    }
} else (ns.tprint("NO PRIV SERVS PURCHASED"))
}
