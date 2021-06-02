export class Producto {
    constructor (id, categorias, codigo, codigodebarras, descripcion, descuentoFerreteria, descuentoObras, descuentoOficina, nombre, photourl, precioFerreteria, precioObras, precioOficina){
        this.id = id
        this.categorias = categorias
        this.codigo = codigo
        this.codigodebarras = codigodebarras
        this.descripcion = descripcion
        this.descuentoFerreteria = descuentoFerreteria
        this.descuentoObras = descuentoObras
        this.descuentoOficina = descuentoOficina
        this.nombre = nombre
        this.photourl = photourl
        this.precioFerreteria = precioFerreteria
        this.precioObras = precioObras
        this.precioOficina = precioOficina
    }
}
export const ProductConverter = {
    toFirestore: function (prod) {
        return {
            categorias: prod.categorias,
            codigo: prod.codigo,
            codigodebarras: prod.codigodebarras,
            descripcion: prod.descripcion,
            descuentoFerreteria: prod.descuentoFerreteria,
            descuentoObras: prod.descuentoObras,
            descuentoOficina: prod.descuentoOficina,
            nombre: prod.nombre,
            photourl: prod.photourl,
            precioFerreteria: prod.precioFerreteria,
            precioObras: prod.precioObras,
            precioOficina: prod.precioOficina
        }
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options)
        return new Producto(
            snapshot.id,
        data.categorias,
        data.codigo,
        data.codigodebarras,
        data.descripcion,
        data.descuentoFerreteria,
        data.descuentoObras,
        data.descuentoOficina,
        data.nombre,
        data.photourl,
        data.precioFerreteria,
        data.precioObras,
        data.precioOficina
        )
    }
}

