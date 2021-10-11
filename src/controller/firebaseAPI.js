import { authState } from "rxfire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";
import {
  BucketsColection,
  ClienteColection,
  CreditoColection,
  FacturaColection,
  GastoColection,
  ProductoColection,
  ProveedoresColection,
  TransaccionColection,
  UsuarioColection,
  VentaColection,
} from "./firebaseConst";
import { ClienteConverter } from "../models/cliente";
import { CreditoConverter } from "../models/credito";
import { FacturaConverter } from "../models/factura";
import { GastoConverter } from "../models/gasto";
import { ProductConverter } from "../models/producto";
import { TransaccionConverter } from "../models/transaccion";
import { UsuarioConverter } from "../models/usuario";
import { VentaConverter } from "../models/venta";
import { readable } from "svelte/store";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
let test = process.env.PRODUCTION;
firebase.initializeApp(firebaseConfig);

if (test) {
  //! deactrivate emulator
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.database().useEmulator("localhost", 9000);
  firebase.functions().useEmulator("localhost", 5001);
}
export let auth = firebase.auth();
export let db = firebase.firestore();
export let rt = firebase.database().ref();
export let fnc = firebase.functions();
// Fumnciones

export const GenerarCatalogo = fnc.httpsCallable("generarCatalogo");
export const GenerarStocks = fnc.httpsCallable("generarStock");
export const GenerarReporte = fnc.httpsCallable("generarReporte");

// User

export const User = authState(auth);

export function LogOut() {
  return auth.signOut();
}

export function Login(user$, pass$) {
  return auth.signInWithEmailAndPassword(user$, pass$);
}
// Colecciones

const _ClientesCollection = db.collection(ClienteColection);
const _CreditosCollection = db.collection(CreditoColection);
const _FacturasCollection = db.collection(FacturaColection);
const _GastosCollection = db.collection(GastoColection);
const _ProductoCollection = db.collection(ProductoColection);
const _TransaccionColection = db.collection(TransaccionColection);
const _UsuarioColection = db.collection(UsuarioColection);
const _VentaColection = db.collection(VentaColection);
const _BucketsColection = db.collection(BucketsColection);

// Clientes

export async function getCliente(id$) {
  return await _ClientesCollection
    .doc(id$)
    .withConverter(ClienteConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}
export function registrarCliente(Cliente$) {
  return _ClientesCollection.withConverter(ClienteConverter).add(Cliente$);
}
export function actualizarCliente(Cliente$, id$) {
  return _ClientesCollection
    .doc(id$)
    .withConverter(ClienteConverter)
    .update(Cliente$);
}

// Creditos

export async function getCredito(id$) {
  return await _CreditosCollection
    .doc(id$)
    .withConverter(CreditoConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}
export async function registrarCredito(Credito$) {
  return _CreditosCollection.withConverter(CreditoConverter).add(Credito$);
}
export async function actualizarCredito(Credito$, Id$) {
  return _CreditosCollection
    .doc(Id$)
    .withConverter(CreditoConverter)
    .update(Credito$);
}

// Factura

export async function getFactura(id$) {
  return await _FacturasCollection
    .doc(id$)
    .withConverter(FacturaConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}
export async function registrarFactura(Factura$) {
  return _FacturasCollection.withConverter(FacturaConverter).add(Factura$);
}
export async function actualizarFactura(Factura$, Id$) {
  return _FacturasCollection
    .doc(Id$)
    .withConverter(FacturaConverter)
    .update(Factura$);
}

// Gasto

export async function getGasto(id$) {
  return await _GastosCollection
    .doc(id$)
    .withConverter(GastoConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}
export function registrarGasto(Gasto$) {
  return _GastosCollection.withConverter(GastoConverter).add(Gasto$);
}

// Producto

export async function getProducto(id$) {
  return await _ProductoCollection
    .doc(id$)
    .withConverter(ProductConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}
export function registrarProducto(Producto$) {
  return _ProductoCollection.withConverter(ProductConverter).add(Producto$);
}
export function actualizarProducto(Producto$, id$) {
  return _ProductoCollection.doc(id$).update(Producto$.toObject());
}

// Transaccion

export async function getTransaccion(id$) {
  return await _TransaccionColection
    .doc(id$)
    .withConverter(TransaccionConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}

export function registrarTransaction(Transaccion$) {
  return _TransaccionColection
    .withConverter(TransaccionConverter)
    .add(Transaccion$);
}

//Usuario
export async function getUsuario(id$) {
  return await _UsuarioColection
    .doc(id$)
    .withConverter(UsuarioConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}

export function registrarUsuario(Usuario$) {
  return _UsuarioColection.withConverter(UsuarioConverter).add(Usuario$);
}
export function actualizarUsuario(Usuario$, id$) {
  return _UsuarioColection
    .doc(id$)
    .withConverter(UsuarioConverter)
    .update(Usuario$);
}

//Venta

export async function getVenta(id$) {
  return await _VentaColection
    .doc(id$)
    .withConverter(VentaConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((_) => {
      return null;
    });
}
export function registarVenta(Venta$) {
  return _VentaColection.withConverter(VentaConverter).add(Venta$);
}
export function validarVenta(id$) {
  return _VentaColection.doc(id$).update({ aproved: true });
}
// Proveedores
export async function getProveedores(id$) {}
export function crearProveedor(id$, name$) {
  return _BucketsColection
    .doc(ProveedoresColection)
    .set({ id: id$, name: name$ }, { merge: true });
}
export function actualizarProveedor(id$, name$) {
  return crearProveedor(id$, name$);
}

/** funcion para parsear los buckets **/
const obs = (set, snapshot) => {
  const data = snapshot.data();
  set(parseBucket(data));
};
// Almacenes
// TODO: Refractorizar el string para mantenimiento
/**
 * @returns  get an array de todos los almacenes en formato
 * {
 *    id: String,
 *    name: String
 * }
 *
 */
export function getAlmacenes() {
  return readable([], (set) => {
    rt.child("stores").on("value", (a) => {
      if (!a.val()) {
        return [];
      }
      const aux = Object.keys(a.val()).map((x) => {
        return {
          id: x,
          name: a.val()[x],
        };
      });
      set(aux);
    });
  });
}
export function registrarAlmacen(name$) {
  return rt.child("stores").push().set(name$);
}
export function actualizarAlmacen(id$, name$) {
  return rt.child("stores").child(id$).set(name$);
}
// Stocks
export function getAllStocks(ProductId$) {
  return readable({}, (set) =>
    rt.child(ProductId$).on("value", (a) => {
      set(a.exists() ? a.val() : {});
    })
  );
}
export function getStockAt(ProductId$, StoreId$) {
  return readable(0, (set) => {
    rt.child(ProductId$)
      .child(StoreId$)
      .on("value", (a) => {
        set(a.exists() ? a.val() : 0);
      });
  });
}
////////////////BUCKETS////////////////
/**
 * Bucket de productos
 * @type {Readable<*[]>} - Un store REadable de todos los productos
 * @return {[{id: String, name: String, url: String}]} - Un vector de productos
 */
export const BucketProducts = readable([], (set) => {
  _BucketsColection
    .doc(ProductoColection)
    .onSnapshot((snapshot) => obs(set, snapshot));
});
export const BucketClientes = readable([], (set) => {
  _BucketsColection
    .doc(ClienteColection)
    .onSnapshot((snapshot) => obs(set, snapshot));
});
export const BucketUsuarios = readable([], (set) => {
  _BucketsColection
    .doc(UsuarioColection)
    .onSnapshot((snapshot) => obs(set, snapshot));
});
/**
 * Bucket de Categorias
 * El documentoi de categorias es de formato
 * {
 *      Categoria1: true,
 *      Categoria2: true
 * }
 * Al parsear llamamos solo a los keys del objeto y tendremos un array de Categorias
 * @type {Readable<*[]>}
 */
export const BucketCategoria = readable([], (set) => {
  _BucketsColection.doc("Categorias").onSnapshot((snapshot) => {
    set(Object.keys(snapshot.data() || {}));
  });
});
export const BucketProveedores = readable([], (set) => {
  _BucketsColection.doc("Proveedores").onSnapshot((snp) => {
    const data = snp.exists ? snp.data() : {};
    set(parseBucket(data));
  });
});
function parseBucket(data$) {
  return Object.keys(data$ ? data$ : {}).map(function (id$) {
    return {
      id: id$,
      ...data$[id$],
    };
  });
}

