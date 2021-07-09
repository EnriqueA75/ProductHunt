import React, { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, CampoDiv, InputSubmit, Error } from '../components/ui/Formulario';
import { css } from '@emotion/react';
import Router from 'next/router'
import firebase from '../firebase';
import Swal from 'sweetalert2';
//validaciones
import useValidation from '../hooks/useValidation';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const Login = () => {

  const [error, setError] = useState(false)

  const STATE_INICIAL = {
    email: '',
    password: ''
  }
  const {
    valores, 
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(STATE_INICIAL, validarIniciarSesion, iniciarSesion)
  const { email, password} = valores

  async function iniciarSesion(){
    try {
      await firebase.login(email, password)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sesión iniciada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      Router.push('/')
    } catch (error) {
      console.error('se produjo un error al iniciar el usuario', error);
      setError(error.message)
    }
  }

    return (
      <div>
        <Layout><></>
          <h1
            css={css`
              text-align: center;
            `}
          >Iniciar Sesión</h1>

          <Formulario
            onSubmit={handleSubmit}
          >
            <CampoDiv>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CampoDiv>

            <CampoDiv>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CampoDiv>

            <InputSubmit 
              type="submit"
              value="Iniciar Sesión"
            />
             {error ? <Error>{error}</Error> : null} 
          </Formulario>
        </Layout>
      </div>
    )
  }
  
  export default Login
  