const fs = require('fs');

let listadoPorHacer = [];

/* ========================================================================================================================== */
// Método para escribir en nuestro archivo data.json
/* ========================================================================================================================== */

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    /* grabamos en el archivo data.json indicando su path */
    fs.writeFile('db/data.json', data, (err) => {
        if(err) throw new Error('No se pudo grabar', err);
    })

}

/* ========================================================================================================================== */
// Método para cargar los datos de nuestro archivo data.json
/* ========================================================================================================================== */

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json'); // me devuelve un arreglo en su forma original
    } catch (error) {
        listadoPorHacer = [];
    }


}

/* ========================================================================================================================== */
// Método para crear una nueva tarea
/* ========================================================================================================================== */

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false // por defecto
    };

    listadoPorHacer.push( porHacer ); // mete al arreglo la nueva tarea

    // guardamos en el archivo data.json el arreglo con la nueva tarea ingresada
    guardarDB();

    return porHacer; // retorna la tarea 

}

/* ========================================================================================================================== */
// Método para obtener el listado de tareas
/* ========================================================================================================================== */


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

/* ========================================================================================================================== */
// Método para actualizar una tarea
/* ========================================================================================================================== */

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion) // retornara si son iguales
    
    if ( index >= 0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

/* ========================================================================================================================== */
// Método para borrar una tarea
/* ========================================================================================================================== */

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion)

    if ( listadoPorHacer.length === nuevoListado.length ) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

/* ========================================================================================================================== */
// Exportación de las funciones
/* ========================================================================================================================== */

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}