import { authState } from "rxfire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions"
import products from './assets/products.js'
import usuarios from './assets/usuarios.js'
import ventas from './assets/ventas.js'
import clientes from './assets/clientes.js'
import { getDate } from "./util.js";


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
let test = true;
firebase.initializeApp(firebaseConfig);


if (test) {
  //! deactrivate emulator
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.database().useEmulator("localhost", 9000);
  firebase.functions().useEmulator("localhost", 5001);
}

/**
 * * si se traban lo puertos limpiar con :
 * ! search $PORT process
 * ? netstat -ano | findstr :5001
 * * Protocol localAddress RemoteAddress Estado PID
 * ! matar el proceso $PIDs
 * ? taskkill /F /PID 2564
 */


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
  auth.signOut()
}
// colecciones
const _ClientesCollection = db.collection("CLIENTES");
const _CreditosCollection = db.collection("CREDITOS");
const _DespachosCollection = db.collection("DESPACHOS");
const _FacturasCollection = db.collection("FACTURAS");
const _GastosCollection = db.collection("GASTOS");
const _ProductosCollection = db.collection("PRODUCTOS");
const _AlmacenesCollection = db.collection("TRANSACCIONES");
const _VentasCollection = db.collection("REGISTROSVENTAS");
const _UsuariosCollection = db.collection("USUARIOS");
const _BucketsCollection = db.collection("BUCKETS");
// Getters
export function getProducto(id$) {
  return _ProductosCollection.doc(id$).get()
}
export function getFactura(id$) {
  return _FacturasCollection.doc(id$).get()
}
export function getTransaccion(id$) {
  return _AlmacenesCollection.doc(id$).get()
}
export function getCredito(id$) {
  return _CreditosCollection.doc(id$).get()
}
export function getUsuario(id$) {
  return _UsuariosCollection.doc(id$).get()
}
export function getCliente(id$) {
  return _ClientesCollection.doc(id$).get()
}
export function getGasto(id$) {
  return _GastosCollection.doc(id$).get()
}
export function getVenta(id$) {
  return _VentasCollection.doc(id$).get()
}
//observers (*read*)
export const Clientes$ = _ClientesCollection.orderBy("nombre");
export const Creditos$ = _CreditosCollection.orderBy("fecha", "desc");
export const Despachos$ = _DespachosCollection.orderBy("fecha", "desc");
export const Facturas$ = _FacturasCollection.orderBy("fecha", "desc");
export const Gastos$ = _GastosCollection.orderBy("fecha", "desc");
export const Productos$ = _ProductosCollection.orderBy("nombre");
export const Almacenes$ = _AlmacenesCollection.orderBy("fecha", "desc");
export const Ventas$ = _VentasCollection.orderBy("fecha", "desc");
export const Usuarios$ = _UsuariosCollection.orderBy("nombre");
export const ProductosB$ = _BucketsCollection.doc('productos')
export const CategoriasB$ = _BucketsCollection.doc('categorias')
export const UsuariosB$ = _BucketsCollection.doc('usuarios')
export const ClientesB$ = _BucketsCollection.doc('clientes')
//Special data
export async function getStocks(productId$) {
  return await rt
    .child("stocks")
    .child(productId$)
    .get();
}
async function getProductoNextId() {
  return await rt.child("ids").child("productos").get();
}
//Escritores * write*
export function registrarCliente(Cliente$)          {  return setDoc(_ClientesCollection, Cliente$);}
export function registrarCredito(Credito$)          {  return setDoc(_CreditosCollection, Credito$);}
export function registrarFactura(Factura$)          {  return setDoc(_FacturasCollection, Factura$);}
export function registrarGasto(Gasto$)              {  return setDoc(_GastosCollection, Gasto$);}
export function registrarProducto(Producto$)        {  return setDoc(_ProductosCollection, Producto$);}
export function registrarAlmacen(Almacen$)          {  return setDoc(_AlmacenesCollection, Almacen$);}
export function registrarVenta(Venta$)              {  return setDoc(_VentasCollection, Venta$);}
export function registrarUsuario(Usuario$)          {  return setUsr(_UsuariosCollection, Usuario$);}
//Editores *Update*
export function actualizarUsuario(Usuario$, Id$) {
  return _UsuariosCollection.doc(Id$).update(Usuario$);
}
export function actualizarFactura(Factura$, Id$) {
  return _FacturasCollection.doc(Id$).update(Factura$);
}
export function actualizarCredito(Credito$, Id$) {
  return _CreditosCollection.doc(Id$).update(Credito$);
}
export function actualizarCliente(Cliente$, Id$) {
  return _ClientesCollection.doc(Id$).update(Cliente$);
}
export function actualizarProducto(Producto$, Id$) {
  return _ProductosCollection.doc(Id$).update(Producto$);
}
function setDoc(ref$, data$) {
  const doc = ref$.doc()
  const id = doc.id
  const data = {...data$, id}
  return doc.set(data)
}
function setUsr(ref$, data$) {
  const doc = ref$.doc(data$.ci)
  return doc.set(data)
}


export function registerTestProducts() {
  if(test){const payload = db.batch()
  products.forEach(p => {
    const doc = _ProductosCollection.doc()
    const data = {...p, id: doc.id}
    payload.set(doc, data)
  });
  payload.commit()}
}
export function registerTestUsers() {
  if(test){const payload = db.batch()
  usuarios.forEach( u => {
    const doc = _UsuariosCollection.doc(u.ci)
    const data = {...u, id: doc.id}
    payload.set(doc, data)
  })
  payload.commit()}
}
export function registerTestVentas() {
  if(test){const payload = db.batch()
  ventas.forEach( u => {
    const doc = _VentasCollection.doc()
    const mili = 1e3 * u.fecha.seconds + u.fecha.nanoseconds / 1e6
    const dat = new Date(mili)
    const data = {...u, id: doc.id, fecha: getDate(dat)}
    payload.set(doc, data)
  })
  payload.commit()}
}
export function registerTestClientes() {
  if(test){const payload = db.batch()
  clientes.forEach( u => {
    const doc = _ClientesCollection.doc()
    const data = {...u, id: doc.id}
    payload.set(doc, data)
  })
  payload.commit()}
}
