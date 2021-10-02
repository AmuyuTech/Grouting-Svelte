import {
    BucketCategoria,
    BucketProducts,
    BucketUsuarios,
    Login,
    registrarProducto,
    registrarUsuario, User
} from "./firebaseAPI";
import {Producto} from "../models/producto";
import {Usuario} from "../models/usuario";
import firebase from "firebase";
import * as assert from "assert";
const Timeout = 10000

describe('TestProducto', () => {
    const ProductoA = new Producto(
        'Producto1',
        '1234',
        'descripcion de prueba',
        '1234567890',
        10.0,
        9.0,
        0,
        0,
        'Ninuguna',
        ['Cat1', 'Cat2', 'Cat3']
    )
    it('CreaUnProducto', () => {
        //registramos en la base de datos
        registrarProducto(ProductoA).then(() => {
            expect(1).toEqual(1)
        }).catch((err) => {
            throw err
        })
        // Verificamos el bucket
    })
    it('Verificar Bucket Productos', () => {
        BucketProducts.subscribe((value) => {
            if (value.length !== 0) {
                // console.log(value)
                expect(value[value.length - 1].name).toEqual(ProductoA.name)
                expect(value[value.length - 1].url).toEqual(ProductoA.url)
            }
        })
    }, Timeout)
    it('Revisa Categorias', () => {
        BucketCategoria.subscribe((value$) => {
            if (value$.length !== 0) {
                expect(value$.sort()).toEqual(ProductoA.cats.sort())
            }
        })
    }, Timeout)
})
describe('TestUsuario', () => {
    const UsuarioA = new Usuario(
        '123456',
        'Nombre1',
        '7654321',
        'test@com.com',
        '123456',
        'qwer',
        'Administrador',
        false
    )
    it('Crear Usuario', () => {
        registrarUsuario(UsuarioA).then(() => {
            expect(1).toEqual(1)
        }).catch((err) => {
            throw err
        })
    })
    it('Check Usuario Bucket', () => {
        BucketUsuarios.subscribe((data) =>  {
            if(data.length === 0 ) {
                expect(data).toEqual([])
            }else {
                expect(data[0].name).toEqual(UsuarioA.name)
                expect(data[0].dni).toEqual(UsuarioA.dni)
                expect(data[0].status).toEqual(UsuarioA.status)
            }
        })
    })
    it('Check Usuario Creado', () => {
        Login(UsuarioA.mail, UsuarioA.pass).then((user) => {
            const usr = user.user
            expect(usr.displayName).toEqual(UsuarioA.name)
            expect(usr.email).toEqual(UsuarioA.mail)
            firebase.auth().currentUser.getIdTokenResult(true).then((val) => {
                expect(val.claims.role).toEqual( UsuarioA.role )
                expect(val.claims.store).toEqual( UsuarioA.store )
            }).catch((err) => {
                throw err
            })
        }).catch((err) => {
            throw err
        })
    }, Timeout)
})