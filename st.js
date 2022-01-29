/** @param {NS} ns **/
export async function main(ns) {
	ns.tail("st.js");

	var home = "home";
	var targ = "n00dles";
	var i = 0;
	var f = 0;
	var hacklvl = ns.getHackingLevel();
	var script = "lvl.js";


	var servs = [
		"n00dles",
		"foodnstuff",
		"sigma-cosmetics",
		"joesguns",
		"nectar-net",
		"hong-fang-tea",
		"harakiri-sushi",
		"neo-net",
		"zer0",
		"max-hardware",
		"iron-gym",
		"phantasy",
		"omega-net",
		"the-hub",
		"lexo-corp",
		"microdyne",
		"unitalife",
		"silver-helix",
		"rho-construction",
		"netlink",
		"aevum-police",
		"summit-uni",
		"alpha-ent",
		"solaris",
		"run4theh111z",
		"millenium-fitness",
		"catalyst",
		"omnia",
		".",
		"avmnite-02h",
		"titan-labs",
		"zb-institute",
		"rothman-uni",
		"univ-energy",
		"I.I.I.I",
		"global-pharm",
		"omnitek",
		"blade",
		"fulcrumtech",
		"helios",
		"stormtech",
		"ecorp",
		"megacorp",
		"nwo",
	]


	//count how many exes we have
	var execount = 0;
	if (ns.fileExists("BruteSSH.exe")) {
		++execount
	}
	if (ns.fileExists("FTPCrack.exe")) {
		++execount
	}
	if (ns.fileExists("HTTPWorm.exe")) {
		++execount
	}
	if (ns.fileExists("relaySMTP.exe")) {
		++execount
	}
	if (ns.fileExists("SQLInject.exe")) {
		++execount
	}

	ns.tprint("You have " + execount + " port openers."); //How many exe's do I have?

	for (var j = 0; j < servs.length; ++j) {
		var serv = servs[j].split('",');
		if (!ns.hasRootAccess(serv) && ns.getServerRequiredHackingLevel(serv) <= hacklvl) { //make sure you can hack this server if you haven't already

			if (ns.fileExists("BruteSSH.exe")) {
				ns.brutessh(serv);
			} else (ns.tprint("BruteSSH.exe does not exist."));
			if (ns.fileExists("FTPCrack.exe")) {
				ns.ftpcrack(serv);
			} else (ns.tprint("FTPCrack.exe does not exist."));
			if (ns.fileExists("HTTPWorm.exe")) {
				ns.httpworm(serv);
			} else (ns.tprint("HTTPWorm.exe does not exist."));
			if (ns.fileExists("relaySMTP.exe")) {
				ns.relaysmtp(serv);
			} else (ns.tprint("relaySMTP.exe does not exist."));
			if (ns.fileExists("SQLInject.exe")) {
				ns.sqlinject(serv);
			} else (ns.tprint("SQLInject.exe does not exist."));

			if (ns.getServerNumPortsRequired(serv) <= execount) {
				ns.nuke(serv);
			} else (ns.tprint("Cannot NUKE " + targ + " : Cannot open the needed # of ports."))
		}
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
			var pserv = pservs[int];
			ns.killall(pserv);
		}

		//code to start copying hack scripts to private servers.
		////////////////////////////////////////////////////////////////////////////////////////////////

		var pservs = ns.getPurchasedServers();
		for (var int = 0; int < pservs.length; ++int) {

			var pserv = pservs[int];
			var maxram = ns.getServerMaxRam(pserv);
			var usedram = ns.getServerUsedRam(pserv);
			var availram = maxram - usedram;
			var threads = availram / ns.getScriptRam(script);


			await ns.scp(script, pserv);
			ns.exec(script, pserv, threads, targ);


		}
	} else (ns.tprint("NO PRIV SERVS PURCHASED"))






	//kill script then copy current version from home to each serv
	for (i = 0; i < servs.length; ++i) {
		var serv = servs[i].split('",');
		ns.scriptKill(script, serv);
		ns.tprint("Copying script to " + serv);
		await ns.scp(script, home, serv);
	}



	//run x script on each serv to attack target
	for (f = 0; f < servs.length; ++f) {
		//calc how many threads to run based on server max ram
		var serv = servs[f].split('",');
		var maxram = ns.getServerMaxRam(serv);
		var memsc = ns.getScriptRam(script);
		var threads = maxram / memsc;

		ns.tprint("Enslaving " + serv);
		ns.exec(script, serv, threads, targ);
	}

	//run x script on home server with room to run this script again
	var hthreads = (ns.getServerMaxRam(home) - ns.getScriptRam(script)) / ns.getScriptRam(script);
	if (ns.scriptRunning(script, home)) {
		ns.scriptKill(script, home);
	}

	ns.exec(script, home, hthreads, targ)
	ns.tprint("Script running on home.");


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
			var pserv = pservs[int];
			ns.killall(pserv);
		}

		//code to start copying hack scripts to private servers.
		////////////////////////////////////////////////////////////////////////////////////////////////

		var pservs = ns.getPurchasedServers();
		for (var int = 0; int < pservs.length; ++int) {

			var pserv = pservs[int];
			var maxram = ns.getServerMaxRam(pserv);
			var usedram = ns.getServerUsedRam(pserv);
			var availram = maxram - usedram;
			var threads = availram / ns.getScriptRam(script);




			await ns.scp(script, pserv);
			ns.exec(script, pserv, threads, targ);


		}
	} else (ns.tprint("NO PRIV SERVS PURCHASED"))


}
