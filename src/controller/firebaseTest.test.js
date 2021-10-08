import {
    actualizarFactura,
    BucketCategoria,
    BucketProducts,
    BucketUsuarios, createAlmacen, getAllStocks, getAlmacenes, getFactura, getStockAt, getTransaccion, getUsuario,
    Login, registerTransaction, registrarFactura,
    registrarProducto,
    registrarUsuario, updateAlmacen, User
} from "./firebaseAPI";
import {Producto} from "../models/producto";
import {Usuario} from "../models/usuario";
import firebase from "firebase";
import * as assert from "assert";
import {ItemT, Transaccion, TransaccionConverter} from "../models/transaccion";
import {Factura} from "../models/factura";
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
        registrarUsuario(UsuarioA).then((snp) => {
            getUsuario(snp.id).then((snp) => {
                expect(snp.data()).toEqual(UsuarioA)
            })
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
describe('Check Almacenes', () => {
    const nombre = 'Almacen1'
    const nombre2 = 'Almacen2'
    const testID = 'testid'
    it('should Create Almacen', function () {
        createAlmacen(nombre).then(() => {
            expect(1).toEqual(1)
        }).catch((err) => {
            throw err
        })
    });
    it('should Udatean Nonexisting Almacen', function () {
        updateAlmacen(testID, nombre2).then(() => {
            expect(1).toEqual(1)
        }).catch((err) => {
            throw err
        })
    });
    it('should Check Almacenes Bucket', async function () {
        getAlmacenes().subscribe(value => {
            if (value.length !== 0) {
                expect(value).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: testID
                        })
                    ])
                )
            }
        })
    });
})
describe('Transacciones Test', () => {
    const productosT = [
        new ItemT(
            'Producto1',
            'qqwweerr',
            50
        ),
        new ItemT(
            'Producto 2',
            'wwqqeerr',
            40
        ),
        new ItemT(
            'Producto 3',
            'rreewwqq',
            10
        )
    ]
    const Transaccion1 = new Transaccion(
        '1234556',
        'miguel',
        'test1',
        'test2',
        'Almacen1',
        'Almmacen2',
        productosT,
        firebase.firestore.Timestamp.now()
    )
    it('should transform to object', () => {
        expect(TransaccionConverter.toFirestore(Transaccion1)).toEqual(Transaccion1.toObject())
    })
    it('should Create Transaccion', function () {
        registerTransaction(Transaccion1).then((val) => {
            getTransaccion(val.id).then((doc) => {
                if (doc.exists) {
                    expect(Transaccion1).toEqual(doc.data())
                }
            })
        }).catch((err) => {
            throw err
        })
    });
    it('should Ckeck sotcks', function () {
        // Si el objeto qu elle de la base de taton so tiene llaves (no es igual a `{}`) entonces revisar si tiene la propiedad Almacen 1 que se anadio en la prueba anterior como resultado de testear la transacciion
        getAllStocks('qqwweerr').subscribe(value => {
            if (Object.keys(value).length > 0) {
                expect(value).toHaveProperty('Almacen1')
            }
        })
    });

})
describe('Factura Testing', () => {
    const FacturaA = new Factura(
        'uid',
        'Nombre de Prueba',
        firebase.firestore.Timestamp.now(),
        'test Provider',
        'qwerty',
        10.0,
        [],
        []
    )
    it('should REvisar Factura Functions', function () {
        expect(FacturaA.addItem('asdf', 'PF1', 34.5, 100, 90.0)).toBeTruthy()
        expect(FacturaA.addItem('asdg', 'PF2', 34.5, 100, 80.0)).toBeTruthy()
        expect(FacturaA.addItem('asdh', 'PF3', 34.5, 100, 70.0)).toBeTruthy()
        FacturaA.addDespacho('uid2', 'nombre2', firebase.firestore.Timestamp.now(), [40, 30, 20])
        expect(FacturaA.addItem('asdh', 'PF3', 34.5, 100, 70.0)).toBeFalsy()
    });

    it('should Upload Factura', function () {
        registrarFactura(FacturaA).then((snp) => {
            getFactura(snp.id).then((dat) => {
                expect(dat).toEqual(FacturaA)
            })
        })
    });
    it('should updateFactura', function () {
        getAllStocks('asdf').subscribe((value) => {

        })
    });
})