import React from 'react';
import { css } from '@emotion/react';
const Error404 = () => {
    return ( 
    <div css={css`
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(252,17,17,1) 0%, rgba(31,188,226,1) 96%, rgba(0,212,255,1) 100%);
        border: 1px solid #e1e1e1;
        margin-top: 5%;
    `}>
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
                font-family: 'Pt Sans', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                font-weight: bold;
                margin: 3rem;
            `}
        >Error página no disponible o producto no existente</h1>
    </div> 
    );
}
 
export default Error404;