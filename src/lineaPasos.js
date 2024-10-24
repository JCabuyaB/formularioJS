import validarCampo from "./validaciones/validaciones";

const lineaPasos = document.getElementById("linea-pasos");

// evento para retroceder despues de verificar informacion
lineaPasos.addEventListener("click", (e) => {
    // interrumpir flujo sino se hace clic en un paso
    if (!e.target.closest(".linea-pasos__paso")) return false;

    // paso actual
    const pasoActual = document.querySelector(".linea-pasos__paso-check--active").closest('.linea-pasos__paso').dataset.paso;

    // validar si la seccion actual esta bien para poder cambiar
    if (pasoActual === "cantidad") {
        if (!validarCampo("cantidad")) return false;
    } else if (pasoActual === "datos") {
        if (!validarCampo("nombre") || !validarCampo("correo")) return false;
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