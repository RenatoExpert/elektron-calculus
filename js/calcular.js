var arredondar = document.getElementById('opt_arr').checked;
var resposta = document.getElementById('res_paralel_result');
var tempo = document.getElementById('velocidade');
var motiv = ['Instântaneo!', 'Superveloz!', 'Viu isso?', 'Foi um flash!', 'Incrível']

function calc_res_paralel (termo) {
	var opt_cap = document.getElementById('opt_cap').checked;
	var opt_res = document.getElementById('opt_res').checked;
	var Stime = new Date();

	// definindo separador e tipo de operação
	if (termo.includes('//')==true) {
		tipo = true;
		var entrada = termo.split ( ['//'] );
	} else if (termo.includes('+')==true) {
		var tipo = false;
		var entrada = termo.split ( ['+'] );
	};
	
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
			return redondo (a+b) } 		// formula para somas
	}
	
	// Calculando de 2 em 2 fatores
	for ( ; poker() > 1 ; ){
		entrada [poker()-2]  = calcular ( pega(-1),pega(-2));
		entrada.pop();
	}

	// Apresentando o resultado
	var Ftime = new Date();
	var Ttime = (Ftime -Stime);
	resposta.innerHTML = entrada+medida;
	motivacao = motiv[Math.floor(Math.random()*motiv.length)];
	tempo.innerHTML = motivacao + ' Realizado em aproximadamente ' + Ttime + ' milisegundos.';
};
