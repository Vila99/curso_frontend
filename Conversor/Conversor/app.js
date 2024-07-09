// script.js

// Tasas de conversión
const conversionRates = {
    euroToDollar: 1.1,
    euroToLibra: 0.85,
    euroToYen: 130
};

//Evento para el submit

document.getElementById('currencyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe y recargue la página
    convertFromEuro();
});

function convertFromEuro() {
    const euroValue = parseFloat(document.getElementById('euro').value);

    //Conversion de euro y añadir al valor del html

    if (!isNaN(euroValue)) {
        const dollarValue = (euroValue * conversionRates.euroToDollar).toFixed(2);
        const libraValue = (euroValue * conversionRates.euroToLibra).toFixed(2);
        const yenValue = (euroValue * conversionRates.euroToYen).toFixed(2);

        document.getElementById('dollar').value = dollarValue;
        document.getElementById('libra').value = libraValue;
        document.getElementById('yen').value = yenValue;

    //En caso de que no sea numerico devolveer sin valor
    } else {
        document.getElementById('dollar').value = '';
        document.getElementById('libra').value = '';
        document.getElementById('yen').value = '';
    }
}