export class Venta {
    // checker: {name: String, id: String}
    constructor(
        uid,
        nombre,
        fecha,
        tipo,
        descuento,
        total,
        aprovado,
        almacen,
        almacenID,
        verificador,
        items
    ) {
        this.uid        = uid
        this.name       = nombre
        this.date       = fecha
        this.tipo       = tipo
        this.discount   = descuento
        this.total      = total
        this.aproved    = aprovado
        this.store      = almacen
        this.storeId    = almacenID
        this.checker    = verificador
        this.items      = (items.map((x) => new ItemsV(x.name, x.id, x.quantity, x.price, x.discount)))
    }
    toObject() {
        return {
            uid: this.uid,
            name: this.name,
            date: this.date,
            tipo: this.tipo,
            discount: this.discount,
            total: this.total,
            aproved: this.aproved,
            store: this.store,
            storeId: this.storeId,
            checker: this.checker,
            items: (this.items.map((x) => (x.toObject())))
        }
    }
}
export class ItemsV {
    constructor(
        nombre,
        id,
        cantidad,
        precio,
        descuento
    ) {
        this.name     = nombre
        this.id       = id
        this.quantity = cantidad
        this.price    = precio
        this.discount = descuento
    }
    toObject() {
        return {
            name    : this.name,
            id      : this.id,
            quantity: this.quantity,
            price   : this.price,
            discount: this.discount
        }
    }
}
export const VentaConverter = {
    toFirestore: (dat) => {
        return dat.toObject()
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Venta(
            data.uid,
            data.name,
            data.date,
            data.tipo,
            data.discount,
            data.total,
            data.aproved,
            data.store,
            data.storeId,
            data.checker,
            data.items
        )
    }
}