
    // let producto = {
    //     cantidad:[]
    // }
    // validarProducto(producto)
    
export function validarProducto(producto$){

    //expreciones regulares
    let ret = 'True';
    let namAtr = '';
    let ia = 0;

    //Categoria
    namAtr = 'La categoria ';
    for(let i=0 ; i<producto$.categorias.length() ; i++){
        if( producto$.categorias[i].trim() == '' ){
            ret = namAtr + 'nro: ' + (i+1).toString + ' esta vacia';
            return ret;
        }
    }
    //codigo
    namAtr = 'El codigo ';
    if(producto$.codigo.trim() == '' ){
        ret = namAtr + 'del producto esta vacio.';
        return ret;
    }
    //codigo de barras
    namAtr = 'El codigo de barras ';
    if(producto$.codigodebarras.trim() == '' ){
        ret = namAtr + 'del producto esta vacio.';
        return ret;
    }
    //descripcion
    namAtr = 'La descripcion ';
    if(producto$.descripcion.trim() == '' ){
        ret = namAtr + 'del producto esta vacia.';
        return ret;
    }
    //Descuento de ferreteria
    namAtr = 'El descuento de ferreteria ';
    if(producto$.descuentoFerreteria < 0 ){
        ret = namAtr + 'del producto es negativo.';
        return ret;
    }
    //descuento Obras 
    namAtr = 'El descuento de obras ';
    if(producto$.descuentoObras < 0 ){
        ret = namAtr + 'del producto es negativo.';
        return ret;
    }
    //descuento Oficina
    namAtr = 'El descuento de oficina ';
    if(producto$.descuentoOficina < 0 ){
        ret = namAtr + 'del producto es negativo.';
        return ret;
    }
    //Nombre
    namAtr ='El nombre ';
    if(producto$.nombre.trim() == '' ){
        ret = namAtr + 'del producto esta vacio.';
        return ret;
    }
    //photo url = ""
    namAtr ='La Url de la Foto ';
    if(producto$.photourl.trim() == '' ){
        ret = namAtr + 'del producto esta vacia.';
        return ret;
    }
    //precio Ferreteria = 0;
    namAtr = 'El precio de ferreteria ';
    if(producto$.precioFerreteria < 0 ){
        ret = namAtr + 'del producto es negativo.';
        return ret;
    }
    //precio Obras = 0;
    namAtr = 'El precio de obras ';
    if(producto$.precioObras < 0 ){
        ret = namAtr + 'del producto es negativo.';
        return ret;
    }
    //precio Oficina = 0;
    namAtr = 'El precio de oficina ';
    if(producto$.precioOficina < 0 ){
        ret = namAtr + 'del producto es negativo.';
        return ret;
    }
    //return Bien=True 
    return ret;
}
export function calcularEstado(factura$){

    let ret = 'True';
    let namAtr = '';
    
    let ia1 = 0;
    let ia2 = 0;

    let sa1 = '';
    let sa2 = '';

    let ba1 = false;    //bool auxiliar dinamico
    let ba2 = true;     //bool permanece en true hasta que una cantidad no coincida
    let ba3 = false;    //bool alguna vez a coincidido una cantidad

    //estado: calcularEstado(), Incompleto Pendiente Completo
    
    for(let i = 0 ; i < factura$.items.length ; i++ ){
        ia1 = 0;
        ia2 = 0;
        ba1 = false;
        sa1 = factura$.items[i].nombre.trim();
        ia1 = factura$.items[i].cantidad;
        for(let j = 0 ; j < factura$.despachos.length ; j++ ){
            for(let k = 0 ; k < factura$.despachos[j].items.length ; k++ ){
                sa2 = factura$.despachos[j].items[k].nombre.trim();                
                if( sa1 == sa2 ){
                    ia2 = ia2 + factura$.despachos[j].items[k].add;
                    ba1 = true;
                    ba3 = true;     //se encontro almenos una coincidencia                    
                }
            }
        }
        if( ia1 > ia2 ){
            ba2 = false;            //no se encontro coincidencias en algun item
        }
        if( ia1 < ia2 ){
            ret = 'False';          //Cantidad en despacho es mayor a la de items en factura wadefok
            return ret;
        }
    }

    if( ba3 ){
        if( ba2 ){
            ret = 'Completo';
        }
        else{
            ret = 'Pendiente';
        }
    }
    else{
        ret = 'Incompleto';
    }
    return ret;
}

export function validarFactura(factura$){

    let ret = 'True';
    let namAtr = '';
    let ia = 0;

    //numero: string
    namAtr ='El numero ';
    if(factura$.numero.trim() == '' ){
        ret = namAtr + 'de la factura esta vacio.';
        return ret;
    }
    //fecha: string
    //fecha,
    namAtr ='La fecha ';
    if(factura$.fecha.trim() == '' ){
        ret = namAtr + 'de la factura esta vacia.';
        return ret;
    }
    if(factura$.fecha.trim() == '//' ){
        ret = namAtr + 'de los gastos esta vacia.';
        return ret;
    }
    //año UwU
    namAtr ='El año de la fecha especificada ';
    if( (parseInt(factura$.fecha.trim().substring(0,4,10)) < 2000) || ( parseInt(factura$.fecha.trim().substring(0,4,10)) > 2100 ) ){
        ret = namAtr + 'de la factura esta incorrecto.';
        return ret;
    }
    //mes OwO
    namAtr ='El mes de la fecha especificada ';
    if( (parseInt(factura$.fecha.trim().substring(5,7,10)) < 1) || ( parseInt(factura$.fecha.trim().substring(5,7,10)) > 12 ) ){
        ret = namAtr + 'de la factura esta incorrecto.';
        return ret;
    }
    //dia UnU
    namAtr ='El dia de la fecha especificada ';
    ia = 30;
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 1 ){
        ia = 31;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 2 ){
        if ( parseInt(factura$.fecha.trim().substring(0,4,10)) % 4 == 0 ){
            ia = 29;
        }
        else{
            ia = 28;
        }
    }        
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 3 ){
        ia = 31;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 4 ){
        ia = 30;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 5 ){
        ia = 31;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 6 ){
        ia = 30;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 7 ){
        ia = 31;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 8 ){
        ia = 31;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 9 ){
        ia = 30;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 10 ){
        ia = 31;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 11 ){
        ia = 30;
    }
    if ( parseInt(factura$.fecha.trim().substring(5,7,10)) == 12 ){
        ia = 31;
    }
    if( (parseInt(factura$.fecha.trim().substring(8,10,10)) < 1) || ( parseInt(factura$.fecha.trim().substring(8,10,10)) > ia ) ){
        ret = namAtr + 'de la factura esta incorrecto.';
        return ret;
    }
    ia = 0;
    //estado: calcularEstado(), Incompleto Pendiente Completo
    namAtr ='El estado ';
    if(factura$.estado.trim() == '' ){
        ret = namAtr + 'de la factura esta vacio.';
        return ret;
    }
    if(factura$.estado.trim() != 'Incompleto' && factura$.estado.trim() != 'Pendiente' && factura$.estado.trim() == 'Completo' ){
        ret = namAtr + 'de la factura esta erroneo.';
        return ret;
    }
    //usuario: string,
    namAtr ='El usuario ';
    if(factura$.usuario$.trim() == '' ){
        ret = namAtr + 'de la factura esta vacio.';
        return ret;
    }
    //proveedor: string,
    namAtr ='El proveedor ';
    if(factura$.proveedor.trim() == '' ){
        ret = namAtr + 'de la factura esta vacio.';
        return ret;
    }
    /*items: [],
        Item {
            cantidad: number,
            nombre: "",
            precioUnitario: number,
            descuento: number,
        }
    */
    for(let i=0 ; i<factura$.items.length ; i++ ){
        namAtr ='La cantidad ';
        if(factura$.items[i].cantidad < 0 ){
            ret = namAtr + 'del item' + (i+1).toString() + ' de la factura es menor a cero.';
            return ret;
        }
        namAtr ='El nombre ';
        if(factura$.items[i].nombre.trim() == '' ){
            ret = namAtr + 'del item' + (i+1).toString() + ' de la factura esta vacio.';
            return ret;
        }
        namAtr ='El precio unitario ';
        if(factura$.items[i].precioUnitario < 0 ){
            ret = namAtr + 'del item ' + (i+1).toString() + ' de la factura es menor a cero.';
            return ret;
        }
        namAtr ='El descuento ';
        if(factura$.items[i].descuento < 0 ){
            ret = namAtr + 'del item ' + (i+1).toString() + ' de la factura es menor a cero.';
            return ret;
        }
    }    

    /*despachos []
    {
        nombre: "$Username",
        fecha: ${yyyy}/${mm}/${dd},
        items: [],
            Item {
                nombre: string,
                cantidad: number,
                pendiente: number,
                add: number /*cantidad que se a;ade en este sub-item
            }
    },
    */ 
    for(let i=1 ; i < factura$.despachos.length ; i++ ){
        //nombre
        namAtr ='El nombre ';
        if(factura$.despachos[i].nombre.trim() == '' ){
            ret = namAtr + 'del despacho nro ' + (i+1).toString() + ' de la factura esta vacio.';
            return ret;
        }
        //fecha
        namAtr ='La fecha ';
        if(factura$.despachos[i].fecha.trim() == '' ){
            ret = namAtr + 'del despacho nro ' + (i+1).toString() + ' de la factura esta vacia.';
            return ret;
        }
        if(factura$.despachos[i].fecha.trim() == '//' ){
            ret = namAtr + 'del despacho nro ' + (i+1).toString() + ' de la factura esta vacia.';
            return ret;
        }
        //año UwU
        namAtr ='El año de la fecha especificada ';
        if( (parseInt(factura$.despachos[i].fecha.trim().substring(0,4,10)) < 2000) || ( parseInt(factura$.despachos[i].fecha.trim().substring(0,4,10)) > 2100 ) ){
            ret = namAtr + 'del despacho nro ' + (i+1).toString() + ' de la factura esta incorrecto.';
            return ret;
        }
        //mes OwO
        namAtr ='El mes de la fecha especificada ';
        if( (parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) < 1) || ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) > 12 ) ){
            ret = namAtr + 'del despacho nro ' + (i+1).toString() + ' de la factura esta incorrecto.';
            return ret;
        }
        //dia UnU
        namAtr ='El dia de la fecha especificada ';
        ia = 30;
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 1 ){
            ia = 31;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 2 ){
            if ( parseInt(factura$.despachos[i].fecha.trim().substring(0,4,10)) % 4 == 0 ){
                ia = 29;
            }
            else{
                ia = 28;
            }
        }        
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 3 ){
            ia = 31;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 4 ){
            ia = 30;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 5 ){
            ia = 31;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 6 ){
            ia = 30;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 7 ){
            ia = 31;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 8 ){
            ia = 31;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 9 ){
            ia = 30;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 10 ){
            ia = 31;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 11 ){
            ia = 30;
        }
        if ( parseInt(factura$.despachos[i].fecha.trim().substring(5,7,10)) == 12 ){
            ia = 31;
        }
        if( (parseInt(factura$.despachos[i].fecha.trim().substring(8,10,10)) < 1) || ( parseInt(factura$.despachos[i].fecha.trim().substring(8,10,10)) > ia ) ){
            ret = namAtr + 'del despacho nro '+ (i+1).toString() +' de la factura esta incorrecto.';
            return ret;
        }
        ia = 0;

        //items
        for(let j=0 ; j < factura$.despachos[i].items.length ; j++ ){
            //nombre
            namAtr ='El nombre ';
            if(factura$.despachos[i].items[j].nombre.trim() == '' ){
                ret = namAtr + 'del item nro ' + (j+1).toString() + ' del despacho nro '+ (i+1).toString() +' de la factura esta incorrecto.';
                return ret;
            }
            //cantidad
            namAtr ='El cantidad ';
            if(factura$.despachos[i].items[j].cantidad < 0 ){
                ret = namAtr + 'del item nro ' + (j+1).toString() + ' del despacho nro '+ (i+1).toString() +' de la factura esta incorrecto.';
                return ret;
            }
            //pendiente
            namAtr ='El pendiente ';
            if(factura$.despachos[i].items[j].pendiente < 0 ){
                ret = namAtr + 'del item nro ' + (j+1).toString() + ' del despacho nro '+ (i+1).toString() +' de la factura esta incorrecto.';
                return ret;
            }
            //add
            namAtr ='El add ';
            if(factura$.despachos[i].items[j].add < 0 ){
                ret = namAtr + 'del item nro ' + (j+1).toString() + ' del despacho nro '+ (i+1).toString() +' de la factura esta incorrecto.';
                return ret;
            }

        }
    }
    return ret;
}

export function validarCliente(cliente$){

    let ret = 'True';
    let namAtr = '';
    let ia = 0;
    
    //direccion,
    namAtr ='La direccion ';
    if(cliente$.direccion.trim() == '' ){
        ret = namAtr + 'del cliente esta vacia.';
        return ret;
    }
    //id,
    namAtr ='El identificador ';
    if(cliente$.id.trim() == '' ){
        ret = namAtr + 'del cliente esta vacio.';
        return ret;
    }
    //nit,
    namAtr ='El Nit ';
    if(cliente$.nit.trim() == '' ){
        ret = namAtr + 'del cliente esta vacio.';
        return ret;
    }
    //nombre,
    namAtr ='El nombre ';
    if(cliente$.nombre.trim() == '' ){
        ret = namAtr + 'del cliente esta vacio.';
        return ret;
    }
    //telefono,
    namAtr ='El telefono ';
    if(cliente$.telefono.trim() == '' ){
        ret = namAtr + 'del cliente esta vacio.';
        return ret;
    }
    //zona,
    namAtr ='La zona ';
    if(cliente$.zona.trim() == '' ){
        ret = namAtr + 'del cliente esta vacia.';
        return ret;
    }
    //asesor
    namAtr ='El asesor ';
    if(cliente$.asesor.trim() == '' ){
        ret = namAtr + 'del cliente esta vacio.';
        return ret;
    }
    //True = Bien
    return ret;
}

export function validarUsuario(usuario$){

    let ret = 'True';
    let namAtr = '';
    let ia = 0;

    //nombre = ''
    namAtr ='El nombre ';
    if(usuario$.nombre.trim() == '' ){
        ret = namAtr + 'del usuario esta vacio.';
        return ret;
    }
    //ci = ''
    namAtr ='El ci ';
    if(usuario$.ci.trim() == '' ){
        ret = namAtr + 'del usuario esta vacio.';
        return ret;
    }
    //telefono = ''
    namAtr ='El telefono ';
    if(usuario$.telefono.trim() == '' ){
        ret = namAtr + 'del usuario esta vacio.';
        return ret;
    }
    //correo = ''
    namAtr ='El correo ';
    if(usuario$.correo.trim() == '' ){
        ret = namAtr + 'del usuario esta vacio.';
        return ret;
    }
    if(usuario$.correo.trim().length == 0){
        ret = namAtr + 'del usuario esta vacio.';
        return ret;
    }

    let b1 = false
    for(let i=0 ; i < usuario$.correo.trim().length ; i++){
        if(usuario$.correo.trim()[i] == '@'){
            b1 = false
        }
    }
    if(b1){
        ret = namAtr + 'del usuario no es valido.';
        return ret; 
    }
    if(usuario$.correo.trim().substring(usuario$.correo.trim().length - 4 , usuario$.correo.trim().length) != '.com'){
        ret = namAtr + 'del usuario no es valido.';
        return ret;
    }

    //pass = ''
    namAtr ='La contraseña ';
    if(usuario$.pass.trim() == '' ){
        ret = namAtr + 'del usuario esta vacia.';
        return ret;
    }
    //repass = ''
    namAtr ='La contraseña ';
    if(usuario$.repass.trim() == '' ){
        ret = namAtr + 'del usuario esta vacia.';
        return ret;
    }
    // ---
    namAtr ='Las contraseñas ';
    if(usuario$.pass.trim() != usuario$.repass.trim()){
        ret = namAtr + 'del usuario no coinciden.';
        return ret;
    }
    if( usuario$.pass.trim().length >= 6 && usuario$.repass.trim().length >= 6 ){
        ret = namAtr + 'del usuario deben contener almenos 6 caracteres.';
        return ret;
    }

    //almacen = ''
    namAtr ='El almacen ';
    if(usuario$.almacen.trim() == '' ){
        ret = namAtr + 'del usuario esta vacio.';
        return ret;
    }
    
    return ret;
}

export function validarGasto(gasto$){

    let ret = 'True';
    let namAtr = '';
    let ia = 0;

    //fecha,
    namAtr ='La fecha ';
    if(gasto$.fecha.trim() == '' ){
        ret = namAtr + 'de los gastos esta vacia.';
        return ret;
    }
    if(gasto$.fecha.trim() == '//' ){
        ret = namAtr + 'de los gastos esta vacia.';
        return ret;
    }
    //año UwU
    namAtr ='El año de la fecha especificada ';
    if( (parseInt(gasto$.fecha.trim().substring(0,4,10)) < 2000) || ( parseInt(gasto$.fecha.trim().substring(0,4,10)) > 2100 ) ){
        ret = namAtr + 'de los gastos esta incorrecto.';
        return ret;
    }
    //mes OwO
    namAtr ='El mes de la fecha especificada ';
    if( (parseInt(gasto$.fecha.trim().substring(5,7,10)) < 1) || ( parseInt(gasto$.fecha.trim().substring(5,7,10)) > 12 ) ){
        ret = namAtr + 'de los gastos esta incorrecto.';
        return ret;
    }
    //dia UnU
    namAtr ='El dia de la fecha especificada ';
    ia = 30;
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 1 ){
        ia = 31;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 2 ){
        if ( parseInt(gasto$.fecha.trim().substring(0,4,10)) % 4 == 0 ){
            ia = 29;
        }
        else{
            ia = 28;
        }
    }        
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 3 ){
        ia = 31;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 4 ){
        ia = 30;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 5 ){
        ia = 31;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 6 ){
        ia = 30;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 7 ){
        ia = 31;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 8 ){
        ia = 31;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 9 ){
        ia = 30;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 10 ){
        ia = 31;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 11 ){
        ia = 30;
    }
    if ( parseInt(gasto$.fecha.trim().substring(5,7,10)) == 12 ){
        ia = 31;
    }
    if( (parseInt(gasto$.fecha.trim().substring(8,10,10)) < 1) || ( parseInt(gasto$.fecha.trim().substring(8,10,10)) > ia ) ){
        ret = namAtr + 'de los gastos esta incorrecto.';
        return ret;
    }
    ia = 0;    
    //nombre:
    namAtr ='El nombre ';
    if(gasto$.nombre.trim() == '' ){
        ret = namAtr + 'del gasto esta vacio.';
        return ret;
    }
    //items: [],
        //nombre: '',
        //cantidad: 0,
        //costo: 0
    for( let i=0 ; i < gasto$.items.length ; i++ ){
        namAtr ='El nombre ';
        if(gasto$.items[i].nombre.trim() == '' ){
            ret = namAtr + 'del item '+ (i+1).toString() +'del gasto esta vacio.';
            return ret;
        }
        namAtr ='La cantidad ';
        if(gasto$.items[i].cantidad < 0 ){
            ret = namAtr + 'del item '+ (i+1).toString() +'del gasto es menor a cero.';
            return ret;
        }
        namAtr ='El costo ';
        if( parseInt(gasto$.items[i].total < 0) ){
            ret = namAtr + 'del item '+ (i+1).toString() +'del gasto es menor a cero.';
            return ret;
        }
        
        ia = ia + gasto$.items[i].total;
    }        
    //total: 0
    namAtr ='El total ';
    if(gasto$.total < 0 ){
        ret = namAtr + 'del gasto es menor a cero.';
        return ret;
    }
    // namAtr ='El total de costo de items y el de gastos no concuerdan ';
    // if( gasto$.total != ia ){
        // ret = namAtr;
        // return ret;
    // }
    ia = 0;
    if(gasto$.items.length === 0){
        ret = 'No hay gastos a registrar'
    }
    //Todo bien -> ret = 'True'
    return ret;
}
//jesd util.specs.js
//comando- cd src -> node utils.js -> 
export function getDate(aux = new Date()) {
    return `${aux.getFullYear()}/${aux.getMonth()<9 ? '0': ''}${(aux.getMonth() + 1)}/${aux.getDate()}`
}
export function getTipoVenta(tipo$) {
    return tipo$ == 1 ? 'Efectivo' : tipo$ == 2 ? 'Credito' : 'Otro'
}
/**
 * 
 * @param {string} s$ 
 * @returns {true} si es una fecha en formato {false} si no lo es
 */
export function isValidDate(s$) {
    //La magia de las expreciones Regulares
    return /\d{4}\/\d{2}\/\d{2}/g.test(s$)
}