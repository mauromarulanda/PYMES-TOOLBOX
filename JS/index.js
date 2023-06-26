// Crear el elemento form
let form = document.createElement("form");
form.id = "formulario";
form.method = "post";
form.action = "enviar.php"; // Aquí va la dirección del servidor que envía el correo

// Crear el elemento input para el nombre
let inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.name = "nombre";
inputNombre.placeholder = "Nombre";

// Crear el elemento input para el correo
let inputCorreo = document.createElement("input");
inputCorreo.type = "email";
inputCorreo.name = "correo";
inputCorreo.placeholder = "Correo";

// Crear el elemento input para el teléfono
let inputTelefono = document.createElement("input");
inputTelefono.type = "tel";
inputTelefono.name = "telefono";
inputTelefono.placeholder = "Teléfono";

// Crear el elemento select para el país
let selectPais = document.createElement("select");
selectPais.name = "pais";

// Crear las opciones del select
let paises = ["Argentina", "Bolivia", "Chile", "Colombia", "Ecuador", "España", "México", "Perú", "Uruguay", "Venezuela"]; //agregar más países
for (let pais of paises) {
  let option = document.createElement("option");
  option.value = pais;
  option.textContent = pais;
  selectPais.appendChild(option);
}

// Crear el elemento input para la empresa o institución
let inputEmpresa = document.createElement("input");
inputEmpresa.type = "text";
inputEmpresa.name = "empresa";
inputEmpresa.placeholder = "Empresa o institución";

// Crear el elemento button para enviar
let buttonEnviar = document.createElement("button");
buttonEnviar.type = "submit";
buttonEnviar.textContent = "Enviar";

// Añadir los elementos al formulario
form.appendChild(inputNombre);
form.appendChild(inputCorreo);
form.appendChild(inputTelefono);
form.appendChild(selectPais);
form.appendChild(inputEmpresa);
form.appendChild(buttonEnviar);

// Añadir el formulario al documento
document.body.appendChild(form);

// Crear una función para validar los datos del formulario
function validarFormulario(e) {
  // Evitar que se envíe el formulario por defecto
  e.preventDefault();

  // Obtener los valores de los campos
  let nombre = inputNombre.value;
  let correo = inputCorreo.value;
  let telefono = inputTelefono.value;
  let pais = selectPais.value;
  let empresa = inputEmpresa.value;

  // Verificar que no haya campos vacíos
  if (nombre == "" || correo == "" || telefono == "" || pais == "" || empresa == "") {
    alert("Por favor, complete todos los campos");
    return;
  }

  // Verificar que el correo tenga un formato válido
  let regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!regexCorreo.test(correo)) {
    alert("Por favor, ingrese un correo válido");
    return;
  }

  // Verificar que el teléfono tenga solo números
  let regexTelefono = /^[0-9]+$/;
  if (!regexTelefono.test(telefono)) {
    alert("Por favor, ingrese un teléfono válido");
    return;
  }

  // Si todo está bien, enviar los datos mediante AJAX
  enviarDatos(nombre, correo, telefono, pais, empresa);
}

// Crear una función para enviar los datos mediante AJAX
function enviarDatos(nombre, correo, telefono, pais, empresa) {
  // Crear un objeto FormData con los datos del formulario
  let formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("correo", correo);
  formData.append("telefono", telefono);
  formData.append("pais", pais);
  formData.append("empresa", empresa);

  // Crear un objeto XMLHttpRequest para hacer la petición
  let xhr = new XMLHttpRequest();

  // Abrir la conexión con el servidor
  xhr.open("POST", form.action);

  // Establecer el evento load para recibir la respuesta
  xhr.onload = function() {
    if (xhr.status == 200) {
      // Si el servidor responde con éxito, mostrar un mensaje de confirmación
      alert("Su registro se ha completado. Revise su correo electrónico.");
    } else {
      // Si el servidor responde con error, mostrar un mensaje de error
      alert("Ha ocurrido un error. Intente de nuevo más tarde.");
    }
  };

  // Enviar la petición con los datos del formulario
  xhr.send(formData);
}

// Añadir el evento submit al formulario para validar los datos antes de enviarlos
form.addEventListener("submit", validarFormulario);
