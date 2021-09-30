const functions = require("firebase-functions");
/** Constantes para la DB **/
/**------------------------------------**/
const ClienteColection = "CLIENTE"
const CreditoColection = "CREDITO"
const FacturaColection = "FACTURA"
const GastoColection   = "GASTO"
const ProductoColection= "PRODUCTO"
const TransaccionColection = "TRANSACCION"
const UsuarioColection = "USUARIO"
const VentaColection   = "VENTA"
const BucketsColection = "BUCKET"

const WildCard = "/{docId}"
/**------------------------------------**/
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const rt = admin.database();
const auth = admin.auth()

const firestoreF = functions.firestore
const BCollection = db.collection(BucketsColection)
exports.ProductsBucket = firestoreF
    .document(ProductoColection+WildCard)
    .onWrite((change, ctx) => {
      const data = change.after.data()
      const bucket = {name: data.name, url: data.url}
      const aux = {}
      aux[change.after.id] = bucket
      return BCollection.doc(ProductoColection).set(aux, {merge: true})
    })

/** phone Number se usa para guardar el dni  (no se usaba antes y resulta conveniente para guardar la variable **/
exports.UsuarioCrear = firestoreF
    .document(UsuarioColection+WildCard)
    .onCreate((change, _) => {
      const data = change.data()
      const claims = {
        role: data.role,
        store: data.store
      }
      return auth.createUser({
          uid: change.after.id,
          displayName:  data.name,
          email:        data.mail,
          disabled:     data.status,
          password:     data.pass,
          phoneNumber:  data.phone,
          photoURL:     data.dni
      }).then((value) => {
          return auth.setCustomUserClaims(change.id, claims)
      })
    })
exports.UsuarioBucket = functions.auth.user().onCreate((user) => {
    const aux = {}
    aux[user.uid] = {
        name: user.displayName,
        phone: user.phoneNumber,
        dni: user.photoURL,
        status: user.disabled
    }
    BCollection.doc(UsuarioColection).set(aux, {merge: true})
})
exports.UsuarioUpdateDisable = firestoreF
    .document(UsuarioColection+WildCard)
    .onUpdate((change, _) => {
        const data = change.after.data()
        return auth.updateUser(change.after.id, {disabled: data.status}).then( _ => {
            const aux = {}
            const path = change.after.id + '.status'
            aux[path] = data.status
            return BCollection.doc(UsuarioColection).set(aux, {merge: true})
        })
    })
exports.UsuarioBucketUpdate = firestoreF
    .document(UsuarioColection+WildCard)
    .onUpdate((c, _) => {
        const data = c.after.data()
        const claims = {
            role: data.role,
            store: data.store
        }
        return auth.setCustomUserClaims(c.after.id, claims)
    })

//////////Genmerar PDfs///////////////


exports.generarReporte = functions.https.onCall(async (data, ctx) => {
  const desde = data.desde;
  const hasta = data.hasta;
  const asesor = data.asesor;
  const cliente = data.cliente;
  const tipo = data.tipo === "Ventas" ? "REGISTROSVENTAS" : data.tipo === "Creditos" ? "CREDITOS" : data.tipo === "Gastos" ? "GASTOS" : "TRANSACCIONES";
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
  return {payload};
});
exports.generarCatalogo = functions.https.onCall(async (data, ctx) => {
  const payload = await db.collection("PRODUCTOS").get().then((snp) => snp.docs.map((doc) => doc.data()));
  return {payload};
});
exports.generarStock = functions.https.onCall(async (d, ctx) => {
  const prods = await db.collection("BUCKETS").doc("productos").get().then((snp) => snp.data());
  const data = [];
  const stocks = await rt.ref("productos").get().then((s) => s.val());
  Object.keys(prods).forEach((k) => {
    data.push({
      nombre: prods[k].nombre,
      elalto: stocks[k].elalto,
      sopocachi: stocks[k].sopocachi,
      zonasur: stocks[k].zonasur,
    });
  });
  return {payload: data};
});
