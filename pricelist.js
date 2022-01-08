export async function main(ns) {

	var gblevels = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
		8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576];


	ns.tprint("Current Servers: " + ns.getPurchasedServers());
	ns.tprint("Max Servers Available to Purchase: " + ns.getPurchasedServerLimit());

	var pservs = ns.getPurchasedServers();

	for (var i = 0; i < pservs.length; ++i) {

		var pserv = pservs[i].split('","');
		ns.tprint(pserv + " RAM: " + ns.getServerMaxRam(pserv));
	}

	ns.tprint("You have " + i + " purchased servers.");


	var i = 0;

	while (i <= 19) {

		var ramcost = [];

		ramcost.push(gblevels.pop());

		ns.tprint("Cost for " + ramcost + "gb server: ");
		ns.tprint("$" + ns.nFormat(ns.getPurchasedServerCost(ramcost), '0,0') + " x1");
		ns.tprint("$" + ns.nFormat(ns.getPurchasedServerCost(ramcost) * 25, '0,0') + " x25");




		++i;
	}

}
