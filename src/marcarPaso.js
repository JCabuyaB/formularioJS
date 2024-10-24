const marcarPaso = (paso) => {
    // agregar clase checked
    document
    .querySelector(`.linea-pasos [data-paso="${paso}"] .linea-pasos__paso-check`)
    .classList.add('linea-pasos__paso-check--checked');
};

export default marcarPaso;