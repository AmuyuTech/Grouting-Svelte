const functions = require("firebase-functions");
/** Constantes para la DB **/
/**------------------------------------**/
const ClienteColection = "CLIENTE";
const CreditoColection = "CREDITO";
const FacturaColection = "FACTURA";
const GastoColection = "GASTO";
const ProductoColection = "PRODUCTO";
const TransaccionColection = "TRANSACCION";
const UsuarioColection = "USUARIO";
const VentaColection = "VENTA";
const BucketsColection = "BUCKET";
const WildCard = "/{docId}";
/**------------------------------------**/
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })
const admin = require("firebase-admin");
const firebase = require("firebase");
admin.initializeApp();

const db = admin.firestore();
const rt = admin.database();
const auth = admin.auth();

const firestoreF = functions.firestore;
const BCollection = db.collection(BucketsColection);
exports.ProductsBucket = firestoreF
  .document(ProductoColection + WildCard)
  .onWrite((change, ctx) => {
    const data = change.after.data();
    const bucket = { name: data.name, url: data.url };
    const aux = {};
    aux[change.after.id] = bucket;
    return BCollection.doc(ProductoColection).set(aux, { merge: true });
  });
exports.GenerateCategories = firestoreF
  .document(ProductoColection + WildCard)
  .onWrite((c, _) => {
    const data = c.after.data().cats;
    console.log(data);
    const ans = {};
    const aux = data.forEach((id) => {
      ans[id] = true;
    });
    return BCollection.doc("Categorias").set(ans, { merge: true });
  });
/** phone Number se usa para guardar el dni  (no se usaba antes y resulta conveniente para guardar la variable **/
exports.UsuarioCrear = firestoreF
  .document(UsuarioColection + WildCard)
  .onCreate((change, _) => {
    const data = change.data();
    const claims = {
      role: data.role,
      store: data.store.id,
    };
    return auth
      .createUser({
        uid: change.id,
        displayName: data.name,
        email: data.mail,
        disabled: data.status,
        password: data.pass,
      })
      .then((value) => {
        return auth.setCustomUserClaims(change.id, claims).then(() => {
          const aux = {};
          aux[change.id] = {
            name: data.name,
            status: data.status,
            phone: data.phone,
            dni: data.dni,
          };
          return BCollection.doc(UsuarioColection).set(aux, { merge: true });
        });
      });
  });
/*
exports.UsuarioBucket = functions.auth.user().onCreate((user) => {
    const aux = {}
    aux[user.uid] = {
        name: user.displayName,
        status: user.disabled
    }
    BCollection.doc(UsuarioColection).set(aux, {merge: true})
})
*/

exports.UsuarioUpdateDisable = firestoreF
  .document(UsuarioColection + WildCard)
  .onUpdate((change, _) => {
    const data = change.after.data();
    return auth
      .updateUser(change.after.id, { disabled: data.status })
      .then((_) => {
        const aux = {};
        const path = change.after.id + ".status";
        aux[path] = data.status;
        return BCollection.doc(UsuarioColection).set(aux, { merge: true });
      });
  });
exports.UsuarioClaimsUpdate = firestoreF
  .document(UsuarioColection + WildCard)
  .onUpdate((c, _) => {
    const data = c.after.data();
    const claims = {
      role: data.role,
      store: data.store.id,
    };
    return auth.setCustomUserClaims(c.after.id, claims);
  });
// Ventas
exports.ValidarVenta = firestoreF
  .document(VentaColection + WildCard)
  .onUpdate((snp, _) => {
    const adata = snp.after.data();
    const bdata = snp.before.data();
    const verifyer = adata.checker;
    if (adata.aproved !== bdata.aproved) {
      const payload = {
        uid: verifyer.id,
        name: verifyer.name,
        date: adata.store,
        origin: null,
        destiny: adata.storeId,
        originId: null,
        destinyId: adata.items,
        productos: firebase.firestore.Timestamp.now(),
      };
      return db.collection(TransaccionColection).add(payload);
    }
  });
// Transacciones
exports.CommitTransaction = firestoreF
  .document(TransaccionColection + WildCard)
  .onCreate((snp, _) => {
    const data = snp.data();
    const productos = data.productos;
    const transacciones = [];
    productos.forEach((p) => {
      const pId = p.id;
      const cant = p.quantity;
      if (data.origin !== null) {
        transacciones.push(lessToPath(pId, data.originId, cant));
      }
      if (data.destiny !== null) {
        transacciones.push(addToPath(pId, data.destinyId, cant));
      }
    });
    return Promise.all(transacciones);
  });
function addToPath(id$, store$, cant$) {
  return rt.ref(id$ + "/" + store$).transaction((current_value) => {
    return (current_value || 0) + cant$;
  });
}
function lessToPath(id$, store$, cant$) {
  return addToPath(id$, store$, -1 * cant$);
}

// Clientes
exports.BucketClientes = firestoreF
    .document(ClienteColection+WildCard)
    .onWrite((snp) => {
        const data = snp.after.data()
        const payload = {}
        payload[snp.after.id] = {
            name: data.name,
            nit:   data.nit
        }
        const transaccion = db.batch()
        transaccion.set(BCollection.doc(ClienteColection), payload, {merge: true})
        const before = snp.before.data()

        if (data.asesorId !== before.asesorId) {
            transaccion.set(BCollection.doc(ClienteColection).collection(BucketsColection).doc(before.asesorId), deleteFieldPayload(before.asesorId), {merge: true})
        }
        transaccion.set(BCollection.doc().collection(BucketsColection).doc(data.asesorId), payload, {merge: true})
        return transaccion.commit()
    })
// Proveedores
// Utils
/**
 * Returns an object containing and order for delete every field listed in @fields
 * @param fields$ a list of every field to delete in the doc
 * @returns {{}} an object to delete every path  usin the doc.set(this, {merge: true}) order in firestore
 */
function deleteFieldPayload(...fields$) {
    const aux = {}
    fields$.forEach(f => {
        aux[f] = firebase.firestore.FieldValue.delete()
    })
    return aux
}
//////////Genmerar PDfs///////////////

exports.generarReporte = functions.https.onCall(async (data, ctx) => {
  const desde = data.desde;
  const hasta = data.hasta;
  const asesor = data.asesor;
  const cliente = data.cliente;
  const tipo =
    data.tipo === "Ventas"
      ? "REGISTROSVENTAS"
      : data.tipo === "Creditos"
      ? "CREDITOS"
      : data.tipo === "Gastos"
      ? "GASTOS"
      : "TRANSACCIONES";
  const ref = db.collection(tipo);
  let query = ref.where("fecha", ">=", desde).where("fecha", "<=", hasta);
  if (tipo === "CREDITOS" || tipo === "REGISTROSVENTAS") {
    if (asesor !== "") {
      query = query.where("asesorId", "==", asesor);
    }
    if (cliente !== "") {
      query = query.where("cliente", "==", cliente);
    }
  }
  const payload = await query.get().then((snap) => {
    snap.docs.map((snp) => snp.data());
  });
  return { payload };
});
exports.generarCatalogo = functions.https.onCall(async (data, ctx) => {
  const payload = await db
    .collection("PRODUCTOS")
    .get()
    .then((snp) => snp.docs.map((doc) => doc.data()));
  return { payload };
});
exports.generarStock = functions.https.onCall(async (d, ctx) => {
  const prods = await db
    .collection("BUCKETS")
    .doc("productos")
    .get()
    .then((snp) => snp.data());
  const data = [];
  const stocks = await rt
    .ref("productos")
    .get()
    .then((s) => s.val());
  Object.keys(prods).forEach((k) => {
    data.push({
      nombre: prods[k].nombre,
      elalto: stocks[k].elalto,
      sopocachi: stocks[k].sopocachi,
      zonasur: stocks[k].zonasur,
    });
  });
  return { payload: data };
});
