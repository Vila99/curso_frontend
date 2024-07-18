// JavaScript para manejar el despliegue de las secciones

function toggleSection(id) {
    // Obtener todas las secciones de componentes
    var sections = document.getElementsByClassName("component-options");
    
    // Cerrar todas las secciones
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Abrir la sección seleccionada
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
        // Obtener la categoría y el precio del elemento
        var category = element.getAttribute("data-category");
        var price = parseInt(element.getAttribute("data-price"));
        var existingItems = cart.getElementsByClassName("cart-item");

        // Verificar si ya hay un ítem de la misma categoría en el carrito
        for (var i = 0; i < existingItems.length; i++) {
            if (existingItems[i].getAttribute("data-category") === category) {
                alert("Ya tienes un ítem de esta categoría en el carrito.");
                return;
            }
        }

        // Crear un nuevo elemento div con el nombre del producto, precio y un botón de eliminar
        var newItem = document.createElement("div");
        newItem.classList.add("cart-item");
        newItem.setAttribute("data-category", category);
        newItem.setAttribute("data-price", price);
        var productName = element.getElementsByTagName("p")[0];

        if (productName) {
            newItem.textContent = productName.textContent;

            // Crear y añadir el botón de eliminar
            var removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.onclick = function() {
                cart.removeChild(newItem);
                updateTotalPrice(-price);
            };
            newItem.appendChild(removeButton);

            // Añadir el nuevo elemento al carrito
            cart.appendChild(newItem);

            // Actualizar el precio total
            updateTotalPrice(price);
        }
    } else {
        console.error("Elemento con id " + data + " no encontrado.");
    }
}

function updateTotalPrice(priceChange) {
    var totalPriceElement = document.getElementById("totalPrice");
    var currentTotal = parseInt(totalPriceElement.textContent);
    totalPriceElement.textContent = currentTotal + priceChange;
}
