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
    toObject() {
        const productos = this.productos.map((x) => x.toObject())
        return {
            uid      : this.uid,
            name     : this.name,
            date     : this.date,
            origin   : this.origin,
            destiny  : this.destiny,
            originId : this.originId,
            destinyId: this.destinyId,
            productos: productos
        }
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
        dato.toObject()
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