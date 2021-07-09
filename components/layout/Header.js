import React, { useContext } from 'react';
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Boton from '../ui/Boton';
import { FireBaseContext } from '../../firebase';
import Swal from 'sweetalert2';
import Router from 'next/router';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin:0 auto;
    @media (min-width: 268px){
        display: flex;
        justify-content: space-between;
    }
`
const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    &:hover{
    cursor: pointer;
    }
`

const Header = () => {
    const { usuario, firebase } = useContext(FireBaseContext)

    const cerrarUsuario = () => {
        firebase.cerrarSesion()
        Router.push('/')
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Sesión cerrada',
            showConfirmButton: false,
            timer: 1500
          })
    }

    return ( 
        <header
            css={css`
                border-bottom: 2px solid #e1e1e1;
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div 
                css={css`
                    display: flex;
                    align-items: center;
                    
                `}>
                    <Link href="/">
                        <Logo>CEAS</Logo>
                    </Link>

                    <Buscar />
                    <Navegacion />
                </div>
                <div 
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                   {usuario ? (
                    <>
                        <p css={css`
                        margin-right: 2rem;
                        `}>Hola: {usuario.displayName}</p>
                        <Boton type="button" bgColor="true" onClick={() => cerrarUsuario()}>Cerrar Sesión</Boton>
                    </>
                   ) : (
                    <>
                        <Link href="/login"><Boton bgColor="true">Login</Boton></Link>
                        <Link href="/crear-cuenta"><Boton>Crear Cuenta</Boton></Link>                    
                    </>
                   )} 
                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;