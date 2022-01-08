/** @param {NS} ns **/
export async function main(ns) {
	ns.tail("st.js");

	var servs = [
		"n00dles",
		"foodnstuff",
		"sigma-cosmetics",
		"joesguns",
		"hong-fang-tea",
		"harakiri-sushi",
	]
	var home = "home";
	var targ = "foodnstuff";
	var i = 0;
	var f = 0;



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
