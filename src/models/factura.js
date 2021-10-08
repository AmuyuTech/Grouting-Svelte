import firebase from "firebase";

export class Factura {
    constructor(
        uid,
        nombre,
        fecha,
        proveedor,
        proveedorId,
        descuento,
        items,
        despachos
    ) {
        this.uid        = uid
        this.name       = nombre
        this.date       = fecha
        this.provider   = proveedor
        this.providerId = proveedorId
        this.discount   = descuento
        this.items      = (items.map((x) => new ItemF(x.id, x.name, x.price, x.quantity, x.discount)))
        this.dispatches = (despachos.map((x) => new Despacho(x.uid, x.name, x.date, x.items)))
    }
    addItem(id$, nombre$, precio$, cantidad$, descuento$ = 0) {
        if(this.dispatches.length > 0 ) {
            return false
        } else {
            this.items.push(new ItemF(
                id$, nombre$, precio$, cantidad$, descuento$
            ))
            return true
        }
    }
    items
    dispatches
    addDespacho(uid$, nombre$, date$ = firebase.firestore.Timestamp.now(), valuestoAdd$ = this.items.map((_) => {return 0})) {
        //sumatoiria para las cantidades actuales
        const aux = []
        this.items.forEach( (_) => {aux.push(0)})
        this.dispatches.forEach((d ) => {
            d.items.forEach( (i, pos) => {
                aux[pos] += i.quantity
            })
        })
        this.dispatches.push(
            new Despacho(
                uid$,
                nombre$,
                date$,
                this.items.map((x, i) => {
                    return new ItemsD(
                        x.id,
                        x.name,
                        x.quantity,
                        aux[i],
                        valuestoAdd$[i]
                    )

                })
            )
        )
    }
    toObject() {
        let itms = this.items.map((x) => (x.toObject()))
        let dsps = this.dispatches.map((x) => (x.toObject()))
        return {
            uid: this.uid,
            name: this.name,
            date: this.date,
            provider: this.provider,
            providerId: this.providerId,
            discount: this.discount,
            items: itms,
            dispatches : dsps,
        }
    }
}
export class ItemF {
    constructor(
        id,
        nombre,
        precio,
        cantidad,
        descuento
    ) {
        this.id       = id
        this.name     = nombre
        this.price    = precio
        this.quantity = cantidad
        this.discount = descuento
    }
    toObject() {
        return {
            name: this.name,
            id: this.id,
            price: this.price,
            quantity: this.quantity,
            discount: this.discount
        }
    }
}
export class Despacho {
    constructor(
        uid,
        nombre,
        fecha,
        items
    ) {
        this.uid = uid
        this.name = nombre
        this.date = fecha
        this.items = (items.map((x) => new ItemsD(x.id, x.name, x.total, x.actual, x.quantity)))
    }
    toObject() {
        return {
            uid: this.uid,
            name: this.name,
            date: this.date,
            items: (this.items.map((x) => (x.toObject())))
        }
    }
}
export class ItemsD {
    constructor(
        id,
        nombre,
        total,
        actual,
        cantidad
    ) {
        this.id         = id
        this.name       = nombre
        this.total      = total
        this.actual     = actual
        this.quantity   = cantidad
    }
    toObject() {
        return {
            id      : this.id,
            name    : this.name,
            total   : this.total,
            actual  : this.actual,
            quantity: this.quantity
        }
    }
}
export const FacturaConverter = {
    toFirestore: (obj) => {
        return obj.toObject()
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Factura(
            data.uid,
            data.name,
            data.date,
            data.provider,
            data.providerId,
            data.discount,
            data.items,
            data.dispatches
        )
    }
}