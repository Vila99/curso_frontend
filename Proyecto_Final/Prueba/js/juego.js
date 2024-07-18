// VARIABLES GLOBALES
var nick;
var dificultad;
var email;
var avatarImg;
var numParejas;
var cartasVolteadas = [];
var cartasEmparejadas = [];

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
    
    // Generar pares de imágenes (temporalmente usando números)
    for (let i = 0; i < parejas; i++) {
        cartas.push(i);
        cartas.push(i);
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
            <div class="cara atras">${cartas[i]}</div>
        `;
        carta.addEventListener('click', voltearCarta);
        contenedorJuego.appendChild(carta);
    }

    // Ajustar el tamaño del contenedor de acuerdo a la dificultad
    let filas, columnas;
    switch (numCartas) {
        case 8: // Fácil
            filas = 2;
            columnas = 4;
            break;
        case 12: // Normal
            filas = 3;
            columnas = 4;
            break;
        case 16: // Difícil
            filas = 4;
            columnas = 4;
            break;
    }
    contenedorJuego.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    contenedorJuego.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
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
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.valor === carta2.dataset.valor) {
        cartasEmparejadas.push(carta1, carta2);
        cartasVolteadas = [];
        if (cartasEmparejadas.length === numParejas * 2) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('revelada');
            carta2.classList.remove('revelada');
            cartasVolteadas = [];
        }, 1000);
    }
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
