import firebase from "firebase";

export class Transaccion {
    constructor(
        uid='',
        nombre='',
        origen='',
        destino='',
        origenId='',
        destinoId='',
        productos=[],
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
    addItem() {
        this.productos.push(new ItemT('', '', 0))
    }
    setOrigen({name, id}) {
        this.origin = name
        this.originId = id
    }
    setDestino({name, id}) {
        this.destiny = name
        this.destinyId = id
    }
    toString() {
        return ''  +
        this.uid       + ' ++ ' +
        this.name      + ' ++ ' +
        this.date      + ' ++ ' +
        this.origin    + ' ++ ' +
        this.destiny   + ' ++ ' +
        this.originId  + ' ++ ' +
        this.destinyId + ' ++ ' +
        this.productos.join(' == ')
    }
    toObject() {
        return {
            uid      : this.uid,
            name     : this.name,
            date     : this.date,
            origin   : this.origin,
            destiny  : this.destiny,
            originId : this.originId,
            destinyId: this.destinyId,
            productos: this.productos.map((x) => x.toObject())
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
    setProducto({name, id}) {
        this.name = name
        this.id = id
    }
    toObject() {
        return {
            name: this.name,
            id: this.id,
            quantity: this.quantity
        }
    }
    toString() {
        return '[' + this.name + '++' + this.id + '++' + this.quantity + ']'
    }
}
export const TransaccionConverter  = {
    toFirestore: (dato) => {
        return dato.toObject()
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