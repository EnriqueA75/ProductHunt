import App from 'next/app'
import firebase, {FireBaseContext} from '../firebase'
import useAutenticacion from '../hooks/useAutenticacion'
import '../public/css/app.css'

const MyApp = (props) => {
    const usuario = useAutenticacion()
    const { Component, pageProps } = props

    return (
        <FireBaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            <Component {...pageProps}/>
        </FireBaseContext.Provider>
    )
}
export default MyApp