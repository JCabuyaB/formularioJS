import marcarPaso from "./marcarPaso";
import siguientePaso from "./siguientePaso";
import validarInput from "./validaciones/validaciones";

// formulario
const formulario = document.getElementById("formulario");
// validacion formulario
formulario.addEventListener("keyup", (e) => {
    // si el elemento en el que se presiona es un input
    if (e.target.tagName === "INPUT") {
        // cantidad
        if (e.target.id === "cantidad") {
            validarInput("cantidad");
        } else if (e.target.id === "nombre-receptor") {
            validarInput("nombre");
        } else if (e.target.id === "correo-receptor") {
            validarInput("correo");
        }
    }
});

// reiniciar scroll del formulario
formulario.querySelector(".formulario__body").scrollLeft = 0;

// boton formulario
const btnFormulario = document.getElementById("formulario__btn");
btnFormulario.addEventListener("click", (e) => {
    e.preventDefault();

    const pasoActual = formulario
        .querySelector(".linea-pasos__paso-check--active")
        .closest(".linea-pasos__paso").dataset.paso;

    if (pasoActual === "cantidad") {
        if (validarInput("cantidad")) {
            marcarPaso("cantidad");
            siguientePaso();
        }
    }else if (pasoActual === "datos") {
        if (validarInput("nombre") && validarInput("correo")) {
            marcarPaso("datos");
            siguientePaso();
        }
    }else if(pasoActual === "metodo"){
        // formato moneda
        const opciones = {
            style: 'currency',
            currency: 'COP'
        }
        const formatoMoneda = new Intl.NumberFormat('es-CO', {style: 'currency',currency: 'COP'});
        // asignar valores ingresados por el usuario en la confirmacion
        formulario.querySelector("[data-valor='cantidad'] span").innerText = formatoMoneda.format(formulario.cantidad.value);
        formulario.querySelector("[data-valor='nombre-receptor'] span").innerText = formulario['nombre-receptor'].value;
        formulario.querySelector("[data-valor='correo-receptor'] span").innerText = formulario['correo-receptor'].value;
        formulario.querySelector("[data-valor='metodo'] span").innerText = formulario.metodo.value;

        // clase para deshabilitar boton
        btnFormulario.classList.add('formulario__btn--disabled');

        // reactivar boton
        setTimeout(()=>{btnFormulario.classList.remove('formulario__btn--disabled')}, 4000);

        // ocultar icono de siguiente
        btnFormulario.querySelector("[data-icono='siguiente']").classList.remove('formulario__btn-contenedor-icono--active');

        // mostrar icono de banco
        btnFormulario.querySelector("[data-icono='banco']").classList.add('formulario__btn-contenedor-icono--active');

        btnFormulario.querySelector('span').innerText = "Transferir";
        marcarPaso("metodo");
        siguientePaso();
    }else if (pasoActual === "confirmacion" && !btnFormulario.matches('.formulario__btn--disabled')){
        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(() => {
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        }, 4000);
    }
});
