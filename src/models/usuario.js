export class Usuario {
    constructor(
        dni,
        nombre,
        telefono,
        correo,
        contrasena,
        almacen,
        rol
    ) {
        this.dni    = dni
        this.name   = nombre
        this.phone  = telefono
        this.mail   = correo
        this.pass   = contrasena
        this.store  = almacen
        this.role   = rol
    }
}

export const UsuarioConverter = {
    toFirestore: (usuario) => {
        return {
            dni: usuario.dni,
            name: usuario.name,
            phone: usuario.phone,
            mail: usuario.mail,
            pass: usuario.pass,
            store: usuario.store,
            role: usuario.role
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Usuario(
            data.dni,
            data.name,
            data.phone,
            data.mail,
            data.pass,
            data.store,
            data.role
        )
    }
}