import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { FireBaseContext } from '../firebase';
import DetallesProducto from '../components/layout/DetallesProducto';


const FirstDiv =  styled.div`
    background-color: #f3f3f3;
` 
const SecondDiv =  styled.div`
    max-width: 1200px;
    width: 95%;
    padding: 5rem 0;
    margin: 0 auto;
` 
const Ul =  styled.ul`
    background-color: #FFF;
` 
const Home = () => {

  const {firebase} = useContext(FireBaseContext)
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection("productos").orderBy('creado', 'desc').onSnapshot(handleSnapshot)
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
  return (
    <div>
      <Layout>
        <FirstDiv>
          <SecondDiv>  
            <Ul className="bg-white">
              {productos.map(producto => (
                <DetallesProducto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </Ul>
          </SecondDiv>
        </FirstDiv>
      </Layout>
    </div>
  )
}

export default Home
