// JavaScript para manejar el despliegue de las secciones
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

    if (element) {
        // Obtener la categoría del elemento
        var category = element.getAttribute("data-category");
        var existingItems = cart.getElementsByClassName("cart-item");

        // Verificar si ya hay un ítem de la misma categoría en el carrito
        for (var i = 0; i < existingItems.length; i++) {
            if (existingItems[i].getAttribute("data-category") === category) {
                alert("Ya tienes un ítem de esta categoría en el carrito.");
                return;
            }
        }

        // Crear un nuevo elemento div con el nombre del producto y un botón de eliminar
        var newItem = document.createElement("div");
        newItem.classList.add("cart-item");
        newItem.setAttribute("data-category", category);
        var productName = element.getElementsByTagName("p")[0];

        if (productName) {
            newItem.textContent = productName.textContent;

            // Crear y añadir el botón de eliminar
            var removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar";
            removeButton.onclick = function() {
                cart.removeChild(newItem);
            };
            newItem.appendChild(removeButton);

            // Añadir el nuevo elemento al carrito
            cart.appendChild(newItem);
        }
    } else {
        console.error("Elemento con id " + data + " no encontrado.");
    }
}
