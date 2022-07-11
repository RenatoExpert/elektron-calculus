var	arredondar	= document.getElementById('opt_arr').checked,
	resposta	= document.getElementById('res_paralel_result'),
	tempo		= document.getElementById('velocidade'),
	motiv		= ['Instântaneo!', 'Superveloz!', 'Viu isso?', 'Foi um flash!', 'Incrível'];

function calc_res_paralel (termo) {
	var	opt_cap	= document.getElementById('opt_cap').checked,
		opt_res	= document.getElementById('opt_res').checked;
	var	Stime	= new Date();

	// definindo separador e tipo de operação
	function complex () {
		tipo = true;
		var entrada = termo.split (['//']);
	}
	function simple () {
		var tipo = false;
		var entrada = termo.split (['+']);
	}
	termo.includes('//')	? complex ()
	  : termo.includes('+')	? simple ()
	
	// definindo unidade de medida (ohm ou fahrrad)
	if (opt_res) {
		medida = '\u03a9';
		medtip = true;
	} else if (opt_cap) {
		medida = 'F';
		medtip = false;
	} else {
		alert('Escolha o tipo de grandeza');
	}
	
	function poker () { return entrada.length }; // retorna o numero de itens em fila
	function pega (indice) { return Number ( entrada [ poker() + indice ] ) }; // retorna um numero da lista
	function redondo (x) {
		if (arredondar) { return Math.round(x)
		} else if (!arredondar) { return x };
	}

	function calcular (a,b) {
		if ( (tipo&&medtip)||!(tipo||medtip) ) {
			return redondo ((a*b)/(a+b)) 	// formula para resistores paralelos
		} else { 
			return redondo (a+b) 
		} 		// formula para somas
	}
	
	// Calculando de 2 em 2 fatores
	for ( ; poker() > 1 ; ){
		entrada [poker()-2]  = calcular ( pega(-1),pega(-2));
		entrada.pop();
	}

	// Apresentando o resultado
	var	Ftime	= new Date();
	var	Ttime	= (Ftime -Stime);
	resposta.innerHTML	= entrada+medida;
	motivacao	= motiv[Math.floor(Math.random()*motiv.length)];
	tempo.innerHTML	= motivacao + ' Realizado em aproximadamente ' + Ttime + ' milisegundos.';
};

