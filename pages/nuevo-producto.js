import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, CampoDiv, InputSubmit, Error } from '../components/ui/Formulario';
import { css } from '@emotion/react';
import {useRouter} from 'next/router';
import { FireBaseContext } from '../firebase';
import FileUploader from 'react-firebase-file-uploader'
import Swal from 'sweetalert2';
import Error404 from '../components/layout/404';
//validaciones
import useValidation from '../hooks/useValidation';
import validarCrearProducto from '../validacion/validarCrearProducto';

const NuevoProducto = () => {

  //state de las imagenes
  const [nombreImagen, setNombreImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [progress, setProgress] = useState(0)
  const [urlImage, setUrlImage] = useState('')

  const [error, setError] = useState(false)

  const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
  }

  const {
    valores, 
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(STATE_INICIAL, validarCrearProducto, crearProducto)
  const {nombre, empresa, imagen, url, descripcion} = valores
  //hook de routing para redireccionar
  const router = useRouter()

  const { firebase, usuario } = useContext(FireBaseContext)
  
  async function crearProducto() {
    //si el usuario no está autenticado
    if(!usuario){
      return router.push('/login')
    }
    //crear el objeto de nuevo producto
    const producto = {
      nombre, 
      empresa, 
      url,
      urlImage, 
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }
    //insertar en firebase
    firebase.db.collection('productos').add(producto)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto guardado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    return router.push('/')
  }

  const handleUploadStart = () => {
    setProgress(0)
    setSubiendo(true)
  }
  const handleProgress = progreso => setProgress({ progreso })

  const handleUploadError = error => {
    setSubiendo(error)
    console.log(error)
  }
  const handleUploadSuccess = nombre => {
    setProgress(100)
    setSubiendo(false)
    setNombreImagen(nombre)
    firebase.storage.ref("productos").child(nombre).getDownloadURL().then(url => setUrlImage(url))
  }

    return (
      <div>
        <Layout>
        {!usuario ? <Error404/> : (
          <>
             <h1
            css={css`
              text-align: center;
            `}
          >Nuevo Producto</h1>
          <Formulario
            onSubmit={handleSubmit}
          >
          <fieldset>
            <legend>Información general</legend>
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
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Empresa o comercio"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </CampoDiv>
              {errores.empresa && <Error>{errores.empresa}</Error>}

              <CampoDiv>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref('productos')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </CampoDiv>
              {errores.imagen && <Error>{errores.imagen}</Error>}

              <CampoDiv>
                <label htmlFor="url">Enlace</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="URL de tu produco"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </CampoDiv>
              {errores.url && <Error>{errores.url}</Error>}

            </fieldset>
            <fieldset>
              <legend>Sobre tu producto</legend>

              <CampoDiv>
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </CampoDiv>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}

            </fieldset>
              <InputSubmit 
                type="submit"
                value="Crear producto"
              /> 
              {error ? <Error>{error}</Error> : null}
          </Formulario>
          </>
        )}
        </Layout>
      </div>
    )
  }
  
  export default NuevoProducto
  