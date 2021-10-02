export class Gasto {
    constructor(
        uid,
        nombre,
        fecha,
        total,
        items
    ) {
        this.uid   = uid
        this.name  = nombre
        this.date  = fecha
        this.total = total
        this.items = (items.map((x) => new ItemG(x.name, x.quantity, x.total)))
    }
    toObject() {
        return {
            uid  : this.uid,
            name : this.name,
            date : this.date,
            total: this.total,
            items: this.items.map(x => x.toObject()),
        }
    }
}
export class ItemG {
    constructor(
        nombre,
        cantidad,
        total
    ) {
        this.name = nombre
        this.quantity = cantidad
        this.total = total
    }
    toObject() {
        return {
            name    : this.name,
            quantity: this.quantity,
            total   : this.total
        }
    }
}
export const GastoConverter = {
    toFirestore: (dat) => {dat.toObject()},
    fromFirestore: (snapshot, options) => {
        const dat = snapshot.data(options)
        return new Gasto(
            dat.uid,
            dat.name,
            dat.date,
            dat.total,
            dat.items
        )
    }
}