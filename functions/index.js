const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })
const admin = require('firebase-admin')
admin.initializeApp();

const db = admin.firestore()
const rt = admin.database()


exports.CrearBucketProducts = functions.firestore
  .document('PRODUCTOS/{ProductId}')
  .onCreate((snap, context) => {
    const data = snap.data()
    const bucket = {
      nombre: data.nombre,
      photourl: data.photourl
    }
    const id = data.id
    return db.collection('BUCKETS').doc('productos').set({ [id]: bucket }, { merge: true })

  })
exports.ActualizarBucketProductos = functions.firestore
  .document('PRODUCTOS/{ProductId}')
  .onUpdate((doc, ctx) => {
    const data = doc.after.data()
    const bucket = {
      nombre: data.nombre,
      photourl: data.photourl
    }
    const id = data.id
    return db.collection('BUCKETS').doc('usuarios').set({ [id]: bucket }, { merge: true })
  })
  exports.CrearBucketUsuarios = functions.firestore
  .document('USUARIOS/{UserId}')
  .onCreate((snap, context) => {
    const data = snap.data()
    const bucket = {
      nombre: data.nombre,
      // photourl: data.photourl
    }
    const id = data.id
    return db.collection('BUCKETS').doc('usuarios').set({ [id]: bucket }, { merge: true })

  })
exports.ActualizarBucketUsuarios = functions.firestore
  .document('USUARIOS/{UserId}')
  .onUpdate((doc, ctx) => {
    const data = doc.after.data()
    const bucket = {
      nombre: data.nombre,
      photourl: data.photourl
    }
    const id = data.id
    return db.collection('BUCKETS').doc('productos').set({ [id]: bucket }, { merge: true })
  })
exports.CrearStock = functions.firestore
  .document('PRODUCTOS/{ProductId}')
  .onCreate((doc, ctx) => {
    const id = doc.data().id
    const ref = rt.ref(`productos/${id}/`)
    return ref.set({
      elalto: 0,
      sopocachi: 0,
      zonasur: 0
    })
  })
exports.ActualizarStock = functions.firestore
  .document('TRANSACCIONES/{ProductId}').onCreate((doc, ctx) => {
    const data = doc.data()
    const origen = data.origen
    const destino = data.destino
    const transacciones = []
    data.items.forEach(element => {
      const pid = element.id
      if (destino === 'elalto' || destino === 'sopocachi' || destino === 'zonasur') {
        transacciones.push(rt.ref(`productos/${pid}/${destino}`).transaction((current_value) => {
          return (current_value || 0) + element.cantidad
        }))
      }
      if (origen === 'elalto' || origen === 'sopocachi' || origen === 'zonasur') {
        transacciones.push(rt.ref(`productos/${pid}/${origen}`).transaction((current_value) => {
          return (current_value || 0) - element.cantidad
        }))
      }
    })
    return Promise.all(transacciones)
  });
exports.RegistrarVenta = functions.firestore.document('VENTAS/{VentasId}').onCreate(async (snapshot, ctx) => {
  const data = snapshot.data()
  const prods = data.items
  const ref = admin.firestore().collection('TRANSACCIONES')
  const usuario = await admin.firestore().collection('USUARIOS').doc(data.asesorId).get()
  let al = null
  if (usuario.exists) {
    al = usuario.data().almacen
    // log('test', {al})
  }
  let payload = {
    fecha: data.fecha,
    venta: data.numero,
    destino: snapshot.id,
    origen: al,
    usuario: data.asesor
  }
  let items = []
  // const usuario = await admin.auth().getUser(data.asesorId).then(v => v).catch(err => null)
  for (let i = 0; i < prods.length; i++) {
    items.push({
      cantidad: prods[i].cantidad,
      id: prods[i].producto,
      nombre: prods[i].nombre
    })
  }
  return ref.add(payload)
})


exports.createrUserAccount = functions.firestore.document('USUARIOS/{userId}')
  .onCreate(snapshot => {
    const userinfo = snapshot.data()
    return admin
      .auth()
      .createUser({
        uid: userinfo.ci,
        displayName: userinfo.nombre,
        email: userinfo.correo,
        password: userinfo.pass,
      })
      .catch(error => {
        console.log('Eror al crear usuario', error)
      })
  })

exports.updateUserClailms = functions.firestore.document('USUARIOS/{userId}')
  .onUpdate(change => {
    const mdata = change.after.data()
    return admin.auth().setCustomUserClaims(mdata.ci, { admin: mdata.admin, al: mdata.almacen })
  })
exports.updateUserData = functions.firestore.document('USUARIOS/{userId}')
  .onUpdate(change => {
    const mData = change.after.data()
    return admin.auth().updateUser(change.after.id, {
      email: mData.correo,
      displayName: mData.nombre
    })
  }
  )
exports.CreateUserClaims = functions.auth.user()
  .onCreate(async user => {
    const udata = await admin.firestore().collection('USUARIOS').doc(user.uid).get()
    const us = udata.data()
    return admin
      .auth()
      .setCustomUserClaims(user.uid, { admin: us.admin, al: us.almacen })
  })
