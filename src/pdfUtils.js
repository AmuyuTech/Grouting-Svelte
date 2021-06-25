import pdfMake from "pdfmake/build/pdfmake";
pdfMake.fonts = {
    // download default Roboto font from cdnjs.com
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
}

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

    let cols = [c1, c2, c3, c4, c5, c6, c7];
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

    let colsid = [cid1, cid2, cid3, cid4, cid5, cid6, cid7];
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
    function dataList(data) {

        let str = '';
        let arrStr = [];
        let content = [];

        ///*
        data.forEach(function (row) {

            //Aqui va tu Header

            str = { columns: [{ text: c1 + ' : \n' + c2 + ' : \n' + c3 + ' : \n' + c4 + ' : \n' + c5 + ' : \n', style: 'subheader' }, { text: row.numero + '\n' + row.fecha + '\n' + row.estado + '\n' + row.usuario + '\n' + row.proveedor, style: 'subheadertext' }, {}] };
            content.push(str);

            str = { text: [{ text: c6 + ' : ', style: 'subheader' }] };
            content.push(str);

            str = table(row.items, colsid6, [c61, c62, c63, c64], 4, '*');
            content.push(str);

            str = { text: [{ text: c7 + ' : ', style: 'subheader' }] };
            content.push(str);


            for (let i = 0; i < row.despachos.length; i++) {
                str = { text: [{ text: 'Despacho Nro ' + i + ' : ' }] };
                content.push(str);

                str = { columns: [{ text: c71 + ' : \n' + c72 + ' : \n' }, { text: row.despachos[i].nombre + '\n' + row.despachos[i].fecha }] };
                content.push(str);

                str = table(row.despachos[i].items, colsid73, [c731, c732, c733, c734], 4, 100);
                content.push(str);
            }


            //str = table( row.despachos , colsid7 , [c71,c72,c73], 3, 'auto' );
            //content.push(str);

            str = { text: [{ text: ' \n ' }] };
            content.push(str);
        });

        return content;

    }
    function table(data, columnsId, columns, nroCols, widCols) {

        let arrCols = [];

        if (nroCols == 3) {

            arrCols.push(124);
            arrCols.push(124);
            arrCols.push('auto');
        }
        else {
            for (i3 = 0; i3 < nroCols; i3++) {
                arrCols.push(widCols);

            }
        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody(data, columnsId, columns, nroCols)
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
    function buildTableBody(data, columnsId, columns, nroCols) {
        var body = [];

        body.push(columns);

        data.forEach(function (row) {
            var dataRow = [];

            columnsId.forEach(function (column) {

                if (nroCols === 3 && column === 'items') {
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
                    dataRow.push(table(row.items, colsid73, [c731, c732, c733, c734], 4, 'auto'));
                }
                else {
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
    pdfMake.createPdf(dd).open();
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

    let cols = [c1, c2, c3];
    let cols2 = [c21, c22, c23];
    //*/
    ///*
    let cid1 = 'nombre';
    let cid2 = 'items';
    let cid21 = 'nombre';
    let cid22 = 'cantidad';
    let cid23 = 'costo';
    let cid3 = 'total';

    let colsId = [cid1, cid2, cid3];
    let colsId2 = [cid21, cid22, cid23];

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
    function dataList(data) {

        let str = '';
        let arrStr = [];
        let content = [];

        ///*
        data.forEach(function (row) {

            //Aqui va tu Header

            str = { text: [{ text: c1 + ' : ', style: 'subheader' }, { text: row.nombre }] };
            content.push(str);

            str = table(row, row.items, colsId2, [c21, c22, c23], 3);
            content.push(str);

            str = { text: [{ text: ' \n ' }] };

            content.push(str);
        });

        return content;

    }
    function table(dataf, data, columnsId, columns, nroCols) {
        let arrCols = [];
        for (i3 = 0; i3 < nroCols; i3++) {
            arrCols.push('*');

        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody(dataf, data, columnsId, columns)
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
    function buildTableBody(dataf, data, columnsId, columns) {
        var body = [];

        body.push(columns);

        data.forEach(function (row) {
            var dataRow = [];

            columnsId.forEach(function (column) {
                dataRow.push(row[column].toString());

            })

            body.push(dataRow);
        });

        var dataRow = [];

        dataRow.push({ text: c3 + ' : ', colSpan: 2, });
        dataRow.push({});
        dataRow.push({ text: dataf.total });

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
    pdfMake.createPdf(dd).open();
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

    let cols = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11];
    let cols7 = [c71, c72, c73, c74, c75];
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

    let colsId = [cid1, cid2, cid3, cid4, cid5, cid6, cid7, cid8, cid9, cid10, cid11];
    let colsId7 = [cid71, cid72, cid73, cid74, cid75];
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
    function dataList(data) {

        let str = '';
        let arrStr = [];
        let content = [];

        ///*
        data.forEach(function (row) {

            //Aqui va tu Header

            str = { columns: [{ text: c2 + ' : \n' + c4 + ' : \n' + c5 + ' : \n' + c6 + ' : \n' + c8 + ' : \n' + c9 + ' : \n' + c10 + ' : \n' + c11 + ' : \n', style: 'subheader' }, { text: row.asesorId + '\n' + row.descuento + '\n' + row.dni + '\n' + row.fecha + '\n' + row.nombre + '\n' + row.numero + '\n' + row.observaciones + '\n' + row.tipo, style: 'subheadertext' }, {}] };
            content.push(str);

            str = { text: [{ text: c7 + ' : ', style: 'subheader' }] };
            content.push(str);

            str = table(row.items, colsId7, [c71, c72, c73, c74, c75], 5);
            content.push(str);

            str = { text: [{ text: ' \n ' }] };

            content.push(str);
        });

        return content;

    }
    function table(data, columnsId, columns, nroCols) {
        let arrCols = [];
        for (i3 = 0; i3 < nroCols; i3++) {
            arrCols.push('*');

        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody(data, columnsId, columns)
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
    function buildTableBody(data, columnsId, columns) {
        var body = [];

        body.push(columns);

        data.forEach(function (row) {
            var dataRow = [];

            columnsId.forEach(function (column) {
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
    pdfMake.createPdf(dd).open();
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

    let cols = [c1, c2, c3, c4, c5, c6, c7];
    let cols4 = [c41, c42];
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

    let colsId = [cid1, cid2, cid3, cid4, cid5, cid6, cid7];
    let colsId4 = [cid41, cid42];
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
    function dataList(data) {

        let str = '';
        let arrStr = [];
        let content = [];

        ///*
        data.forEach(function (row) {

            //Aqui va tu Header

            str = { columns: [{ text: c1 + ' : \n' + c2 + ' : \n' + c3 + ' : \n' + c5 + ' : \n' + c6 + ' : \n', style: 'subheader' }, { text: row.asesor + '\n' + row.cliente + '\n' + row.fecha + '\n' + row.saldo + '\n' + row.total + '\n', style: 'subheadertext' }, {}] };
            content.push(str);

            str = { text: [{ text: c4 + ' : ', style: 'subheader' }] };
            content.push(str);

            str = table(row.historial, colsId4, [c41, c42], 2);
            content.push(str);

            str = { text: [{ text: ' \n ' }] };

            content.push(str);
        });

        return content;

    }
    function table(data, columnsId, columns, nroCols) {
        let arrCols = [];
        for (i3 = 0; i3 < nroCols; i3++) {
            arrCols.push('*');

        }
        return {
            table: {
                headerRows: 1,
                widths: arrCols,
                body: buildTableBody(data, columnsId, columns)
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
    function buildTableBody(data, columnsId, columns) {
        var body = [];

        body.push(columns);

        data.forEach(function (row) {
            var dataRow = [];

            columnsId.forEach(function (column) {
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
    pdfMake.createPdf(dd).open();
}

export function getCatalogo(data$) {
    let data = []
    data$.forEach(async d => {
        const img = await getData(d.photourl).then(v => v)

        data.push(
            [
                `Nombre: ${d.nombre}`,
                {
                    image: img + "",
                    width: 130
                    , rowSpan: 5
                },

            ],
            [
                `Precio Oficina: Bs. ${d.precioOficina.toFixed(2)} - Bs. ${d.descuentoOficina.toFixed(2)}`,
                '',
            ],
            [
                `Precio Obras: Bs. ${d.precioObras.toFixed(2)} - Bs. ${d.descuentoObras.toFixed(2)}`,
                '',
            ],
            [
                `Precio Ferreteria: Bs. ${d.precioFerreteria.toFixed(2)} - Bs. ${d.descuentoFerreteria.toFixed(2)}`,
                '',
            ],
            [
                `Descripcion: ${d.descripcion}`,
                '',
            ]
        )
    })

    var dd = {
        content: [
            header('Catalogo'),
            {
                style: 'tableExample',
                table: {
                    headerRows: 0,
                    widths: ['*', 130],
                    // dontBreakRows: true,
                    // keepWithHeaderRows: 1,
                    body: data,
                }, layout: 'noBorders'
            }
        ],
        styles: stylesd
    };
    pdfMake.createPdf(dd).open();

}
export function getStocks(data$) {
    let data = []
    data$.forEach(d => {
        data.push([
            d.nombre,
            d.elalto + '',
            d.sopocachi + '',
            d.zonasur + '',
            (d.elalto + d.sopocachi + d.zonasur) + "",
        ])
    })
    var dd = {
        content: [
            header('Reporte de Stocks', { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h24" }),
            {
                style: 'tableExample',
                table: {
                    headerRows: 2,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto'],
                    // dontBreakRows: true,
                    // keepWithHeaderRows: 1,
                    body: [
                        // header
                        [
                            { text: 'Nombre', style: 'tableHeader', rowSpan: 2, alignment: 'center', width: '*' },
                            { text: 'Stock en Almacen', style: 'tableHeader', colSpan: 4, alignment: 'center' },
                            '',
                            '',
                            '',
                        ],
                        [
                            '',
                            { text: 'El Alto', style: 'tableHeader', alignment: 'center' },
                            { text: 'Sopocachi', style: 'tableHeader', alignment: 'center' },
                            { text: 'Zona Sur', style: 'tableHeader', alignment: 'center' },
                            { text: 'Total', style: 'tableHeader', alignment: 'center' },
                        ],
                        // coontenido de la tabla
                        ...data,
                    ]
                }, layout: 'lightHorizontalLines',
            }
        ],
        styles: stylesd
    };
    pdfMake.createPdf(dd).open();
}
const stylesd = {
    header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
    },
    subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
    },
    tableExample: {
        margin: [0, 0, 0, 0]
    },
    tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
    }
}
function header(nombre$, format = {}) {
    return ({
        stack: [
            {
                svg: `<svg id="a85aa749-f8d5-459c-8c3e-a031deadf05e" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" width="196.51mm" height="33.02mm" viewBox="0 0 557.03 93.6">
<g>
  <polygon points="557.03 0 312.15 0 286.5 56.51 531.38 56.51 557.03 0" style="fill: red"/>
  <g>
    <path d="M38.56,32.84H31.2c-.5,0-.81-.18-.93-.55a1.92,1.92,0,0,1,.22-1.38l.94-1.68a3.37,3.37,0,0,1,1.21-1.39,2.81,2.81,0,0,1,1.6-.55H47a.9.9,0,0,1,1,.55,1.73,1.73,0,0,1-.25,1.38L41.48,40.68a32.78,32.78,0,0,1-2.78,4.39,13.8,13.8,0,0,1-2.89,2.8,10.3,10.3,0,0,1-3.36,1.51,17.56,17.56,0,0,1-4.18.45H10.64a12.19,12.19,0,0,1-3.7-.45,2.62,2.62,0,0,1-1.77-1.52,4.48,4.48,0,0,1,.1-2.81,24.49,24.49,0,0,1,2-4.39l9.65-17.83a32.15,32.15,0,0,1,2.78-4.36,13.2,13.2,0,0,1,2.92-2.84A10.36,10.36,0,0,1,26,14.11a17.53,17.53,0,0,1,4.17-.45h24.2a.88.88,0,0,1,.92.55,1.52,1.52,0,0,1-.19,1.32l-.05.13-.94,1.68a5,5,0,0,1-1.3,1.33,2.67,2.67,0,0,1-1.49.55H27.42a1.88,1.88,0,0,0-1.29.38A6.67,6.67,0,0,0,25,21.28L13.69,42.21a3.57,3.57,0,0,0-.63,1.68c0,.26.33.39.86.39H31a2.11,2.11,0,0,0,1.34-.39,6,6,0,0,0,1.19-1.67Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M44.21,49.83a.93.93,0,0,1-1-.55,1.59,1.59,0,0,1,.27-1.39L60.89,15.6a4,4,0,0,1,1.23-1.39,2.69,2.69,0,0,1,1.54-.55H86.21a11.8,11.8,0,0,1,3.7.46,2.62,2.62,0,0,1,1.77,1.52,4.62,4.62,0,0,1-.12,2.87,24.08,24.08,0,0,1-2,4.39l-.37.64A32.14,32.14,0,0,1,86.44,28a13.38,13.38,0,0,1-2.92,2.83,10.42,10.42,0,0,1-3.42,1.52,17.06,17.06,0,0,1-4.15.46h-.19l0,14.09A1.64,1.64,0,0,1,75.46,48a3.31,3.31,0,0,1-1.16,1.32,2.76,2.76,0,0,1-1.63.55H69.49a1.12,1.12,0,0,1-.72-.29.72.72,0,0,1-.29-.67l0,.06V32.78H58.93L50.82,47.9a4.2,4.2,0,0,1-1.27,1.38,2.69,2.69,0,0,1-1.54.55ZM66.29,19.22l-4.31,8H78.67A1.91,1.91,0,0,0,80,26.83a6.83,6.83,0,0,0,1.16-1.71l2.08-3.8a4.3,4.3,0,0,0,.67-1.71c0-.26-.33-.39-.89-.39Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M119.14,40.66a31.51,31.51,0,0,1-2.79,4.39,13.27,13.27,0,0,1-2.92,2.81A10.28,10.28,0,0,1,110,49.38a17.59,17.59,0,0,1-4.15.45H89.27a12,12,0,0,1-3.68-.45,2.61,2.61,0,0,1-1.74-1.52,4.41,4.41,0,0,1,.1-2.81,24.33,24.33,0,0,1,1.94-4.39L95.43,23a31.89,31.89,0,0,1,2.77-4.36,13.44,13.44,0,0,1,2.91-2.85,10,10,0,0,1,3.36-1.51,17.53,17.53,0,0,1,4.18-.46h16.59a11.91,11.91,0,0,1,3.66.46,2.61,2.61,0,0,1,1.77,1.51,4.48,4.48,0,0,1-.11,2.85A24.51,24.51,0,0,1,128.62,23ZM106,19.41a2,2,0,0,0-1.32.39,6.17,6.17,0,0,0-1.17,1.68L92.32,42.21a3.57,3.57,0,0,0-.63,1.68c0,.26.33.39.86.39h16a1.9,1.9,0,0,0,1.26-.39A6.09,6.09,0,0,0,111,42.21l11.12-20.73a4.44,4.44,0,0,0,.68-1.68c0-.26-.3-.39-.86-.39Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M154.12,47.89a3.82,3.82,0,0,1-1.26,1.39,2.74,2.74,0,0,1-1.55.55H128.38a14.22,14.22,0,0,1-3.73-.39A2.55,2.55,0,0,1,122.84,48a4.24,4.24,0,0,1,.08-2.74,23.81,23.81,0,0,1,1.94-4.36L138.49,15.6a3.87,3.87,0,0,1,1.25-1.39,2.77,2.77,0,0,1,1.56-.55h3.75a.88.88,0,0,1,.95.55,1.74,1.74,0,0,1-.24,1.39L131.42,42.21a3.57,3.57,0,0,0-.63,1.68c.05.26.33.39.87.39h17.21L164.23,15.6a3.9,3.9,0,0,1,1.26-1.39,2.71,2.71,0,0,1,1.55-.55h3.76a.89.89,0,0,1,.95.55,1.75,1.75,0,0,1-.25,1.39Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M177.37,15.58a3.77,3.77,0,0,1,1.22-1.38,2.69,2.69,0,0,1,1.54-.54H210.6a1,1,0,0,1,1,.54,1.62,1.62,0,0,1-.22,1.38l-1,1.72a3.94,3.94,0,0,1-1.23,1.37,2.71,2.71,0,0,1-1.53.55H195.88L180.43,47.88a3.93,3.93,0,0,1-1.26,1.4,2.77,2.77,0,0,1-1.56.55h-3.75a.88.88,0,0,1-1-.55,1.77,1.77,0,0,1,.25-1.4l15.45-28.66H177.17a.94.94,0,0,1-1-.55,1.6,1.6,0,0,1,.22-1.37Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M197.88,49.83a.88.88,0,0,1-.95-.55,1.75,1.75,0,0,1,.25-1.39l17.37-32.28a3.88,3.88,0,0,1,1.24-1.4,2.63,2.63,0,0,1,1.53-.55h3.8a.93.93,0,0,1,1,.55,1.67,1.67,0,0,1-.22,1.4L204.49,47.89a3.87,3.87,0,0,1-1.25,1.39,2.77,2.77,0,0,1-1.56.55Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M226.4,15.6a4,4,0,0,1,1.25-1.39,2.77,2.77,0,0,1,1.56-.55h23a13.91,13.91,0,0,1,3.7.39,2.53,2.53,0,0,1,1.79,1.42,4.24,4.24,0,0,1-.08,2.74,23.51,23.51,0,0,1-1.94,4.36L242,47.89a3.82,3.82,0,0,1-1.26,1.39,2.71,2.71,0,0,1-1.55.55h-3.71a.88.88,0,0,1-.95-.55,1.75,1.75,0,0,1,.25-1.39l14.33-26.61a3.76,3.76,0,0,0,.64-1.68c-.05-.26-.34-.38-.87-.38H231.79L216.34,47.89a3.82,3.82,0,0,1-1.26,1.39,2.77,2.77,0,0,1-1.56.55h-3.8a.89.89,0,0,1-.95-.55,1.75,1.75,0,0,1,.25-1.39Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
    <path d="M283.07,32.84h-7.36c-.5,0-.81-.18-.92-.55a1.87,1.87,0,0,1,.22-1.38l.93-1.68a3.44,3.44,0,0,1,1.21-1.39,2.81,2.81,0,0,1,1.61-.55h12.75a.88.88,0,0,1,.95.55,1.76,1.76,0,0,1-.24,1.38L286,40.68a31.78,31.78,0,0,1-2.79,4.39,13.56,13.56,0,0,1-2.89,2.8A10.21,10.21,0,0,1,277,49.38a17.53,17.53,0,0,1-4.17.45H255.16a12.27,12.27,0,0,1-3.71-.45,2.66,2.66,0,0,1-1.77-1.52,4.43,4.43,0,0,1,.11-2.81,24.33,24.33,0,0,1,1.94-4.39l9.65-17.83a33.15,33.15,0,0,1,2.78-4.36,13,13,0,0,1,2.93-2.84,10.36,10.36,0,0,1,3.39-1.52,17.47,17.47,0,0,1,4.17-.45h24.19a.9.9,0,0,1,.93.55,1.53,1.53,0,0,1-.2,1.32l-.05.13-.93,1.68a5.13,5.13,0,0,1-1.3,1.33,2.69,2.69,0,0,1-1.49.55H271.93a1.91,1.91,0,0,0-1.29.38,7,7,0,0,0-1.15,1.68L258.2,42.21a3.57,3.57,0,0,0-.63,1.68q.07.39.87.39h17.07a2.08,2.08,0,0,0,1.33-.39A5.59,5.59,0,0,0,278,42.22Z" transform="translate(-4.99 -2.7)" style="fill: red"/>
  </g>
  <g>
    <path d="M357,26.91a11.74,11.74,0,0,1-2.39,2.69c.45,1.42,0,3.56-1.29,6.4l-1.89,4.21a26.55,26.55,0,0,1-2.42,4.4,12.08,12.08,0,0,1-2.69,2.81A9.38,9.38,0,0,1,343,48.94a17.2,17.2,0,0,1-4.22.46H313.11a1.09,1.09,0,0,1-1.05-.55,1.54,1.54,0,0,1,.14-1.39l14.44-32.29a3.38,3.38,0,0,1,1.12-1.39,2.49,2.49,0,0,1,1.51-.55h25.64a13.19,13.19,0,0,1,3.83.45,3.08,3.08,0,0,1,2,1.52,4.53,4.53,0,0,1,.17,2.85,21.31,21.31,0,0,1-1.53,4.36l-.35.78A26.59,26.59,0,0,1,357,26.91ZM347.09,33c0-.28-.16-.44-.5-.49H326.36L321.3,43.84H341a1.89,1.89,0,0,0,1.3-.39,5.31,5.31,0,0,0,1-1.66l3.24-7.26A5.83,5.83,0,0,0,347.09,33Zm2.75-6.43a6.25,6.25,0,0,0,1-1.71l1.77-3.94a3.79,3.79,0,0,0,.51-1.71c-.06-.26-.38-.39-.95-.39H332.51l-3.61,8.14h19.66A1.83,1.83,0,0,0,349.84,26.53Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
    <path d="M391.31,40.22a27.36,27.36,0,0,1-2.4,4.4,11.5,11.5,0,0,1-2.69,2.81,9.55,9.55,0,0,1-3.32,1.51,17.23,17.23,0,0,1-4.19.46H361.77a12.51,12.51,0,0,1-3.8-.46A3.05,3.05,0,0,1,356,47.43a4.41,4.41,0,0,1-.18-2.81,21.07,21.07,0,0,1,1.54-4.4l7.93-17.63a28.36,28.36,0,0,1,2.39-4.36,11.61,11.61,0,0,1,2.67-2.84,9.3,9.3,0,0,1,3.28-1.52,17.64,17.64,0,0,1,4.21-.45h16.94a13,13,0,0,1,3.78.45,3.08,3.08,0,0,1,2,1.52,4.43,4.43,0,0,1,.17,2.84,21.11,21.11,0,0,1-1.53,4.36ZM375.71,19a1.92,1.92,0,0,0-1.3.38,5.48,5.48,0,0,0-1,1.68L364.1,41.77a3.27,3.27,0,0,0-.47,1.68c.07.26.38.39.92.39h16.36a1.85,1.85,0,0,0,1.26-.39,5.23,5.23,0,0,0,1-1.68L392.43,21a3.92,3.92,0,0,0,.52-1.68c0-.26-.35-.38-.92-.38Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
    <path d="M403.68,42.71a.75.75,0,0,0,0,.52c.05.11.18.17.4.19s.53,0,.95,0h21.29a1.09,1.09,0,0,1,1.05.55,1.51,1.51,0,0,1-.14,1.39l-.88,2.07a3.41,3.41,0,0,1-1.14,1.39,2.71,2.71,0,0,1-1.54.55H399.28c-1.5,0-2.66,0-3.48-.07a2.19,2.19,0,0,1-1.6-.52,1.34,1.34,0,0,1-.07-1.36c.21-.6.58-1.49,1.12-2.66L408.5,15.17a3.35,3.35,0,0,1,1.14-1.39,2.59,2.59,0,0,1,1.54-.55h3.87a1,1,0,0,1,1.05.55,1.76,1.76,0,0,1-.13,1.39L404.07,41.7C403.89,42.13,403.76,42.47,403.68,42.71Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
    <path d="M433.2,49.4a1,1,0,0,1-1-.56,1.62,1.62,0,0,1,.11-1.39l14.44-32.28a3.44,3.44,0,0,1,1.11-1.39,2.52,2.52,0,0,1,1.52-.55h3.87a1.07,1.07,0,0,1,1,.55,1.58,1.58,0,0,1-.09,1.39L439.75,47.45a3.35,3.35,0,0,1-1.14,1.39,2.6,2.6,0,0,1-1.53.56Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
    <path d="M463.32,13.23a.46.46,0,0,1,.39.22,1.08,1.08,0,0,1,.18.49L463.38,42,485.9,13.94a2.27,2.27,0,0,1,.56-.49,1.14,1.14,0,0,1,.59-.22h4.14a.57.57,0,0,1,.63.58,1.85,1.85,0,0,1-.51,1.3L464.8,48.68a2.32,2.32,0,0,1-.57.49,1.14,1.14,0,0,1-.58.23h-6.39a.47.47,0,0,1-.4-.23,1.08,1.08,0,0,1-.18-.49l.87-33.57a2.18,2.18,0,0,1,.54-1.3,1.37,1.37,0,0,1,1.06-.58Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
    <path d="M479.51,49.4a1,1,0,0,1-1-.56,1.66,1.66,0,0,1,.11-1.39L493,15.17a3.38,3.38,0,0,1,1.12-1.39,2.49,2.49,0,0,1,1.51-.55h3.87a1.07,1.07,0,0,1,1,.55,1.6,1.6,0,0,1-.08,1.39L486.06,47.45a3.2,3.2,0,0,1-1.14,1.39,2.6,2.6,0,0,1-1.53.56Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
    <path d="M520.4,48.84a1.7,1.7,0,0,1,.11-1.39L527,32.93H506l-6.52,14.52a3.35,3.35,0,0,1-1.14,1.39,2.63,2.63,0,0,1-1.54.56H493a1,1,0,0,1-1-.55,1.7,1.7,0,0,1,.11-1.39l12.22-27.38A17.19,17.19,0,0,1,506.51,17a11.12,11.12,0,0,1,2.53-2,10.23,10.23,0,0,1,3-1.13,17.06,17.06,0,0,1,3.68-.36h19c2.65,0,4.41.5,5.3,1.49s.91,2.74.08,5.24l-12.2,27.31a3.41,3.41,0,0,1-1.14,1.39,2.71,2.71,0,0,1-1.54.55h-3.82A1,1,0,0,1,520.4,48.84ZM513.55,19a2.08,2.08,0,0,0-1.18.28,3.52,3.52,0,0,0-.87,1.13l-2.8,6.33h21.05l2.85-6.33c.27-.55.37-.93.28-1.13S532.5,19,532,19Z" transform="translate(-4.99 -2.7)" style="fill: #ff0"/>
  </g>
  <text transform="translate(442.82 83.59)" style="font-size: 26.580183029174805px;fill: red;font-family: Arial-BoldMT, Arial;font-weight: 700;letter-spacing: 0.10599561370241878em">S.R.L.</text>
</g>
</svg>`
            },
            { text: nombre$, fontSize: 14 },
            { text: 'Generado el: ' + (new Date()).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', ...format }), fontSize: 10 },
        ],
        style: 'header',
        alignment: 'center'
    })
}
async function getData(url$) {
    let blob = await fetch(url$, { mode: 'cors' }).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    }).then(data => data);
    return dataUrl
}