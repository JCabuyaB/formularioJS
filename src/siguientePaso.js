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

export default siguientePaso;