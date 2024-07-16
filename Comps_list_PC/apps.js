/*Desplegable menu seleccion componentes*/

function toggleSection(id) {
    var section = document.getElementById(id);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "flex";
    } else {
        section.style.display = "none";
    }
}

// Funciones para el arrastrar y soltar
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var element = document.getElementById(data);
    var cart = document.getElementById("carrito");

    // Crear un nuevo elemento p con el nombre del producto
    var newItem = document.createElement("p");
    newItem.textContent = element.getElementsByTagName("p")[0].textContent;
    
    // Añadir el nuevo elemento al carrito
    cart.appendChild(newItem);
}