export default function validarCrearCuenta(valores){
    let errores = {}

    //validar el nombre
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio"
    }
    //validar el email
    if(!valores.email){
        errores.email = "El email es obligatorio"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "Formato de email no válido"
    }
    //validar la contrasenia
    if(!valores.password){
        errores.password = "La contrasenia es obligatoria"
    } else if (valores.password.length < 6) {
        errores.password = "La contrasenia debe ser mayor a 6 caratéres"
    }
    return errores
}