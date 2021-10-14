export class Usuario {
  constructor(
    dni = "",
    nombre = "",
    telefono = "",
    correo = "",
    contrasena = "",
    almacen = {},
    rol = "",
    status = ""
  ) {
    this.dni = dni;
    this.name = nombre;
    this.phone = telefono;
    this.mail = correo;
    this.pass = contrasena;
    this.store = almacen;
    this.role = rol;
    this.status = status;
  }
}
export const roles = ["Vendedor", "Administrador", "Asesor"];
export const UsuarioConverter = {
  toFirestore: (usuario) => {
    return {
      dni: usuario.dni,
      name: usuario.name,
      phone: usuario.phone,
      mail: usuario.mail,
      pass: usuario.pass,
      store: { name: usuario.store.name, id: usuario.store.id },
      role: usuario.role,
      status: usuario.status,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Usuario(
      data.dni,
      data.name,
      data.phone,
      data.mail,
      data.pass,
      data.store,
      data.role,
      data.status
    );
  },
};
