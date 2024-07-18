/*
* JS Para la gestión de los datos de usuario
*/

var nick;
var tamano;
var email;
var avatarImg;

// sessionStorage

/**
 * Almacenar los datos en el sessionStorage
 * @param  {HTMLElement} nick nick del usuario
 * @param  {HTMLElement} tamano tamaño del panel
 * @param  {HTMLElement} email email del usuario
 */
function datosUsuario(nick, tamano, email, avatarCont) {
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('dificultad', tamano.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('geolocalizacionTxt', geolocalizacionTxt);
    sessionStorage.setItem('avatarImg', avatarCont.src);
}

/**
 * Recoge los datos de la sesion del sessionStorage
 */
function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    tamano = sessionStorage.getItem('dificultad');
    email = sessionStorage.getItem('email');
    avatarImg = sessionStorage.getItem('avatarImg');
}

/**
 * Comprueba si existe nick en el sessionStorage
 */
function comprobacionDatosUsuario() {
    if (nick == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

function almacenarDatosUsuario(event) {
    event.preventDefault(); // Evita el envío del formulario

    const nick = document.getElementById("nick").value;
    const email = document.getElementById("email").value;
    const dificultad = document.getElementById("dificultad").value;
    const avatarImg = document.getElementById("avatarImg").src;

    if (nick.length < 2 || dificultad === "0") {
        document.getElementById("error").innerText = "Por favor, completa los campos obligatorios correctamente.";
        return false;
    }

    sessionStorage.setItem("nick", nick);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("dificultad", dificultad);
    sessionStorage.setItem("avatarImg", avatarImg);

    document.getElementById("formEntrada").submit();
}

document.getElementById("formEntrada").addEventListener("submit", almacenarDatosUsuario);
