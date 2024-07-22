// VARIABLES GLOBALES
var nick;
var dificultad;
var email;
var avatarImg;
var numParejas;
var cartasVolteadas = [];
var cartasEmparejadas = [];
var puntuacion = 0;
var movimientos = 0;
var movimientosMaximos = 0;

/**
 * Recoge los datos de la sesion del sessionStorage
 */
function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    dificultad = sessionStorage.getItem('dificultad'); // Guardado como string, se convierte a número al usarlo
    email = sessionStorage.getItem('email');
    avatarImg = sessionStorage.getItem('avatarImg');
}

/**
 * Comprueba si existe nick en el sessionStorage
 */
function comprobacionDatosUsuario() {
    if (nick == null || avatarImg == null || dificultad == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

/**
 * Función que rellena nick y src de avatar
 */
function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
}

/**
 * Función que inicializa el juego
 */
function iniciarJuego() {
    numParejas = parseInt(dificultad); // Convertir dificultad a número de parejas
    cartasVolteadas = [];
    cartasEmparejadas = [];
    crearTablero(numParejas);
}

/**
 * Función que crea el tablero de juego
 */
function crearTablero(parejas) {
    const contenedorJuego = document.getElementById('contenedorJuego');
    contenedorJuego.innerHTML = '';
    const numCartas = parejas * 2;
    const cartas = [];
    
    //Array de la ruta de imagenes
    const imagePaths = [
        './img/avatar_bulma.png',
        './img/avatar_goku.png',
        './img/avatar_karin.webp',
        './img/avatar_pam.webp',
        './img/avatar_popp.png',
        './img/avatar_shenron.png',
        './img/Muten_Roshi.webp',
        './img/logo__dragon_ball.png',
    ];


    // Generar pares de imágenes (temporalmente usando números)
    for (let i = 0; i < parejas; i++) {
        cartas.push(imagePaths[i]);
        cartas.push(imagePaths[i]);
    }
    
    // Mezclar las cartas
    cartas.sort(() => 0.5 - Math.random());
    
    // Crear las cartas en el DOM
    for (let i = 0; i < numCartas; i++) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = cartas[i];
        carta.innerHTML = `
            <div class="cara frente"></div>
            <div class="cara atras" style="background-image: url('${cartas[i]}'); background-size: cover;"></div>
        `;
        carta.addEventListener('click', voltearCarta);
        contenedorJuego.appendChild(carta);
    }

    // Ajustar el tamaño del contenedor de acuerdo a la dificultad
    //Empeze ajustando el case al id correspondiente de la dificultad pero no me cargaba bien, asi que estableci con el numero de cartas.
    let filas, columnas;
    switch (numCartas) {
        case 8: // Fácil
            filas = 2;
            columnas = 4;
            movimientosMaximos = 8;
            break;
        case 12: // Normal
            filas = 3;
            columnas = 4;
            movimientosMaximos = 10;
            break;
        case 16: // Difícil
            filas = 4;
            columnas = 4;
            movimientosMaximos = 15;
            break;
    }
    contenedorJuego.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    contenedorJuego.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
    document.getElementById('movimientosMaximos').value = movimientosMaximos;
}

/**
 * Función que voltea una carta
 */
function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains('revelada') && !cartasEmparejadas.includes(this)) {
        this.classList.add('revelada');
        cartasVolteadas.push(this);

        if (cartasVolteadas.length === 2) {
            comprobarPareja();
        }
    }
}

/**
 * Función que comprueba si las dos cartas volteadas son pareja
 */
function comprobarPareja() {
    realizaMovimiento()
    if (movimientos == movimientosMaximos) {
        alert('¡Se ha alcanzado el máximo de movimientos!');
        document.getElementById('reiniciar').style.display = 'block';
        return;
    }
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.valor === carta2.dataset.valor) {
        cartasEmparejadas.push(carta1, carta2);
        cartasVolteadas = [];
        recuentoDePuntos();
        if (cartasEmparejadas.length === numParejas * 2) {
            setTimeout(() => alert('¡Has ganado! ' + 'Tu puntuación es: ' + puntuacion), 500);
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('revelada');
            carta2.classList.remove('revelada');
            cartasVolteadas = [];
        }, 1000);
    }
}

//Funcion que recuenta los puntos
function recuentoDePuntos(){
    puntuacion += 10;
    document.getElementById('puntuacion').value = puntuacion;
}

//Recuenta los movimientos del usuario (no consigo que encaje cuando el marcador es 0, salta la alerta antes)
function realizaMovimiento(){
    movimientosMaximos -= 1;
    document.getElementById('movimientosMaximos').value = movimientosMaximos;
}

//Recargar pagina
function recargarPagina() {
    location.reload();
}

// Llamar a las funciones de inicialización cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    getDatosUsuario();
    if (comprobacionDatosUsuario()) {
        rellenarFormularioUsuario();
        iniciarJuego();
    } else {
        alert('Error en los datos del usuario. Volviendo al inicio.');
        window.location.href = 'index.html';
    }
});
