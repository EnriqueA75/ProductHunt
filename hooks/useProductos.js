import React, {useEffect, useState, useContext} from 'react';
import { FireBaseContext } from '../firebase';

const useProductos = orden => {
    const {firebase} = useContext(FireBaseContext)
    const [productos, setProductos] = useState([])

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection("productos").orderBy(orden, 'desc').onSnapshot(handleSnapshot)
    }
    obtenerProductos()
  }, [])
  function handleSnapshot (snapshot){
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setProductos(productos)
  }
  return {
      productos
  }
}

export default useProductos