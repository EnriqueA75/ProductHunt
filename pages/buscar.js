import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';

const Heading = styled.h1`
  color: red;
`

const Buscar = () => {
    return (
      <div>
        <Layout>
          <Heading>Buscar</Heading>
        </Layout>
      </div>
    )
  }
  
  export default Buscar
  