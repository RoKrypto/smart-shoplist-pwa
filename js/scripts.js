if( 'serviceWorker' in navigator ) {
	navigator.serviceWorker.register('./sw.min.js')
		.then( reg => console.log('Registro de SW exitoso', reg) )
		.catch( err => console.warn('Error al tratar de registrar el SW', err) );
}