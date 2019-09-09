if( navigator.serviceWorker ) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./sw.js')
			.then( reg => console.log('Registro de SW exitoso', reg) )
			.catch( err => console.warn('Error al tratar de registrar el SW', err) );
	})
}