var natural = require('natural'),
	utils = require("./utils"),
	alg = require("./algorithms"),
	tokenizer = new natural.WordTokenizer();

//var companyList = ["Amazon", "Apple", "Atlas Copco", "AXA", "Barilla Group", "Bombardier", "Cisco", "E.ON", "EADS", "Emerson", "Honeywell", "Ingersoll Rand", "Lufthansa", "Microsoft", "NetApp", "Oliver Wyman", "PwC", "Roche", "Schneider Electric", "Time Warner"];
var companyList = ["amazon", "apple", "atlas copco", "axa", "barilla group", "bombardier", "cisco", "e.on", "eads", "emerson", "honeywell", "ingersoll rand", "lufthansa", "microsoft", "netapp", "oliver wyman", "pwc", "roche", "schneider electric", "time warner"];
var frases = ["como es ", "que es lo positivo de ", "que es lo bueno de ", "que es lo negativo de ", "que es lo malo de "];		


/*
*  Métodos que procesan la QUERY desde API REST/llamada interna 
*/
exports.queryDistance = function(query, callback_http){
	var resultadosAmbiguos = [];
	var resultadosExactos = [];
	console.log("\nCADENA=" + query)
	var numpalabras = query.trim().split(" ");
	var tokens = tokenizer.tokenize(query);
 	console.log('tokens:'+ tokens);

 	var frasesCompletas = [];
	for(var j = 0; j < frases.length; j++){
		for (var i = 0; i < companyList.length; i++){
			frasesCompletas.push(frases[j]+companyList[i]);
		}
	}

	//if(numpalabras.length < 3){
		//Distancia entre PALABRAS
		//Jaro–Winkler string distance
		alg.jarowinklerDistanceWord(query, companyList, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Levenshtein distance
		alg.levenshteinDistanceWord(query, companyList, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Dice's co-efficient:
		alg.dicesDistanceWord(query, companyList, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});
	//}
	//else {
		//Distancia entre FRASES
		//Ej.: "Como es :company"
		//Jaro–Winkler string distance
		alg.jarowinklerDistanceSentence(query, frasesCompletas, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Levenshtein distance
		alg.levenshteinDistanceSentence(query, frasesCompletas, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Dice's co-efficient:
		alg.dicesDistanceSentence(query, frasesCompletas, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});	
	//}
	console.log('\n\nresultadosExactos:');
	console.log(resultadosExactos);
	console.log('resultadosAmbiguos:');
	console.log(resultadosAmbiguos);

	if(resultadosExactos.length > 0){ // E O && A O
		callback_http(false, "'"+query +"'' está dentro del diccionario.");
	}
	else{
		if(resultadosAmbiguos.length > 0){ // E . && A O
			if(resultadosAmbiguos.length == 1) {
				var resul = resultadosAmbiguos[0];
				callback_http(false, "¿Quisiste decir '"+resul[0]+"'?");
			}
			else {
				var texto = "";
				// COGER EL QUE TENGA 0<p<1 (JW||D) antes que el que sea p >= 1 (L)
				for(var i = 0; i < resultadosAmbiguos.length; i++){
					var cosa = resultadosAmbiguos[i];
					texto = texto + "'"+ cosa[0] + "', ";
				}

				callback_http(false, "¿Quisiste decir "+texto+"?");
			}
		}
		else { // E . && A .
			callback_http(false, "'"+query +"'' NO está dentro del diccionario.");
		}
	}

	//APLICAR ESTOS ALGORTIMOS SOBRE las palabras clave!!! 80/20 :)
	
};

// Comunicación REST
exports.query = function(request, response){
	console.log("\n----------------------------");

	var query = request.body.query;

	if (query != ''){
		//Formateando cadena
		var querysinacentos = utils.omitirAcentos(query);
		querysinacentos = querysinacentos.toLowerCase();

		exports.queryDistance(querysinacentos, function(error, info){
			if(error == true){
				console.log("\n Error!? " + error);
				//response.send(500, info);
				response.render('index', { title: 'Did you mean...?', information: info});
			} else {
				//response.send(200, info);
				response.render('index', { title: 'Did you mean...?', information: info});
			}
		});
	}
	else {
		console.log("\n Query empty! Suggest an example.");
		response.render('index', { title: 'Did you mean...?', information: 'E.g.: "¿Cómo es Amazon?"'});
	}
};
