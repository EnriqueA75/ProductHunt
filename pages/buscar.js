import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

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

const Buscar = () => {

  const router = useRouter()
  const { query: {q}} = router

  //todos los productos
  const {productos} = useProductos('creado')
  const [result, setResult] = useState([])

  useEffect(() => {
    const busqueda = q.toLowerCase()
    const filtro = productos.filter(producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    setResult(filtro)
  }, [q, productos])

    return (
      <div>
        <Layout>
          <FirstDiv>
            <SecondDiv>  
              <Ul className="bg-white">
                {result.map(producto => (
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
  
  export default Buscar
  