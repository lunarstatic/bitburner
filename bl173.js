/** @param {NS} ns **/


export async function main(ns) {

	// This script targets any server in targetlist for hacking. It will crack those in the target list, then set up all
	//available servers in the servs list to hack those servers. x0++.js should be your hack/grow/weaken scripts.

	// Script divider variable. Integer value should equal the number of targets in the targetlist. This is to dedicate equal portions of ram to each script running.
	var div = 7;
	var hacklvl = ns.getHackingLevel(); //current Hack level so script does not target/use servers you cannot gain root on.
	//memory dividers need to be adjusted so the script divides into the available ram evenly. General rule is available 
	//ram/script cost, but it does not always divide evenly.
	var pmemdiv = 3.00; //private server ram divider
	var hmemdiv = 3.00; //home computer ram divider
	var memdiv = 3.00; //public server ram divider


	ns.tail("bl173.js"); //monitor script progress



	///////////////////////////////////////////////////////////////////////////////


	//code to kill all running scripts on all public servers. steps through servs array.

	var servs = ns.read("servs.txt").split('",\r\n"');
	for (var e = 1; e < servs.length - 1; ++e) {
		var serv = servs[e].split('",');
		ns.killall(serv);
	}

	//setup home

	var hserv = "home";
	var maxram = ns.getServerMaxRam(hserv);
	var threads = (maxram / div) / hmemdiv;

	for (var x = 0; x < div; ++x) {
		ns.scriptKill("x" + x + ".js", hserv);
		ns.exec("x" + x + ".js", hserv, threads);

	}

	//crack copy and run hack script on public servers
	////////////////////////////////////////////////////////////////////////////////////////////////
	var servs = ns.read("servs.txt").split('",\r\n"');
	for (var j = 1; j < servs.length - 1; ++j) {

		var serv = servs[j].split('",');
		var maxram = ns.getServerMaxRam(serv);
		var threads = (maxram / div) / memdiv;

		if (!ns.hasRootAccess(serv) && ns.getServerMaxRam(serv) > 0 && ns.getServerRequiredHackingLevel(serv) < hacklvl) { //make sure you can hack this server if you haven't already

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

			if (!ns.hasRootAccess(serv) && ns.getServerMaxRam(serv) > 0 && ns.getServerRequiredHackingLevel(serv) < hacklvl) {
				ns.nuke(serv);
			}

			await ns.scp("servs.txt", serv);
			await ns.scp("targs.txt", serv);

			for (var a = 0; a < div; ++a) {
				await ns.scp("x" + a + ".js", serv);
				ns.exec("x" + a + ".js", serv, threads);
			}
		}
	}

	var servs = ns.read("servs.txt").split('",\r\n"');
	for (var z = 1; z < servs.length - 1; ++z) {

		var serv = servs[z].split('",');
		var maxram = ns.getServerMaxRam(serv);
		var threads = (maxram / div) / memdiv;

		if (ns.hasRootAccess(serv) && ns.getServerMaxRam(serv) > 0) { //already root? install and run scripts if the server has more than 0gb of ram.
			for (var o = 0; o < div; ++o) {
				await ns.scp("x" + o + ".js", serv);
				await ns.scp("servs.txt", serv);
				await ns.scp("targs.txt", serv);
				ns.exec("x" + o + ".js", serv, threads); 
			}

		}
	}




	//code to kill all running scripts on all player servers. Assumes you have the max of 25 already.
	for (var int = 0; int < 25; ++int) {
		var pserv = "magi-" + int;
		ns.killall(pserv);
	}

	//code to start copying hack scripts to private servers.
	////////////////////////////////////////////////////////////////////////////////////////////////

	for (var int = 0; int < 25; ++int) {
		var pserv = "magi-" + int;
		var maxram = ns.getServerMaxRam(pserv);
		var threads = (maxram / div) / pmemdiv;

		for (var z = 0; z < div; ++z) {
			await ns.scp("x" + z + ".js", pserv);
			await ns.scp("servs.txt", pserv);
			await ns.scp("targs.txt", pserv);
			ns.exec("x" + z + ".js", pserv, threads);
		}
	}



}
