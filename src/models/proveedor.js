export class Proveedor {
    constructor(
        nit,
        nombre,
        direccion,
        telefono,
        codigo
    ) {
        this.nit     = nit
        this.name    = nombre
        this.address = direccion
        this.phone   = telefono
        this.code    = codigo
    }
    toObject() {
        return {
            nit     : this.nit,
            name    : this.name,
            address : this.address,
            phone   : this.phone,
            code    : this.code
        }
    }
}
export const ProveedorConverter = {
    toFirestore: (data: Proveedor) => {
        return data.toObject()
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Proveedor(
            data.nit,
            data.name,
            data.address,
            data.phone,
            data.code
        )
    }
}