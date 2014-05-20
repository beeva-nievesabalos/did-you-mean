var natural = require('natural'),
	utils = require("./utils");

exports.jarowinklerDistanceWord = function(query, listacontrol, callback){
	var exactHash= {};
	var similarHash= {};
	//Jaro–Winkler string distance
	for(var i = 0; i < listacontrol.length; i++){
		var distance = natural.JaroWinklerDistance(listacontrol[i], query);
		//console.log("Jaro–Winkler: '"+companyList[i]+"' y '"+query+"'="+distance);
		if(distance < 1 && distance > 0.88){
			similarHash[listacontrol[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[listacontrol[i]]=distance;
			}
		}
	}

	if(!utils.isEmpty(similarHash)){
		console.log("(1) Jaro–Winkler string distance");
		console.log("* similarHash(unsorted): ");
		console.log(similarHash);
	}

	if(utils.isEmpty(exactHash)){
		if(!utils.isEmpty(similarHash)){
			var newSimilarHash = utils.getSortedKeysInverse(similarHash);
			console.log("Did you mean..."+newSimilarHash[0]+"?");
			var resultado = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, resultado);
		}
		else{
			console.log("(1) Jaro–Winkler string distance");
			console.log("No match con nada");
			callback(1, null);
		}
	}
	else {
		console.log("(1) Jaro–Winkler string distance");
		console.log("Exact query :)");
		var resultado = [query, exactHash[query]];
		callback(2, resultado);
	}
}

exports.levenshteinDistanceWord = function(query, listacontrol, callback){
	var exactHash= {};
	var similarHash= {};
	//Levenshtein distance
	for(var i = 0; i < listacontrol.length; i++){
		var distance = natural.LevenshteinDistance(listacontrol[i], query);
		//console.log("Levenshtein: '"+companyList[i]+"' y '"+query+"'="+distance);
		if(distance > 0 && distance < 3){
			similarHash[listacontrol[i]]=distance;
		}
		else {
			if(distance==0){
				exactHash[listacontrol[i]]=distance;
			}
		}
	}

	if(!utils.isEmpty(similarHash)){
		console.log("(2) Levenshtein distance");
		console.log("* similarHash(unsorted): ");
		console.log(similarHash);
	}

	if(utils.isEmpty(exactHash)){
		if(!utils.isEmpty(similarHash)){
			var newSimilarHash = utils.getSortedKeysInverse(similarHash);
			console.log("Did you mean..."+newSimilarHash[0]+"?");
			var resultado = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, resultado);
		}
		else{
			console.log("(2) Levenshtein distance");
			console.log("No match con nada");
			callback(1, null);
		}
	}
	else {
		console.log("(2) Levenshtein distance");
		console.log("Exact query :)");
		var resultado = [query, exactHash[query]];
		callback(2, resultado);
	}
}

exports.dicesDistanceWord = function(query, listacontrol, callback){
	var exactHash= {};
	var similarHash= {};
	//Dice's coefficient distance
	for(var i = 0; i < listacontrol.length; i++){
		var distance = natural.DiceCoefficient(listacontrol[i], query);
		if(distance < 1 && distance > 0.70){
			similarHash[listacontrol[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[listacontrol[i]]=distance;
			}
		}
	}

	if(!utils.isEmpty(similarHash)){
		console.log("(3) Dice's coefficient");
		console.log("* similarHash(unsorted): ");
		console.log(similarHash);
	}

	if(utils.isEmpty(exactHash)){
		if(!utils.isEmpty(similarHash)){
			var newSimilarHash = utils.getSortedKeys(similarHash);
			console.log("Did you mean..."+newSimilarHash[0]+"?");
			var resultado = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, resultado);
		}
		else{
			console.log("(3) Dice's coefficient");
			console.log("No match con nada");
			callback(1, null);
		}
	}
	else {
		console.log("(3) Dice's coefficient");
		console.log("Exact query :)");
		var resultado = [query, exactHash[query]];
		callback(2, resultado);
	}
}

exports.jarowinklerDistanceSentence = function(query, listacontrol, callback){
	//Jaro–Winkler string distance
	var exactHash= {};
	var similarHash= {};

	for(var i = 0; i < listacontrol.length; i++){
		var distance = natural.JaroWinklerDistance(listacontrol[i], query);
		if(distance < 1 && distance > 0.88){
			similarHash[listacontrol[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[listacontrol[i]]=distance;
			}
		}
	}

	if(!utils.isEmpty(similarHash)){
		console.log("(4) Jaro–Winkler string distance");
		console.log("* similarHash(unsorted): ");
		console.log(similarHash);
	}

	if(utils.isEmpty(exactHash)){
		if(!utils.isEmpty(similarHash)){
			var newSimilarHash = utils.getSortedKeys(similarHash);
			console.log("Did you mean..."+newSimilarHash[0]+"?");
			var resultado = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, resultado);
		}
		else{
			console.log("(4) Jaro–Winkler string distance");
			console.log("No match con nada");
			callback(1, null);
		}
	}
	else {
		console.log("(4) Jaro–Winkler string distance");
		console.log("Exact query :)");
		var resultado = [query, exactHash[query]];
		callback(2, resultado);
	}

}

exports.levenshteinDistanceSentence = function(query, listacontrol, callback){
	//Levenshtein distance
	var exactHash= {};
	var similarHash= {};

	for(var i = 0; i < listacontrol.length; i++){
		var distance = natural.LevenshteinDistance(listacontrol[i], query);
		if(distance > 0 && distance < 5){
			similarHash[listacontrol[i]]=distance;
		}
		else {
			if(distance==0){
				exactHash[listacontrol[i]]=distance;
			}
		}
	}

	if(!utils.isEmpty(similarHash)){
		console.log("(5) Levenshtein distance");
		console.log("* similarHash(unsorted): ");
		console.log(similarHash);
	}

	if(utils.isEmpty(exactHash)){
		if(!utils.isEmpty(similarHash)){
			var newSimilarHash = utils.getSortedKeysInverse(similarHash);
			console.log("Did you mean..."+newSimilarHash[0]+"?");
			var resultado = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, resultado);
		}
		else{
			console.log("(5) Levenshtein distance");
			console.log("No match con nada");
			callback(1, null);
		}
	}
	else {
		console.log("(5) Levenshtein distance");
		console.log("Exact query :)");
		var resultado = [query, exactHash[query]];
		callback(2, resultado);
	}
}

exports.dicesDistanceSentence = function(query, listacontrol, callback){
	//Dice's co-efficient:
	var exactHash= {};
	var similarHash= {};

	for(var i = 0; i < listacontrol.length; i++){
		var distance = natural.DiceCoefficient(listacontrol[i], query);
		if(distance < 1 && distance > 0.70){
			similarHash[listacontrol[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[listacontrol[i]]=distance;
			}
		}
	}

	if(!utils.isEmpty(similarHash)){
		console.log("(6) Dice's co-efficient");
		console.log("* similarHash(unsorted): ");
		console.log(similarHash);
	}

	if(utils.isEmpty(exactHash)){
		if(!utils.isEmpty(similarHash)){
			var newSimilarHash = utils.getSortedKeys(similarHash);
			console.log("Did you mean..."+newSimilarHash[0]+"?");
			var resultado = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, resultado);
		}
		else{
			console.log("(6) Dice's co-efficient");
			console.log("No match con nada");
			callback(1, null);
		}
	}
	else {
		console.log("(6) Dice's co-efficient");
		console.log("Exact query :)");
		var resultado = [query, exactHash[query]];
		callback(2, resultado);
	}
}

