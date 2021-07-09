import React, { useEffect, useState } from 'react';

const useValidation = (stateInicial, validar, fn) => {

    const [valores, setValores] = useState(stateInicial)
    const [errores, setErrores] = useState({})
    const [submitForm, setSubmitForm] = useState(false)

    useEffect(() => {
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0
            if(noErrores){
                fn() //fn es la función que ese ejecuta en el componente
            }
            setSubmitForm(false)
        }
    }, [errores])
    //funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }
    //funciónm que se ejecuta al dar submit
    const handleSubmit = e => {
        e.preventDefault()
        const errorValidacion = validar(valores)
        setErrores(errorValidacion)
        setSubmitForm(true)
    }
    //cuando se realiza el evento del blur
    const handleBlur = () => {
        const errorValidacion = validar(valores)
        setErrores(errorValidacion)
    }

    return {
        valores, 
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidation;