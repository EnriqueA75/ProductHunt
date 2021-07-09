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
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const CrearCuenta = () => {

    const [error, setError] = useState(false)

    const STATE_INICIAL = {
      nombre: '',
      email: '',
      password: ''
    }

    const {
      valores, 
      errores,
      handleSubmit,
      handleChange,
      handleBlur
    } = useValidation(STATE_INICIAL, validarCrearCuenta, crearCuenta)
    const {nombre, email, password} = valores

    async function crearCuenta() {
      try {
        await firebase.registrar(nombre, email, password);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        Router.push('/')
      } catch (error) {
        console.error('se produjo un error al crear el usuario', error);
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
          >Crear Cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
          >

            <CampoDiv>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CampoDiv>
            {errores.nombre && <Error>{errores.nombre}</Error>}
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
            {errores.email && <Error>{errores.email}</Error>}

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
            {errores.password && <Error>{errores.password}</Error>}
            <InputSubmit 
              type="submit"
              value="Crear Cuenta"
            /> 
            {error ? <Error>{error}</Error> : null}
          </Formulario>
        </Layout>
      </div>
    )
  }
  
  export default CrearCuenta
  