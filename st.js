/** @param {NS} ns **/
export async function main(ns) {
	ns.tail("st.js");

	var servs = [
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
//		"lexo-corp",
//		"microdyne",
//		"unitalife",
//		"silver-helix",
//		"rho-construction",
//		"netlink",
//		"aevum-police",
//		"summit-uni",
//		"alpha-ent",
//		"solaris",
//		"run4theh111z",
//		"millenium-fitness",
//		"catalyst",
//		"omnia",
//		".",
		"avmnite-02h",
//		"titan-labs",
//		"zb-institute",
//		"rothman-uni",
//		"univ-energy",
		"I.I.I.I",
//		"global-pharm",
//		"omnitek",
//		"blade",
//		"fulcrumtech",
//		"helios",
//		"stormtech",
//		"ecorp",
//		"megacorp",
//		"nwo",
//		"kuai-gong",
//		"deltaone",
//		"zeus-med",
//		"zb-def",
//		"infocomm",
//		"taiyang-digital",
	]

	var home = "home";
	var targ = "foodnstuff";
	var i = 0;
	var f = 0;
	var hacklvl = ns.getHackingLevel();

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

	//kill script then copy current version from home to each serv
	for (i = 0; i < servs.length; ++i) {
		var serv = servs[i].split('",');
		ns.scriptKill("x.js", serv);
		ns.tprint("Copying x.js to " + serv);
		await ns.scp("x.js", home, serv);
	}



	//run x script on each serv to attack target
	for (f = 0; f < servs.length; ++f) {
		//calc how many threads to run based on server max ram
		var serv = servs[f].split('",');
		var maxram = ns.getServerMaxRam(serv);
		var memsc = ns.getScriptRam("x.js");
		var threads = maxram / memsc;

		ns.tprint("Enslaving " + serv);
		ns.exec("x.js", serv, threads, targ);
	}

	//run x script on home server with room to run this script again
	var hthreads = (ns.getServerMaxRam(home) - ns.getScriptRam("st.js")) / ns.getScriptRam("x.js");
	if (ns.scriptRunning("x.js", home)) {
		ns.scriptKill("x.js", home);
	}

	ns.exec("x.js", home, hthreads, targ)
	ns.tprint("Script running on home.");
}
