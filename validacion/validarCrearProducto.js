export default function validarCrearProducto(valores){
    let errores = {}

    //validar el nombre
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio"
    }
    //validaar la empresa
    if(!valores.empresa){
        errores.empresa = "La empresa es obligatoria"
    }
    //validaar la URL
    if(!valores.url){
        errores.url = "La URL de venta es obligatoria"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "Formato de URL no valido"
    }
    //validaar la descripcion
    if(!valores.descripcion){
        errores.descripcion = "La descripcion es obligatoria"
    }
    return errores
}