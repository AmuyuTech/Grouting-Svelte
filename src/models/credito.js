export class Credito {
    constructor(
        uid,
        nombre,
        fecha,
        clienteId,
        cliente,
        total,
        pagos
    ) {
        this.uid        = uid
        this.name       = nombre
        this.date       = fecha
        this.cid        = clienteId
        this.cname      = cliente
        this.total      = total
        this.payments   = (pagos.map((x) => new Pago(x.uid, x.date, x.name, x.amount)))
    }
    toObject() {
        return {
            uid     : this.uid,
            name    : this.name,
            date    : this.date,
            cid     : this.cid,
            cname   : this.cname,
            total   : this.total,
            payments: this.payments.map((x) => x.toObject())
        }
    }
}
export class Pago {
    constructor(
        uid,
        fecha,
        nombre,
        monto
    ) {
        this.uid    = uid
        this.date   = fecha
        this.name   = nombre
        this.amount = monto
    }
    toObject() {
        return {
            uid: this.uid,
            date: this.date,
            name: this.name,
            amount: this.amount
        }
    }
}
export const CreditoConverter = {
    toFirestore: (data) => {
        data.toObject()
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Credito(
            data.uid,
            data.name,
            data.date,
            data.cid,
            data.cname,
            data.total,
            data.payments
        )
    }
}