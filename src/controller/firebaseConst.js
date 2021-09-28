//Colecciones
export const ClienteColection = "CLIENTE"
export const CreditoColection = "CREDITO"
export const FacturaColection = "FACTURA"
export const GastoColection   = "GASTO"
export const ProductoColection= "PRODUCTO"
export const TransaccionColection = "TRANSACCION"
export const UsuarioColection = "USUARIO"
export const VentaColection   = "VENTA"
export const BucketsColection = "BUCKET"
// Buckets
export function parseBucket (data$: any): any[] {
    const ids = Object.keys(data$)
    const bucket = []
    ids.forEach((id) => {
        bucket.push({
            id,
            ...data$[id]
        })
    })
    return bucket
}
export function parseCategorias(data$: any): String[] {
    return Object.keys(data$)
}
