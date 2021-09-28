import { authState } from "rxfire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions"
import {
    BucketsColection,
    ClienteColection,
    CreditoColection,
    FacturaColection,
    GastoColection,
    ProductoColection,
    TransaccionColection, UsuarioColection, VentaColection
} from "./firebaseConst";
import {Cliente, ClienteConverter} from "../models/cliente";
import error from "svelte/types/compiler/utils/error";
import {Credito, CreditoConverter} from "../models/credito";
import {Factura, FacturaConverter} from "../models/factura";
import {Gasto, GastoConverter} from "../models/gasto";
import {ProductConverter, Producto} from "../models/producto";
import {Transaccion, TransaccionConverter} from "../models/transaccion";
import {Usuario, UsuarioConverter} from "../models/usuario";
import {Venta, VentaConverter} from "../models/venta";



const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};
let test = PRODUCTION;
firebase.initializeApp(firebaseConfig);


if (test) {
    //! deactrivate emulator
    firebase.auth().useEmulator("http://localhost:9099");
    firebase.firestore().useEmulator("localhost", 8080);
    firebase.database().useEmulator("localhost", 9000);
    firebase.functions().useEmulator("localhost", 5001);
}
export let auth = firebase.auth()
export let db = firebase.firestore()
export let rt = firebase.database().ref()
let fnc = firebase.functions()
// Fumnciones

export const GenerarCatalogo = fnc.httpsCallable('generarCatalogo')
export const GenerarStocks = fnc.httpsCallable('generarStock')
export const GenerarReporte = fnc.httpsCallable('generarReporte')

// User

export const User = authState(auth);
export function LogOut() {
    return auth.signOut()
}


// Colecciones

const _ClientesCollection = db.collection(ClienteColection)
const _CreditosCollection = db.collection(CreditoColection)
const _FacturasCollection = db.collection(FacturaColection)
const _GastosCollection   = db.collection(GastoColection)
const _ProductoCollection = db.collection(ProductoColection)
const _TransaccionColection = db.collection(TransaccionColection)
const _UsuarioColection   = db.collection(UsuarioColection)
const _VentaColection     = db.collection(VentaColection)
const _BucketsColection   = db.collection(BucketsColection)

// Clientes

export async function getCliente(id$): Cliente | null {
    return await _ClientesCollection.doc(id$)
        .withConverter(ClienteConverter)
        .get().then((doc) => {
            if(doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}
export function registrarCliente(Cliente$: Cliente) {
    return _ClientesCollection.withConverter(ClienteConverter).add(Cliente$)
}
export function actualizarCliente(Cliente$: Cliente, id$: String) {
    return _ClientesCollection.doc(id$).withConverter(ClienteConverter).update(Cliente$)
}

// Creditos

export async function getCredito(id$): Credito | null {
    return await _CreditosCollection.doc(id$)
        .withConverter(CreditoConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else  {
                return null
            }
        }).catch((err) => {
            return null
        })
}
export async function registrarCredito(Credito$: Credito) {
    return _CreditosCollection.withConverter(CreditoConverter).add(Credito$)
}
export async function actualizarCredito(Credito$: Credito, Id$: String) {
    return _CreditosCollection.doc(Id$).withConverter(CreditoConverter).update(Credito$)
}

// Factura

export async function getFactura(id$: String): Factura | null {
    return await _FacturasCollection.doc(id$)
        .withConverter(FacturaConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}
export async function registrarFactura(Factura$: Factura) {
    return _FacturasCollection.withConverter(FacturaConverter).add(Factura$)
}
export async function actualizarFactura(Factura$: Factura, Id$: String) {
    return _FacturasCollection.doc(Id$).withConverter(FacturaConverter).update(Factura$)
}

// Gasto

export async function getGasto(id$: String): Gasto | null {
    return await _GastosCollection.doc(id$)
        .withConverter(GastoConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}
export function registrarGasto(Gasto$: Gasto) {
    return _GastosCollection.withConverter(GastoConverter).add(Gasto$)
}

// Producto

export async function getProducto(id$: String) {
    return await _ProductoCollection.doc(id$)
        .withConverter(ProductConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}
export function registrarProducto(Producto$: Producto) {
    return _ProductoCollection.withConverter(ProductConverter).add(Producto$)
}
export function actualizarProducto(Producto$: Producto, id$: String) {
    return _ProductoCollection.withConverter(ProductConverter).doc(id$).update(Producto$)
}

// Transaccion

export async function getTransaccion(id$: String): Transaccion | null {
    return await _TransaccionColection.doc(id$)
        .withConverter(TransaccionConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}

export function registerTransaction(Transaccion$: Transaccion) {
    return _TransaccionColection.withConverter(TransaccionConverter).add(Transaccion$)
}

//Usuario
export async function getUsuario(id$: String): Usuario | null{
    return await _UsuarioColection.doc(id$)
        .withConverter(UsuarioConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}

export function registrarUsuario(Usuario$: Usuario) {
    return _UsuarioColection.withConverter(UsuarioConverter).add(Usuario)
}
export function actualizarUsuario(Usuario$: Usuario, id$: String) {
    return _UsuarioColection.doc(id$).withConverter(UsuarioConverter).update(Usuario$)
}

//Venta

export async function getVenta(id$: String) {
    return await _VentaColection.doc(id$)
        .withConverter(VentaConverter)
        .get().then((doc) => {
            if (doc.exists){
                return doc.data()
            }else {
                return null
            }
        }).catch((err) => {
            return null
        })
}
export function registarVenta(Venta$: Venta) {
    return _VentaColection.withConverter(VentaConverter).add(Venta$)
}
export function validarVenta(id$: String) {
    return _VentaColection.doc(id$).update({aproved: true})
}