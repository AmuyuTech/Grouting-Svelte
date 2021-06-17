//------------------------------------------FACTURAS----------------------------------------------
export const pdf_factura = (factura$) => {

    // Variables UwU
    let tit = 'Factura';

    //numero
    //fecha
    //estado
    //usuario
    //proveedor

    //Items[]
        //nombre
        //cantidad
        //precioUnitario
        //descuento
    //despachos[]
        //nombre
        //fecha
        //items[]
            //nombre
            //cantidad
            //pendiente
            //add

    ///*
    let c1 = 'Numero';
    let c2 = 'Fecha';
    let c3 = 'Estado';
    let c4 = 'Usuario';
    let c5 = 'Proveedor';
    let c6 = 'Items()';

        let c61 = 'Nombre';
        let c62 = 'Cantidad';
        let c63 = 'Precio Unitario';
        let c64 = 'Descuento';

    let c7 = 'Despachos()';

        let c71 = 'Nombre';
        let c72 = 'Fecha';
        let c73 = 'Items()';

            let c731 = 'Nombre';
            let c732 = 'Cantidad';
            let c733 = 'Pendiente';
            let c734 = 'Add';

    let cols = [c1,c2,c3,c4,c5,c6,c7];
    let cols6 = [c61, c62, c63, c64];
    let cols7 = [c71, c72, c73];
    let cols73 = [c731, c732, c733, c734];
    //*/
    ///*
    let cid1 = 'numero';
    let cid2 = 'fecha';
    let cid3 = 'estado';
    let cid4 = 'usuario';
    let cid5 = 'proveedor';
    let cid6 = 'items';

        let cid61 = 'nombre';
        let cid62 = 'cantidad';
        let cid63 = 'precioUnitario';
        let cid64 = 'descuento';

    let cid7 = 'despachos';

        let cid71 = 'nombre';
        let cid72 = 'fecha';
        let cid73 = 'items';

            let cid731 = 'nombre';
            let cid732 = 'cantidad';
            let cid733 = 'pendiente';
            let cid734 = 'add';

    let colsid = [cid1,cid2,cid3,cid4,cid5,cid6,cid7];
    let colsid6 = [cid61, cid62, cid63, cid64];
    let colsid7 = [cid71, cid72, cid73];
    let colsid73 = [cid731, cid732, cid733, cid734];
    
    //*/
    //---------------Funciones UwU---------------
    /*   
    function producto( c1,c2,c3,c4,c5,c6,c7 ){
        this.numero = c1;
        this.fecha = c2;
        this.estado = c3;
        this.usuario = c4;
        this.proveedor = c5;
        
        let itemsA = [];
        for( j=0 ; j < c6 ; j++){
            itemsA[j] = new subpro('nom ' + j.toString() ,'can' + j.toString() ,'preUni' + j.toString(),'des' + j.toString() );
        }
        this.items = itemsA;

        let itemsA2 = [];
        for( j=0 ; j < c7 ; j++){
            itemsA2[j] = new subdes('nomDes ' + j.toString() ,'fecha ' + j.toString() , 3 );
        }
        this.despachos = itemsA2;
    }
    function subpro(c1,c2,c3,c4){
        this.nombre = c1;
        this.cantidad = c2;
        this.precioUnitario = c3;
        this.descuento = c4;
    }
    function subdes(c1,c2,c3){
        this.nombre = c1;
        this.fecha = c2;
        let itemsA3 = [];
        for( j1=0 ; j1 < c3 ; j1++){
            itemsA3[j1] = new subdespro('nomDesIte ' + j1.toString() ,'can' + j1.toString() ,'epn' + j1.toString(),'add' + j1.toString() );
        }
        this.items = itemsA3;
    }
    function subdespro(c1,c2,c3,c4){
        this.nombre = c1;
        this.cantidad = c2;
        this.pendiente = c3;
        this.add = c4;
    } 
    */
    function dataList(data){
        
        let str = '';
        let arrStr = [];
        let content = [];
        
        ///*
        data.forEach(function(row) {
            
            //Aqui va tu Header
            
            str = {columns: [{   text: c1+' : \n'+c2+' : \n'+c3+' : \n'+c4+' : \n'+c5+' : \n' , style: 'subheader' } ,{   text: row.numero+'\n'+row.fecha+'\n'+row.estado+'\n'+row.usuario+'\n'+row.proveedor , style: 'subheadertext'},{}]};          
            content.push(str);

            str = {text: [{   text: c6+' : ' , style: 'subheader' } ]};          
            content.push(str);
          
            str = table( row.items , colsid6 , [c61,c62,c63,c64], 4, '*' );
            content.push(str);

            str = {text: [{   text: c7+' : ' , style: 'subheader' } ]};          
            content.push(str);
            
            
            for( let i = 0 ; i < row.despachos.length ; i++ ){
                str = {text: [{   text: 'Despacho Nro ' + i + ' : '} ]};          
                content.push(str);
            
                str = {columns: [{   text: c71+' : \n' + c72 + ' : \n' } ,{   text: row.despachos[i].nombre+'\n'+row.despachos[i].fecha}]};          
                content.push(str);
                
                str = table( row.despachos[i].items , colsid73 , [c731,c732,c733,c734], 4, 100 );
                content.push( str );
            }
            
            
            //str = table( row.despachos , colsid7 , [c71,c72,c73], 3, 'auto' );
            //content.push(str);
            
            str = {text: [{   text: ' \n ' } ]};
            content.push(str);
        });
        
        return content;
        
    }
    function table(data, columnsId, columns, nroCols, widCols ) {
        
        let arrCols = [];
        
        if( nroCols == 3 ){
            
            arrCols.push(124);
            arrCols.push(124);
            arrCols.push('auto');
        }
        else{
            for( i3 = 0 ; i3< nroCols ; i3++ ){
            arrCols.push(widCols);
                
            }
        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody(data, columnsId ,columns, nroCols)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc
                    },
                }
        };
    }
    function buildTableBody(data, columnsId, columns,nroCols) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                
                if( nroCols === 3 && column === 'items' ){
                    /*
                    let str = '';
                    for( ia = 0 ; ia < row.items.length ; ia++){
                        str = '';
                        str = str + row.items[0].nombre + ' , '+row.items[0].pendiente+ ' , '+row.items[0].cantidad + ' , '+row.items[0].add + '\n';
                        dataRow.push( str );    
                    }
                    */
                    /*
                    let str = '';
                    str = str + row.items[0].nombre + ' , '+row.items[0].pendiente+ ' , '+row.items[0].cantidad + ' , '+row.items[0].add + '\n';
                    str = str + row.items[1].nombre + ' , '+row.items[1].pendiente+ ' , '+row.items[1].cantidad + ' , '+row.items[1].add + '\n';
                    
                    dataRow.push( str );
                    */
                    dataRow.push( table( row.items , colsid73 , [c731,c732,c733,c734], 4, 'auto' ) );
                }
                else{
                    dataRow.push(row[column].toString());    
                }
            })
    
            body.push(dataRow);
        });
    
        return body;
    }
    
    let arrPro = [];
    /*
    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto('num '+(i+1).toString(),'fec '+(i+1).toString(),'esta '+(i+1).toString(),'user '+(i+1).toString(),'prov '+(i+1).toString(),3,3);

    }
    */
    
    arrPro = factura$;
   
    let dd = {

        content: dataList(arrPro),
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            tableExample: {
                margin: [0, 5, 0, 15],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black',
            },
        },
        defaultStyle: {
            // alignment: 'justify'
        }

    }
    return dd
}

//------------------------------------------GASTOS----------------------------------------------********************

export const pdf_gastos = (gastos$) => {
    
    // Variables UwU
    let tit = 'Gasto';
    
    //nombre:
    //items: [],
    //    nombre: '',
    //    cantidad: 0,
    //    costo: 0
    //total: 0
    
    ///*
    let c1 = 'Nombre';
    let c2 = 'Items()';
        let c21 = 'Nombre';
        let c22 = 'Cantidad';
        let c23 = 'Costo';
    let c3 = 'Total';

    let cols = [c1,c2,c3];
    let cols2 = [c21,c22,c23];
    //*/
    ///*
    let cid1 = 'nombre';
    let cid2 = 'items';
        let cid21 = 'nombre';
        let cid22 = 'cantidad';
        let cid23 = 'costo';
    let cid3 = 'total';

    let colsId = [cid1,cid2,cid3];
    let colsId2 = [cid21,cid22,cid23];
    
    //---------------Funciones OwO--------------------------------
    /*
    function producto( c1,c2,c3 ){
        this.nombre = c1;
        let itemsA = [];
        for( j=0 ; j < c2 ; j++){
            itemsA[j] = new subpro('nom ' + j.toString() ,'can ' + j.toString() ,'cod ' + j.toString() );
        }
        this.items = itemsA;
        this.total = c3;
    }
    function subpro(c2,c3,c4){
        this.nombre = c2;
        this.cantidad = c3;
        this.costo = c4;
    }
    */
    function dataList(data){
        
        let str = '';
        let arrStr = [];
        let content = [];
        
        ///*
        data.forEach(function(row) {
            
            //Aqui va tu Header
            
            str = {text: [{   text: c1+' : ' , style: 'subheader' } ,{   text: row.nombre }]};
            content.push(str);
          
            str = table(row, row.items , colsId2 , [c21,c22,c23], 3 ) ;
            content.push(str);
            
            str = {text: [{   text: ' \n ' } ]};
          
            content.push(str);
        });
        
        return content;
        
    }
    function table(dataf, data, columnsId , columns, nroCols) {
        let arrCols = [];
        for( i3 = 0 ; i3< nroCols ; i3++ ){
            arrCols.push('*');
                
        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody(dataf, data, columnsId ,columns)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc;
                    },
                }
        };
    }
    function buildTableBody(dataf, data,columnsId, columns) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                dataRow.push(row[column].toString());
                
            })
    
            body.push(dataRow);
        });
        
        var dataRow = [];
        
        dataRow.push( {   text: c3+' : ' , colSpan: 2, } );
        dataRow.push( { } );
        dataRow.push( {   text: dataf.total } );
        
        body.push(dataRow);
        
        return body;
    }

    let arrPro = [];
    /*
    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto( 'Nombre '+(i+1).toString() , 4 , 'Total '+(i+1).toString() );

    }
    */
    arrPro = gastos$;
    //----------------------------Hacer Pdf-----------------------------------

    let dd = {

        content: dataList(arrPro),
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
        },
        subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
        },
        tableExample: {
            margin: [0, 5, 0, 15],
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black',
        },
        subheadertext: {
            fontSize: 16,
            margin: [0, 10, 0, 5],
        },
    },
    defaultStyle: {
        // alignment: 'justify'
    }

    }
    return dd
}

//----------------------------------------------------------------------------------------------------------
//------------------------------------------VENTA----------------------------------------------

export const pdf_venta = (venta$) => {
    
    // Variables UwU
    let tit = 'Usuario';

    //asesor //no?
    //asesorId //no?
    //cliente
    //descuento
    //dni
    //fecha
    //items()
        //cantidad
        //descuento
        //nombre
        //precio
        //producto
    //nombre
    //numero
    //observaciones
    //tipo
    
    ///*
    let c1 = 'Asesor';
    let c2 = 'Id Asesor';
    let c3 = 'Cliente';
    let c4 = 'Descuento';
    let c5 = 'Dni';
    let c6 = 'Fecha';
    let c7 = 'Items()';
        let c71 = 'Cantidad';
        let c72 = 'Descuento';
        let c73 = 'Nombre';
        let c74 = 'Precio';
        let c75 = 'Producto';
    let c8 = 'Nombre';
    let c9 = 'Numero';
    let c10 = 'Observaciones';
    let c11 = 'Tipo';

    let cols = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11];
    let cols7 = [c71,c72,c73,c74,c75];
    //*/
    ///*
    let cid1 = 'asesor';
    let cid2 = 'asesorId';
    let cid3 = 'cliente';
    let cid4 = 'descuento';
    let cid5 = 'dni';
    let cid6 = 'fecha';
    let cid7 = 'items';
        let cid71 = 'cantidad';
        let cid72 = 'descuento';
        let cid73 = 'nombre';
        let cid74 = 'precio';
        let cid75 = 'producto';
    let cid8 = 'nombre';
    let cid9 = 'numero';
    let cid10 = 'observaciones';
    let cid11 = 'tipo';

    let colsId = [cid1,cid2,cid3,cid4,cid5,cid6,cid7,cid8,cid9,cid10,cid11];
    let colsId7 = [cid71,cid72,cid73,cid74,cid75];
    //*/
    /*
    function producto( c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11 ){
        this.asesor = c1;
        this.asesorId = c2;
        this.cliente = c3;
        this.descuento = c4;
        this.dni = c5;
        this.fecha = c6;

        let itemsA = [];
        for( j=0 ; j < c7 ; j++){
            itemsA[j] = new subpro('cantidad ' + j.toString() ,'descuento ' + j.toString() ,'nombre ' + j.toString(),'precio ' + j.toString(),'producto ' + j.toString() );
        }
        this.items = itemsA;
        
        this.nombre = c8;
        this.numero = c9;
        this.observaciones = c10;
        this.tipo = c11;
    }
    function subpro(c71,c72,c73,c74,c75){
        this.cantidad = c71;
        this.descuento = c72;
        this.nombre = c73;
        this.precio = c74;
        this.producto = c75;
    }
    */
    function dataList(data){
        
        let str = '';
        let arrStr = [];
        let content = [];
        
        ///*
        data.forEach(function(row) {
            
            //Aqui va tu Header
            
            str = {columns: [{   text: c2+' : \n'+c4+' : \n'+c5+' : \n'+c6+' : \n'+ c8 +' : \n'+c9+' : \n'+c10+' : \n'+c11+' : \n' , style: 'subheader' } ,{   text: row.asesorId+'\n'+row.descuento+'\n'+row.dni+'\n'+row.fecha+'\n'+row.nombre+'\n'+row.numero+'\n'+row.observaciones+'\n'+row.tipo , style: 'subheadertext'},{}]};          
            content.push(str);

            str = {text: [{   text: c7+' : ' , style: 'subheader' } ]};          
            content.push(str);
          
            str = table( row.items , colsId7 , [c71,c72,c73,c74,c75], 5 ) ;         
            content.push(str);
            
            str = {text: [{   text: ' \n ' } ]};
          
            content.push(str);
        });
        
        return content;
        
    }
    function table( data, columnsId , columns, nroCols) {
        let arrCols = [];
        for( i3 = 0 ; i3< nroCols ; i3++ ){
            arrCols.push('*');
                
        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody( data, columnsId ,columns)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc;
                    },
                }
        };
    }
    function buildTableBody( data,columnsId, columns) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                dataRow.push(row[column].toString());
                
            })
    
            body.push(dataRow);
        });
        
        return body;
    }

    let arrPro = [];
    /*
    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto('asesor '+(i).toString(),' asesorID '+(i).toString(),'cliente '+(i).toString(),'descripcion'+(i).toString(),'dni '+(i).toString(),'fecha '+(i).toString(),3,'nombre '+(i).toString(),'numero '+(i).toString(),'observacion '+(i).toString(),'tipo '+(i).toString());

    }
    */   

    arrPro = venta$;

    let dd = {

        content: dataList(arrPro),
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
        },
        subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
        },
        tableExample: {
            margin: [0, 5, 0, 15],
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black',
        },
        subheadertext: {
            fontSize: 16,
            margin: [0, 10, 0, 5],
        },
    },
    defaultStyle: {
        // alignment: 'justify'
    }

    }
    return dd
}
//------------------------------------------CREDITO----------------------------------------------

export const pdf_credito = (credito$) => {
    
    // Variables UwU
    let tit = 'Credito';

    //asesor
    //cliente   
    //fecha
    //historial
        //cantidad
        //fecha
    //saldo
    //total
    //venta
    
    ///*
    let c1 = 'Asesor';
    let c2 = 'Cliente';
    let c3 = 'Fecha';
    let c4 = 'Historial';
        let c41 = 'Cantidad';
        let c42 = 'Fecha';
    let c5 = 'Saldo';
    let c6 = 'Total';
    let c7 = 'Venta';

    let cols = [c1,c2,c3,c4,c5,c6,c7];
    let cols4 = [c41,c42];
    //*/

    ///*
    let cid1 = 'asesor';
    let cid2 = 'cliente';
    let cid3 = 'fecha';
    let cid4 = 'historial';
        let cid41 = 'cantidad';
        let cid42 = 'fecha';
    let cid5 = 'saldo';
    let cid6 = 'total';
    let cid7 = 'venta';

    let colsId = [cid1,cid2,cid3,cid4,cid5,cid6,cid7];
    let colsId4 = [cid41,cid42];
    //*/   
    //
    /*
    function producto( c1,c2,c3,c4,c5,c6,c7 ){
        this.asesor = c1;
        this.cliente = c2;
        this.fecha = c3;

        let itemsA = [];
        for( j=0 ; j < c4 ; j++){
            itemsA[j] = new subpro('cantidad ' + j.toString() ,'fecha ' + j.toString() );
        }
        this.historial = itemsA;
        
        this.saldo = c5;
        this.total = c6;
        this.venta = c7;
    }
    function subpro(c1,c2){
        this.cantidad = c1;
        this.fecha = c2;
    }
    */
    function dataList(data){
        
        let str = '';
        let arrStr = [];
        let content = [];
        
        ///*
        data.forEach(function(row) {
            
            //Aqui va tu Header
            
            str = {columns: [{   text: c1+' : \n'+c2+' : \n'+c3+' : \n'+c5+' : \n'+ c6 +' : \n', style: 'subheader' } ,{   text: row.asesor+'\n'+row.cliente+'\n'+row.fecha+'\n'+row.saldo+'\n'+row.total+'\n' , style: 'subheadertext'},{}]};          
            content.push(str);

            str = {text: [{   text: c4+' : ' , style: 'subheader' } ]};          
            content.push(str);
          
            str = table( row.historial , colsId4 , [c41,c42], 2 ) ;         
            content.push(str);
            
            str = {text: [{   text: ' \n ' } ]};
          
            content.push(str);
        });
        
        return content;
        
    }
    function table( data, columnsId , columns, nroCols) {
        let arrCols = [];
        for( i3 = 0 ; i3< nroCols ; i3++ ){
            arrCols.push('*');
                
        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody( data, columnsId ,columns)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc;
                    },
                }
        };
    }
    function buildTableBody( data,columnsId, columns) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                dataRow.push(row[column].toString());
                
            })
    
            body.push(dataRow);
        });
        
        return body;
    }

    let arrPro = [];
    /*
    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto('asesor '+(i).toString(),'cliente '+(i).toString(),'fecha '+(i).toString(),3,'saldo '+(i).toString(),'total '+(i).toString(),3,'venta '+(i).toString());

    } 
    */
   
    arrPro = credito$;
    
    let dd = {

        content: dataList(arrPro),
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
        },
        subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
        },
        tableExample: {
            margin: [0, 5, 0, 15],
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black',
        },
        subheadertext: {
            fontSize: 16,
            margin: [0, 10, 0, 5],
        },
    },
    defaultStyle: {
        // alignment: 'justify'
    }

    }
    return dd
}

/* 
//------------------------------------------PRODUCTO----------------------------------------------*****************************
export const pdf_producto = (producto$) => {
    
    function producto( cod,codb,nom,des,cat ){
        this.codigo = cod;
        this.codigoBarras = codb;
        this.nombre = nom;
        this.descripcion = des;
        this.categorias = cat;
    }
    function buildTableBody(data,columnsId, columns) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                dataRow.push(row[column].toString());
            })
    
            body.push(dataRow);
        });
    
        return body;
    }    
    function table(data, columnsId , columns) {
        return {
            table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*' ,'*',],
                body: buildTableBody(data, columnsId ,columns)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc
                    },
                }
        };
    }

    let arrPro = [];

    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto('codigo'+(i+1).toString(),'codigo barras'+(i+1).toString(),'nombre'+(i+1).toString(),'descripcion'+(i+1).toString(),['Categoria 1','Categoria 2',' Categoria 3']);

    }
    
    arrPro = producto$;

    // Variables UwU
    let tit = 'Producto';
    //codigo
    //codigo de barras
    //nombres
    //descripcion
    //categorias[]

    //descuentoFerreteria
    //descuentoObras
    //descuentoOficina

    //precioFerreteria
    //precioObras
    //precioOficinas
    
    ///*
    let c1 = 'Codigo';
    let c2 = 'Codigo de Barras';
    let c3 = 'Nombre';
    let c4 = 'Descripcion';
    let c5 = 'Categorias';
    let c6 = 'Descuento de Ferreteria';
    let c7 = 'Descuento de Obras';
    let c8 = 'Descuento de Oficinas';
    let c9 = 'Precio de Ferreteria';
    let c10 = 'Precio de Obras';
    let c11 = 'Precio de Oficinas';

    let cols = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11];
    //
    //
    let cid1 = 'codigo';
    let cid2 = 'codigoBarras';
    let cid3 = 'nombre';
    let cid4 = 'descripcion';
    let cid5 = 'categorias';
    let cid6 = 'descuentoFerreteria';
    let cid7 = 'descuentoObras';
    let cid8 = 'descuentoOficinas';
    let cid9 = 'precioFerreteria';
    let cid10 = 'precioObras';
    let cid11 = 'precioOficinas';

    let colsId = [cid1,cid2,cid3,cid4,cid5];
    

    let dd = {

        content: [
            {text: tit+'s', style: 'header'},
            'First paragraph ',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
            {text: 'Lista de '+tit+'s', style: 'subheader'},
            
            table( arrPro , colsId , cols ),
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            tableExample: {
                margin: [0, 5, 0, 15],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black',
            },
        },
        defaultStyle: {
            // alignment: 'justify'
        }

    }
    return dd
}
//------------------------------------------CLIENTE----------------------------------------------********************************

export const pdf_cliente = (cliente$) => {
    //direccion
    //id
    //nit
    //nombre
    //telefono
    //zona
    //asesor
    function producto( c1,c2,c3,c4,c5,c6,c7 ){
        this.direccion = c1;
        this.id = c2;
        this.nit = c3;
        this.nombre = c4;
        this.telefono = c5;
        this.zona = c6;
        this.asesor = c7;
    }
    function buildTableBody(data,columnsId, columns) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                dataRow.push(row[column].toString());
            })
    
            body.push(dataRow);
        });
    
        return body;
    }    
    function table(data, columnsId , columns) {
        return {
            table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*' ,'*',],
                body: buildTableBody(data, columnsId ,columns)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc
                    },
                }
        };
    }

    let arrPro = [];

    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto('atrib1 '+(i+1).toString(),'atrib2 '+(i+1).toString(),'atrib3 '+(i+1).toString(),'atrib4 '+(i+1).toString(),'atrib5 '+(i+1).toString(),'atrib6 '+(i+1).toString(),'atrib7 '+(i+1).toString(),);

    }
    
    arrPro = cliente$;

    // Variables UwU
    let tit = 'Cliente';

    //direccion
    //id
    //nit
    //nombre
    //telefono
    //zona
    //asesor
    
    ///*
    let c1 = 'Direccion';
    let c2 = 'Id';
    let c3 = 'Nit';
    let c4 = 'Nombre';
    let c5 = 'Telefono';
    let c6 = 'Zona';
    let c7 = 'Asesor';

    let cols = [c1,c2,c3,c4,c5,c6,c7];
    
    let cid1 = 'direccion';
    let cid2 = 'id';
    let cid3 = 'nit';
    let cid4 = 'nombre';
    let cid5 = 'telefono';
    let cid6 = 'zona';
    let cid7 = 'asesor';

    let colsId = [cid1,cid2,cid3,cid4,cid5,cid6,cid7];
      

    let dd = {

        content: [
            {text: tit+'s', style: 'header'},
            'First paragraph ',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
            {text: 'Lista de '+tit+'s', style: 'subheader'},
            
            table( arrPro , colsId , cols ),
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            tableExample: {
                margin: [0, 5, 0, 15],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black',
            },
        },
        defaultStyle: {
            // alignment: 'justify'
        }

    }
    return dd
}

//------------------------------------------USUARIOS----------------------------------------------*********************************

export const pdf_usuario = (usuario$) => {
    
    function producto( c1,c2,c3,c4,c5,c6,c7 ){
        this.nombre = c1;
        this.ci = c2;
        this.telefono = c3;
        this.correo = c4;
        this.pass = c5;
        this.repass = c6;
        this.almacen = c7;
    }
    function buildTableBody(data,columnsId, columns) {
        var body = [];
    
        body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            columnsId.forEach(function(column) {
                dataRow.push(row[column].toString());
            })
    
            body.push(dataRow);
        });
    
        return body;
    }    
    function table(data, columnsId , columns) {
        return {
            table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*' ,'*',],
                body: buildTableBody(data, columnsId ,columns)
            },
                layout: {
                    
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        fc = (rowIndex === 0) ? '#CCEEFE' : null;
                        fc = (rowIndex % 2 === 0 && rowIndex !== 0) ? '#EEEEEE' : fc;
                        return fc
                    },
                }
        };
    }

    let arrPro = [];

    for( i = 0 ; i < 5 ; i++ ){

        arrPro[i] = new producto('atrib1 '+(i+1).toString(),'atrib2 '+(i+1).toString(),'atrib3 '+(i+1).toString(),'atrib4 '+(i+1).toString(),'atrib5 '+(i+1).toString(),'atrib6 '+(i+1).toString(),'atrib7 '+(i+1).toString(),);

    }
    
    arrPro = usuario$;

    // Variables UwU
    let tit = 'Usuario';

    //nombre = ''
    //ci = ''
    //telefono = ''
    //correo = ''
    //pass = ''
    //repass = ''
    //almacen = ''
    
    ///*
    let c1 = 'Nombre';
    let c2 = 'Ci';
    let c3 = 'Telefono';
    let c4 = 'Correo';
    let c5 = 'Password';
    let c6 = 'Repassword';
    let c7 = 'Almacen';

    let cols = [c1,c2,c3,c4,c5,c6,c7];
   
    let cid1 = 'nombre';
    let cid2 = 'ci';
    let cid3 = 'telefono';
    let cid4 = 'correo';
    let cid5 = 'pass';
    let cid6 = 'repass';
    let cid7 = 'almacen';

    let colsId = [cid1,cid2,cid3,cid4,cid5,cid6,cid7];
      

    let dd = {

        content: [
            {text: tit+'s', style: 'header'},
            'First paragraph ',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
            {text: 'Lista de '+tit+'s', style: 'subheader'},
            
            table( arrPro , colsId , cols ),
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            tableExample: {
                margin: [0, 5, 0, 15],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black',
            },
        },
        defaultStyle: {
            // alignment: 'justify'
        }

    }
    return dd
}
*/