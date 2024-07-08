//Capturar el valor del imput nick
const nickInput=document.getElementById('nick');
console.log(nickInput.nodeType);
nickInput.value="Paco";
console.log(nickInput.value);

//Capturar el valor del select
const tamanoInput=document.getElementById('tamano');
console.log(tamanoInput.value)
console.log(tamanoInput.options[tamanoInput.selectedIndex].text)
