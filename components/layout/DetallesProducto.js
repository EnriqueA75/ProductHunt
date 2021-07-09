import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale'
import Link from 'next/link'
const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`
const Descripcion = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`
const H1 = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    &:hover {
        cursor: pointer;
    }
`
const TextoDescript = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`

const Coments = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    p{
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &::last-of-type{
            margin: 0
        }
    }
`
const Imagen = styled.img`
    width: 100%;
    height: auto;
    min-width: 13em;
    min-height: 13em;
`
const Votos = styled.div`
    flex: 0 0  auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;
    font-size: 2rem;
    p{
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`


const DetallesProducto = ({producto}) => {
    const {nombre, id, comentarios, url, descripcion, empresa, creado, urlImage, votos} =  producto;
    
    return (
        <Producto>
            <Descripcion>
                <div>
                    <Imagen src={urlImage}/>
                </div>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <H1>{nombre}</H1>
                    </Link>
                    <TextoDescript>{descripcion}</TextoDescript>
                    <Coments>
                        <div>
                            <p>💬</p>
                            <p>Comentarios: {comentarios.length}</p>
                        </div>
                    </Coments>
                    <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                </div>
            </Descripcion>
            <Votos>
                <div>&#9650;</div>
                <p>{votos}</p>
            </Votos>
        </Producto>
    );
}
 
export default DetallesProducto;