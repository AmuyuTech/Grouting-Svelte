export class Producto {
  constructor(
    nombre = "",
    codigo = "",
    descripcion = "",
    codigobarras = "",
    pcf = 0,
    psf = 0,
    dcf = 0,
    dsf = 0,
    foto = "",
    categorias = []
  ) {
    this.name = nombre;
    this.code = codigo;
    this.desc = descripcion;
    this.barcode = codigobarras;
    this.pcf = pcf;
    this.psf = psf;
    this.dcf = pcf;
    this.dsf = dsf;
    this.url = foto;
    this.cats = categorias;
  }
  toObject() {
    return {
      name: this.name,
      code: this.code,
      desc: this.desc,
      barcode: this.barcode,
      pcf: this.pcf,
      psf: this.psf,
      dcf: this.dcf,
      dsf: this.dsf,
      url: this.url,
      cats: this.cats,
    };
  }
}
export const ProductConverter = {
  toFirestore: (producto) => {
    return {
      name: producto.name,
      code: producto.code,
      desc: producto.desc,
      barcode: producto.barcode,
      pcf: producto.pcf,
      psf: producto.psf,
      dcf: producto.dcf,
      dsf: producto.dsf,
      url: producto.url,
      cats: producto.cats,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Producto(
      data.name,
      data.code,
      data.desc,
      data.barcode,
      data.pcf,
      data.psf,
      data.dcf,
      data.dsf,
      data.url,
      data.cats
    );
  },
};

