const functions = require("firebase-functions");

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

exports.CrearBucketProducts = functions.firestore
    .document("PRODUCTOS/{ProductId}")
    .onCreate((snap, context) => {
      const payload = db.batch();
      const data = snap.data();
      const bucket = {
        nombre: data.nombre,
        photourl: data.photourl,
      };
      const id = data.id;
      const categorias = {};
      data.categorias.forEach((c) => {
        categorias[c] = true;
      });
      const BucketP = db.collection("BUCKETS").doc("productos");
      const BucketC = db.collection("BUCKETS").doc("categorias");
      payload.set(BucketP, {[id]: bucket}, {merge: true});
      payload.set(BucketC, categorias, {merge: true});
      return payload.commit();
    });
exports.ActualizarBucketProductos = functions.firestore
    .document("PRODUCTOS/{ProductId}")
    .onUpdate((doc, ctx) => {
      const payload = db.batch();
      const data = doc.after.data();
      const bucket = {
        nombre: data.nombre,
        photourl: data.photourl,
      };
      const id = data.id;
      const categorias = {};
      data.categorias.forEach((c) => {
        categorias[c] = true;
      });
      const BucketP = db.collection("BUCKETS").doc("productos");
      const BucketC = db.collection("BUCKETS").doc("categorias");
      payload.set(BucketP, {[id]: bucket}, {merge: true});
      payload.set(BucketC, categorias, {merge: true});
      return payload.commit();
    });
exports.CrearBucketUsuarios = functions.firestore
    .document("USUARIOS/{UserId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const bucket = {
        nombre: data.nombre,
      // photourl: data.photourl
      };
      const id = data.id;
      return db.collection("BUCKETS").doc("usuarios").set({
        [id]: bucket,
      },
      {
        merge: true,
      });
    });
exports.ActualizarBucketUsuarios = functions.firestore
    .document("USUARIOS/{UserId}")
    .onUpdate((doc, ctx) => {
      const data = doc.after.data();
      const bucket = {
        nombre: data.nombre,
      // photourl: data.photourl
      };
      const id = data.id;
      return db.collection("BUCKETS").doc("usuarios").set({
        [id]: bucket,
      },
      {
        merge: true,
      });
    });

exports.CrearBucketClientes = functions.firestore
    .document("CLIENTES/{UserId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const bucket = {
        nombre: data.nombre,
        nit: data.nit,
      // photourl: data.photourl
      };
      const id = data.id;
      return db.collection("BUCKETS").doc("clientes").set({
        [id]: bucket,
      },
      {
        merge: true,
      });
    });
exports.ActualizarBucketClientes = functions.firestore
    .document("CLIENTES/{UserId}")
    .onUpdate((doc, ctx) => {
      const data = doc.after.data();
      const bucket = {
        nombre: data.nombre,
        nit: data.nit,
      // photourl: data.photourl
      };
      const id = data.id;
      return db.collection("BUCKETS").doc("clientes").set(
          {[id]: bucket},
          {merge: true});
    });
exports.CrearStockb = functions.firestore
    .document("PRODUCTOS/{ProductId}")
    .onCreate((doc, ctx) => {
      const id = doc.data().id;
      const ref = rt.ref(`productos/${id}/`);
      return ref.set({
        elalto: 0,
        sopocachi: 0,
        zonasur: 0,
      }, (error) => {
        if (error) {
          console.log("Data could not be saved." + error);
        } else {
          console.log("Data saved successfully.");
        }
      });
    });
exports.ActualizarStockb = functions.firestore
    .document("TRANSACCIONES/{ProductId}").onCreate((doc, ctx) => {
      const data = doc.data();
      const origen = data.origen;
      const destino = data.destino;
      const transacciones = [];
      data.items.forEach((element) => {
        const pid = element.id;
        if (destino === "elalto" || destino === "sopocachi" || destino === "zonasur") {
          transacciones.push(rt.ref(`productos/${pid}/${destino}`).transaction((current_value) => {
            return (current_value || 0) + element.cantidad;
          }));
        }
        if (origen === "elalto" || origen === "sopocachi" || origen === "zonasur") {
          transacciones.push(rt.ref(`productos/${pid}/${origen}`).transaction((current_value) => {
            return (current_value || 0) - element.cantidad;
          }));
        }
      });
      return Promise.all(transacciones);
    });
exports.RegistrarVentab = functions.firestore
    .document("VENTAS/{VentasId}").onCreate(async (snapshot, ctx) => {
      const data = snapshot.data();
      const prods = data.items;
      const ref = admin.firestore().collection("TRANSACCIONES");
      const usuario = await admin.firestore().collection("USUARIOS").doc(data.asesorId).get();
      let al = null;
      if (usuario.exists) {
        al = usuario.data().almacen;
      // log('test', {al})
      }
      const payload = {
        fecha: data.fecha,
        venta: data.numero,
        destino: snapshot.id,
        origen: al,
        usuario: data.asesor,
      };
      const items = [];
      // const usuario = await admin.auth().getUser(data.asesorId).then(v => v).catch(err => null)
      for (let i = 0; i < prods.length; i++) {
        items.push({
          cantidad: prods[i].cantidad,
          id: prods[i].producto,
          nombre: prods[i].nombre,
        });
      }
      return ref.add(payload);
    });


exports.createrUserAccountb = functions.firestore
    .document("USUARIOS/{userId}")
    .onCreate((snapshot) => {
      const userinfo = snapshot.data();
      return admin
          .auth()
          .createUser({
            uid: userinfo.ci,
            displayName: userinfo.nombre,
            email: userinfo.correo,
            password: userinfo.pass,
          })
          .catch((error) => {
            console.log("Eror al crear usuario", error);
          });
    });

exports.updateUserClailmsb = functions.firestore
    .document("USUARIOS/{userId}")
    .onUpdate((change) => {
      const mdata = change.after.data();
      return admin.auth().setCustomUserClaims(mdata.ci, {tipo: mdata.tipo});
    });
exports.updateUserData = functions.firestore
    .document("USUARIOS/{userId}")
    .onUpdate((change) => {
      const mData = change.after.data();
      return admin.auth().updateUser(change.after.id, {
        email: mData.correo,
        displayName: mData.nombre,
      });
    },
    );
exports.CreateUserClaimsb = functions.auth.user()
    .onCreate(async (user) => {
      const udata = await admin.firestore().collection("USUARIOS").doc(user.uid).get();
      const us = udata.data();
      return admin
          .auth()
          .setCustomUserClaims(user.uid, {tipo: us.tipo});
    });

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
