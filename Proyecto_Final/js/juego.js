/*
* JS Para el juego Masterdots
*
*/
// VARIABLES GLOBALES
var iniciadoMarcado = false;
var adyacentes = [];
var idMarcados = [];
var classMarcada;
var tamanoPanel;
var idInterval;

// Funciones

/**
 * Recoge los datos de la sesion del sessionStorage
 */
function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    tamano = sessionStorage.getItem('tamano');
    email = sessionStorage.getItem('email');
    avatarImg = sessionStorage.getItem('avatarImg');
}

/**
 * Comprueba si existe nick en el sessionStorage
 */
function comprobacionDatosUsuario() {
    if (nick == null || avatarImg == null || tamano == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

/**
 * Funcion que rellena nick y src de avatar
 */
function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
    tamanoPanel = parseInt(tamano);
}

/**
 * Funcion que:
 *  1.- Rellena el nick
 *  2.- Rellena el avatar
 *  3.- Pinta de forma automática el panel de juego
 */
/**
 * 
 
function pintarPanelJuego() {
    document.getElementById("juego").style.gridTemplateColumns = "repeat(" + tamano + ", 1fr)"
    document.getElementById("juego").style.gridTemplateRows = "repeat(" + tamano + ", 1fr)"
    // Elementos de forma automática
    let items = "";
    let color = ["rojo", "verde"];
    let colorRnd = 0;
    for (let index = 0; index < (parseInt(tamano) * parseInt(tamano)); index++) {
        if (index % 2 > 0) colorRnd = getRandomInt(2);
        items += `<div class="containerItem"><div id="${index}" class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}
pintarPanelJuego();
programarEventosJuego();
*/
// Capturamos Datos Usuario
getDatosUsuario();
// Comprobamos los datos
if (!comprobacionDatosUsuario()) location = "index.html";
// Rellenamos el formulario, panel y eventos
rellenarFormularioUsuario();
