class Options {
	static get arredondar () {return document.getElementById('opt_arr').checked}
	static get opt_cap () {return document.getElementById('opt_cap').checked}
	static get opt_res () {return document.getElementById('opt_res').checked}
}
var	resposta	= document.getElementById('res_paralel_result'),
	tempo		= document.getElementById('velocidade'),
	motiv		= ['Instântaneo!', 'Superveloz!', 'Viu isso?', 'Foi um flash!', 'Incrível'];

function calc_res_paralel (termo) {
		Stime	= new Date();

	// definindo separador e tipo de operação
	tipo	= termo.includes('//');
	entrada	= tipo ? termo.split (['//']) : termo.split (['+']);
	// definindo unidade de medida (ohm ou fahrrad)
	medtip	= Options.opt_res;
	medida	= medtip ? '\u03a9' : 'F';
	
	poker	= () => entrada.length;	// retorna o numero de itens em fila
	pega	= indice => Number (entrada [poker() + indice]); // retorna um numero da lista

	function calcular (a,b) {
		if ( (tipo&&medtip)||!(tipo||medtip) ) {
			return (a*b)/(a+b) 	// formula para resistores paralelos
		} else { 
			return a+b 
		} 		// formula para somas
	}
	
	// Calculando de 2 em 2 fatores
	for ( ; poker() > 1 ;){
		entrada [poker()-2]  = calcular ( pega(-1),pega(-2));
		entrada.pop();
	}
	entrada	= Options.arredondar ? Math.round (entrada) : entrada;

	// Apresentando o resultado
	let	Ftime	= new Date();
	let	Ttime	= (Ftime -Stime);
	resposta.innerHTML	= entrada+medida;
	motivacao	= motiv[Math.floor(Math.random()*motiv.length)];
	tempo.innerHTML	= motivacao + ' Realizado em aproximadamente ' + Ttime + ' milisegundos.';
};

