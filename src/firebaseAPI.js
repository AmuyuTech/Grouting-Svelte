import { authState } from "rxfire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import products from './assets/products.js'
import usuarios from './assets/usuarios.js'
import ventas from './assets/ventas.js'


const firebaseConfig = {
  apiKey: "AIzaSyDhvu01irK5L0cBV-BpD60QO584MCtEosY",
  authDomain: "inventarioconstructora.firebaseapp.com",
  databaseURL: "https://inventarioconstructora.firebaseio.com",
  projectId: "inventarioconstructora",
  storageBucket: "inventarioconstructora.appspot.com",
  messagingSenderId: "1018493948173",
  appId: "1:1018493948173:web:948f05ee871c3743df6044",
  measurementId: "G-Q47X7GZVGL",
};
let test = true;
firebase.initializeApp(firebaseConfig);


if (test) {
  //! deactrivate emulator
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.database().useEmulator("localhost", 9000);
}

/**
 * * si se traban lo puertos limpiar con :
 * ! search $PORT process
 * ? netstat -ano | findstr :5001
 * * Protocol localAddress RemoteAddress Estado PID
 * ! matar el proceso $PID
 * ? taskkill /F /PID 2564
 */


export let auth = firebase.auth()
export let db = firebase.firestore()
export let rt = firebase.database().ref()
// User
export const User = authState(auth);
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
  _UsuariosCollection.doc(Id$).update(Usuario$);
}
export function actualizarFactura(Factura$, Id$) {
  _FacturasCollection.doc(Id$).update(Factura$);
}
export function actualizarCredito(Credito$, Id$) {
  _CreditosCollection.doc(Id$).update(Credito$);
}
export function actualizarCliente(Cliente$) {
  _ClientesCollection.doc(Id$).update(Cliente$);
}
export function actualizarProducto(Producto$) {
  _ProductosCollection.doc(Id$).update(Producto$);
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
  const payload = db.batch()
  products.forEach(p => {
    const doc = _ProductosCollection.doc()
    const data = {...p, id: doc.id}
    payload.set(doc, data)
  });
  payload.commit()
}
export function registerTestUsers() {
  const payload = db.batch()
  usuarios.forEach( u => {
    const doc = _UsuariosCollection.doc(u.ci)
    const data = {...u, id: doc.id}
    payload.set(doc, data)
  })
  payload.commit()
}
export function registerTestVentas() {
  const payload = db.batch()
  ventas.forEach( u => {
    const doc = _VentasCollection.doc()
    const data = {...u, id: doc.id}
    payload.set(doc, data)
  })
  payload.commit()
}
