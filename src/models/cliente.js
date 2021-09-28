import {Credito} from "./credito";

export class Cliente {
    constructor(
        dni,
        nombre,
        direccion,
        telefono,
        asesorId,
        asesor
    ) {
        this.dni         = dni
        this.name        = nombre
        this.address     = direccion
        this.phone       = telefono
        this.advisorId   = asesorId
        this.nameAdvisor = asesor
    }
    toObject() {
        return {
            dni: this.dni,
            name: this.name,
            address: this.address,
            phone: this.phone,
            advisorId: this.advisorId,
            nameAdvisor: this.nameAdvisor
        }
    }
}
export const ClienteConverter = {
    toFirestore: (cliente) => {
        return cliente.toObject()
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Cliente(
            data.dni,
            data.name,
            data.address,
            data.phone,
            data.advisorId,
            data.nameAdvisor
        )
    }
}