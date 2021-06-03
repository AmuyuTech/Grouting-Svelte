import { auth, db, rt } from "./firebase";
import { authState } from "rxfire/auth";
import { async } from "rxjs";

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
    .child("s                                             tocks")
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
  function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
    }
    return number + ""; // always return a string
  }
  let id = await getProductoNextId().then(
    (v) => v,
    (e) => 0
  );

  _ProductosCollection.doc(zeroFill(id, 5)).set(Producto$);
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