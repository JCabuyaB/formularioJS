'use strict';

const marcarPaso = (paso) => {
    // agregar clase checked
    document
    .querySelector(`.linea-pasos [data-paso="${paso}"] .linea-pasos__paso-check`)
    .classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = () => {
    // pasos
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')];
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');
    const indexPasoActual = pasos.indexOf(pasoActual);

    if(indexPasoActual < pasos.length - 1){
        // remover clase actual para ver el ckecked
        pasos[indexPasoActual].querySelector('span').classList.remove('linea-pasos__paso-check--active');

        // agregar clase activa y mostrar el formulario del siguiente paso
       
        pasos[indexPasoActual+1].querySelector('span').classList.add('linea-pasos__paso-check--active');
        document.querySelector(`.formulario__body [data-paso="${pasos[indexPasoActual+1].dataset.paso}"]`).scrollIntoView({
            inline: "start",
            behavior: "smooth"
        });
    }
};

const formulario$1 = document.getElementById("formulario");

const validar = (campo) => {
    // expresion regular e input
    let expresionRegular, input;
    switch (campo) {
        case "cantidad":
            expresionRegular = /^\d+(\.\d{1,2})?$/;
            input = formulario$1.cantidad;

            if (expresionRegular.test(input.value)) {
                input.classList.remove("formulario__input--error");
                return true;
            } else {
                input.classList.add("formulario__input--error");
                return false;
            }
        case "nombre":
            expresionRegular = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            input = formulario$1["nombre-receptor"];

            if (expresionRegular.test(input.value)) {
                input.classList.remove("formulario__input--error");
                return true;
            } else {
                input.classList.add("formulario__input--error");
                return false;
            }
        case "correo":
            expresionRegular = /^[a-zA-Z0-9-_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-_.]+$/;
            input = formulario$1["correo-receptor"];

            //validar correo
            if (expresionRegular.test(input.value)) {
                input.classList.remove("formulario__input--error");
                return true;
            } else {
                input.classList.add("formulario__input--error");
                return false;
            }
    }
};

// formulario
const formulario = document.getElementById("formulario");
// validacion formulario
formulario.addEventListener("keyup", (e) => {
    // si el elemento en el que se presiona es un input
    if (e.target.tagName === "INPUT") {
        // cantidad
        if (e.target.id === "cantidad") {
            validar("cantidad");
        } else if (e.target.id === "nombre-receptor") {
            validar("nombre");
        } else if (e.target.id === "correo-receptor") {
            validar("correo");
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
        if (validar("cantidad")) {
            marcarPaso("cantidad");
            siguientePaso();
        }
    }else if (pasoActual === "datos") {
        if (validar("nombre") && validar("correo")) {
            marcarPaso("datos");
            siguientePaso();
        }
    }else if(pasoActual === "metodo"){
        const formatoMoneda = new Intl.NumberFormat('es-CO', {style: 'currency',currency: 'COP'});
        // asignar valores ingresados por el usuario en la confirmacion
        formulario.querySelector("[data-valor='cantidad'] span").innerText = formatoMoneda.format(formulario.cantidad.value);
        formulario.querySelector("[data-valor='nombre-receptor'] span").innerText = formulario['nombre-receptor'].value;
        formulario.querySelector("[data-valor='correo-receptor'] span").innerText = formulario['correo-receptor'].value;
        formulario.querySelector("[data-valor='metodo'] span").innerText = formulario.metodo.value;

        // clase para deshabilitar boton
        btnFormulario.classList.add('formulario__btn--disabled');

        // reactivar boton
        setTimeout(()=>{btnFormulario.classList.remove('formulario__btn--disabled');}, 4000);

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

const lineaPasos = document.getElementById("linea-pasos");

// evento para retroceder despues de verificar informacion
lineaPasos.addEventListener("click", (e) => {
    // interrumpir flujo sino se hace clic en un paso
    if (!e.target.closest(".linea-pasos__paso")) return false;

    // paso actual
    const pasoActual = document.querySelector(".linea-pasos__paso-check--active").closest('.linea-pasos__paso').dataset.paso;

    // validar si la seccion actual esta bien para poder cambiar
    if (pasoActual === "cantidad") {
        if (!validar("cantidad")) return false;
    } else if (pasoActual === "datos") {
        if (!validar("nombre") || !validar("correo")) return false;
    }

    // desplazarse a un paso solo si está validado
    const pasoANavegar = e.target.closest(".linea-pasos__paso");

    // desplazarnos solo a una seccion correcta
    if (pasoANavegar.querySelector(".linea-pasos__paso-check--checked")) {
        const NombrePasoActual = lineaPasos.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

        // paso a navegar
        const id = e.target.closest('.linea-pasos__paso').dataset.paso;

        // cambiar boton
        if(NombrePasoActual === 'confirmacion'){
            const btn = document.getElementById('formulario__btn');
            // cambiar texto del btn
            btn.querySelector('span').innerText = 'Siguiente';

            // iconos
            // remover icono de banco
            btn.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');
            // mostrar icono de siguiente
            btn.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

            //remover clase disabled
            btn.classList.remove('formulario__btn--disabled');
        }

        const pasoActual = lineaPasos.querySelector('.linea-pasos__paso-check--active');
        // remover clase active al paso actual
        if(pasoActual){
            pasoActual.classList.remove('linea-pasos__paso-check--active');
        }

        // clase activa al paso clickeado
        const pasoANavegar = lineaPasos.querySelector(`[data-paso='${id}'] span`);
        pasoANavegar.classList.add('linea-pasos__paso-check--active');
        pasoANavegar.classList.remove('linea-pasos__paso-check--checked');

        // scrollear hacia el paso seleccionado 
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth'
        });
    }
});
//# sourceMappingURL=bundle.js.map
