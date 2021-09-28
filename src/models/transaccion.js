import firebase from "firebase";

export class Transaccion {
    constructor(
        uid,
        nombre,
        origen,
        destino,
        origenId,
        destinoId,
        productos,
        fecha = firebase.firestore.Timestamp.now()
    ) {
        this.uid        = uid
        this.name       = nombre
        this.date       = fecha
        this.origin     = origen
        this.destiny    = destino
        this.originId   = origenId
        this.destinyId  = destinoId
        this.productos  = (productos.map((x) => new ItemT(x.name, x.id, x.quantity)))
    }
}
export class ItemT {
    constructor(
        nombre,
        pid,
        cantidad
    ) {
        this.name = nombre
        this.id = pid
        this.quantity = cantidad
    }
    toObject() {
        return {
            name: this.name,
            id: this.id,
            quantity: this.quantity
        }
    }
}
export const TransaccionConverter  = {
    toFirestore: (dato) => {
        const productos = dato.productos.map((x) => x.toObject())
        return {
            uid      : dato.uid,
            name     : dato.name,
            date     : dato.date,
            origin   : dato.origin,
            destiny  : dato.destiny,
            originId : dato.originId,
            destinyId: dato.destinyId,
            productos: productos
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        const  prods = data.productos.map((x) => (new ItemT(x.name, x.ip, x.quantity)))
        return new Transaccion(
            data.uid,
            data.name,
            data.origin,
            data.destiny,
            data.originId,
            data.destinyId,
            data.productos,
            data.date
        )
    }
}