import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {FireBaseContext} from '../../firebase' 
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout'
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Spinner from '../../components/tools/Spinner';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale'
import {CampoDiv, InputSubmit} from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton';

const ContenerdorProducto = styled.div`
    @media (min-width:968px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`
const ImagenMenu = styled.img`
    max-width: 100%;
    width: 678px;
    height: 498px;
`
const OrderList = styled.ul`
    display: grid;
    min-width: 180px;
`
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #F8C471;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`
const Producto = () => {
    //state del componente
    const [producto, setProducto] = useState({})
    const [error, setError] = useState(false)
    const [comentario, setComentario] = useState({})
    const [consultarDB, setConsultarDB] = useState(true)
    //routing para obtener el id actual
    const router = useRouter()
    const {query: {id}} = router
    //context de firebase
    const { firebase, usuario } = useContext(FireBaseContext)

    useEffect(() => {
        if(id, consultarDB){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()            
                if(producto.exists){
                    setProducto(producto.data())
                    setConsultarDB(false)
                } else {
                    setError(true)
                    setConsultarDB(false)
                }
            }
            obtenerProducto()
        }
    },[id])

    if(Object.keys(producto).length === 0 && !error) return <Spinner/>

    const {nombre, comentarios, url, descripcion, empresa, creado, urlImage, votos, creador, haVotado} =  producto;
    //administrar y validar los votos
    const votarProducto = () => {
        if(!usuario){
            router.push('/login')
        }
        //obtener y sumar votos
        const nuevoTotal = votos + 1
        //verificar si el user ha votado
        if(haVotado.includes(usuario.uid)) return
        //guardar el id del usuario que ha votado
        const nuevoVotado = [...haVotado, usuario.uid]
        //actualizr el state
        firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado: nuevoVotado})
        //actualizar en la bd
        setProducto({
            ...producto,
            votos: nuevoTotal
        })
        setConsultarDB(true)
    }
    //funciones para crear comentarios
    const comentarioChange = (e) => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }
    const agregarComentario = (e) => {
        e.preventDefault()
        if(!usuario){
            router.push('/login')
        }
        //información extra al comentario
        comentario.usuarioId = usuario.uid
        comentario.usuarioNombre = usuario.displayName

        //tomar una copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario]
         //actualizar la bd
         firebase.db.collection('productos').doc(id).update({comentarios: nuevosComentarios})
         //actualizar el state
         setProducto({
             ...producto,
             comentarios: nuevosComentarios
         })
         setConsultarDB(true)
    }
    //identifica si el comentario es del creador
    const esCreador = (id) => {
        if(creador.id === id){
            return true
        }
    }

    return (

    <div>
        <Layout>
            {error ? <Error404/> : (
                <div className="contenedor">
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;

                `}>{nombre}             
                </h1>
                <ContenerdorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                        <p>Por {creador.nombre} de {empresa}</p>
                        <ImagenMenu src={urlImage}/>
                        <p>{descripcion}</p>
                        <h2>Agrega tu comentario</h2>

                        {usuario && (
                            <>
                                <form
                                    onSubmit={agregarComentario}
                                >
                                    <CampoDiv>
                                        <input
                                            name="text"
                                            name="mensaje"
                                            onChange={comentarioChange}
                                        />
                                    </CampoDiv>
                                    <InputSubmit
                                        type="submit"
                                        value="Agregar comentario"
                                    />
                                </form>
                            </>
                        )}

                        <h2 css={css` margin: 2rem 0;`}>Comentarios</h2>
                        {comentarios.length === 0 ? <p>Aún no hay comentarios</p> : (
                            <OrderList>
                            {comentarios.map((comentario, i)  => (
                                <li 
                                    key={`${comentario.usuarioId}-${i}`}
                                    css={css`
                                    border: 1px solid #e1e1e1;
                                    padding: 2rem;
                                `} 
                                >                                        
                                    <p>{comentario.mensaje}</p>
                                    <p>Escrito por: 
                                    <span css={css`
                                    font-weight: bold;
                                    `}>{' '}{comentario.usuarioNombre}</span></p>
                                    {esCreador(comentario.usuarioId) && <CreadorProducto>Creador</CreadorProducto>}                 
                                </li>
                            ))}
                        </OrderList>
                        )}
                    </div>
                    <aside>
                        <Boton 
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visitar URL</Boton>
                        <div css={css`
                            margin-top: 5rem;
                        `}>
                            <p
                                css={css`
                                    text-align: center;
                                `}
                            >{votos} Votos</p>
                            {usuario && (
                                <Boton
                                    onClick={() => votarProducto()}
                                >Votar</Boton>
                            )}
                        </div>
                    </aside>
                </ContenerdorProducto>
            </div>       
            )}                                     
        </Layout>
    </div>

    )
}
 
export default Producto;