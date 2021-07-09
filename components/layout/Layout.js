import React from 'react';
import Header from './Header';
import { Global, css } from '@emotion/react';
import Head from 'next/head'

const Layout = (props) => {
    return (
        <>
            <Global
                styles={css`
                    :root{
                        --gris: #3d3d3d;
                        --gris2: #6F6F6F;
                        --naranja: #DA552F;
                    }
                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit;
                    }
                    body {
                        font-size: 1.6rem;
                        line-height: 1.5;
                        font-family: 'PT sans',  sans-serif;
                    }
                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;

                    }
                    h1 h2 {
                        font-family: 'roboto Slab', serif;
                        font-weight: 700;
                    }
                    h3 {
                        font-family: 'PT sans',  sans-serif;
                    }
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }        
                    a {
                        text-decoration: none;                        
                    }
                    img {
                        max-width: 100%;
                        width: 280px;
                        height: 280px;
                    }
                `}
            />
            <Head>
                <title>ProductHunt React</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap" rel="stylesheet"></link>
                <link href="/static/css/app.css" rel="stylesheet"/>
            </Head>
            <Header/>
            <main>
                {props.children}
            </main>
        </>
     );
}
 
export default Layout;