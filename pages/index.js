import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

const FirstDiv =  styled.div`
    background-color: #f3f3f3;
    min-width: 908px;
` 
const SecondDiv =  styled.div`
    padding: 5rem 0;
    margin: 0 auto;
    min-width: 908px;
    min-height: 873px;
` 
const Ul =  styled.ul`
    background-color: #FFF;
    min-width: 568px;
` 
const Home = () => {

  const { productos } = useProductos('creado')

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
