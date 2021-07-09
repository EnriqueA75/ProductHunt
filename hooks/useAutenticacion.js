import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAutenticacion() {
    const [autenticado, setAutenticado] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if( usuario ){
                setAutenticado(usuario)
            } else {
                setAutenticado(null)
            }
        })
        return () => unsuscribe()
    },[])
    return autenticado
}
export default useAutenticacion