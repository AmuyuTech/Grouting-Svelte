import { authState } from "rxfire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";


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
let test = false;
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
const _AlmacenesCollection = db.collection("REGISTROSALMACEN");
const _VentasCollection = db.collection("REGISTROSVENTAS");
const _UsuariosCollection = db.collection("USUARIOS");
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
export function registrarCliente(Cliente$) {
  _ClientesCollection.add(Cliente$);
}
export function registrarCredito(Credito$) {
  _CreditosCollection.add(Credito$);
}
export function registrarDespacho(Despacho$) {
  _DespachosCollection.add(Despacho$);
}
export function registrarFactura(Factura$) {
  _FacturasCollection.add(Factura$);
}
export function registrarGasto(Gasto$) {
  _GastosCollection.add(Gasto$);
}
export async function registrarProducto(Producto$) {
  _ProductosCollection.add(Producto$);
}
export function registrarAlmacen(Almacen$) {
  _AlmacenesCollection.add(Almacen$);
}
export function registrarVenta(Venta$) {
  _VentasCollection.add(Venta$);
}
export function registrarUsuario(Usuario$) {
  _UsuariosCollection.add(Usuario$);
}
//Editores *Update*
export function actualizarUsuario(Usuario$, Id$) {
  _UsuariosCollection.doc(Id$).update(Usuario$);
}
export function actualizarDespacho(Despacho$, Id$) {
  _DespachosCollection.doc(Id$).update(Despacho$);
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
