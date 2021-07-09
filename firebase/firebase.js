import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import firebaseConfig from './config'

class FireBase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth()
        this.db = app.firestore()
        this.storage = app.storage()
    }
    //registra un usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }
    //inicia sesion en firebase
    async login(email, password){
        return this.auth.signInWithEmailAndPassword(email,password)
    }
    //cierra la sesion del user
    async cerrarSesion(){
        await this.auth.signOut()
    }
}
const firebase = new FireBase()
export default firebase