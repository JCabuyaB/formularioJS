const formulario = document.getElementById("formulario");

const validar = (campo) => {
    // expresion regular e input
    let expresionRegular, input;
    switch (campo) {
        case "cantidad":
            expresionRegular = /^\d+(\.\d{1,2})?$/;
            input = formulario.cantidad;

            if (expresionRegular.test(input.value)) {
                input.classList.remove("formulario__input--error");
                return true;
            } else {
                input.classList.add("formulario__input--error");
                return false;
            }
            break;
        case "nombre":
            expresionRegular = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            input = formulario["nombre-receptor"];

            if (expresionRegular.test(input.value)) {
                input.classList.remove("formulario__input--error");
                return true;
            } else {
                input.classList.add("formulario__input--error");
                return false;
            }
            break;
        case "correo":
            expresionRegular = /^[a-zA-Z0-9-_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-_.]+$/;
            input = formulario["correo-receptor"];

            //validar correo
            if (expresionRegular.test(input.value)) {
                input.classList.remove("formulario__input--error");
                return true;
            } else {
                input.classList.add("formulario__input--error");
                return false;
            }
            break;
        default:
            break;
    }
};

export default validar;
