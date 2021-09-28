# Intruduiccion
Aca se detalla la estructura de la informacion en la base de datos y las funciones que detonan
# Producto
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre                 |String     |name
|Codigo                 |String     |code
|Descripcion            |String     |desc
|Codigo de Barras       |String     |barcode
|Precio con Factura     |Number     |pcf
|Descuento con Factura  |Number     |dcf
|Precio sin Factura     |Number     |psf
|Descuento sin Factura  |Number     |dsf
|Photo URL              |String     |url        |URL de la foto en el server de [ImgBB](https://imgbb.com/)
|Categorias             |[String]   |cats
TODO: Analizar el como alojar el stock en la base de datos
```json
{
  "IDProducto": {
    "IDAlmacen1": 0,
    "IDAlmacen2": 4,
    "IDAlmacen3": 8
  }
}
```
en Realtime database u otras opciones en firestore
## Funciones
* Generar y Actualizart Bucket
# Usuario
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Cedula de Identidad    |String     |dni        |Este sera el valor usado para el UID y al que se hara referencia 
|Nombre                 |String     |name
|Telefono               |String     |phone
|Correo Electronico     |String     |mail       |Este puede o no existir se usasra para el login a manera de nombre de usuario
|Contrasena             |String     |pass       |Aunque no es muy seguro poner la contrasena sin cifrar, para efectos practicos devera funcionar asi
|Almacen                |String     |store      |El ID del almacen al que se vincularan todas las transacciones
|Rol                    |String     |role       |sera un enum "Administrador", "Supervisor", "Vendedor"
### Administrador
Tendra a acceso a todos los registros para verlos, y podra realizar todas las operaciones
### Supervisor
* No podra crear ni editar usuarios
* No podra vender (*deacuerdo al backlog*)
* Devera validar cada venta para que esta tome efecto
* Tendra acceso a todo lo demas
### Vendedor
* Podra realizar Ventas
* Podra pagar creditos
* Generar reportes de ventas y creditos pendientes asignados a su usuario
* Exclusivo uso del mobil
* No podra acceder a la version web
## Funciones
* Al Crear en la Base de Datos
> Se devera crear un Usuario en la base de datos usando el **_dni_** como **_User ID_**
> 
> Se Asignaran los *user claims* al usuario una vez creado para controlar su acceso a la base de datos
* Al Editarse en la base de datos
> No se podra ediar el Nombre, Correo Electronico o Cedula de Identidad
> 
> Se actualizaran los claims del usuario para que todas las transacciones en adelante tomen como referencia esos parametros
* Al Eliminarse de la base de datos
> Se eliminara el acceso al sistema del usuario, y su registro en la base de datos
> 
> Ninguna transaccion realizada a su nombre se vera afectada
> 
> Se eliminara su nombnre del Bucket
* Generar Bucket
> SE pondra el nombre del usuario en el bucket de usuarios
# Almacenes
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre                 |String     |name
|Direccion              |String     |address    
## Funciones
* Generar y Actualizar el bucket de Almacenes
* TODO: Analizart la logica de almacenes
# Transaccion
Al Aprovarse una venta se genera una Transaccion que es la modifica los stocks
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Usuario ID             |String     |uid        |ID del Usuario que realizo la transaccion
|Nombre de Usuraio      |String     |name       |Nombre del usuario que realizo la transaccion
|Fecha                  |Timestamp  |date       
|Origen                 |String     |origin     |**_null_** o el nombre del almacen Origen de los productos
|Destino                |String     |destiny    |**_null_** o el nombre del Almacen Destino de los productos
|Origen ID              |String     |originId   |ID del Almacen o ID de la Venta que realizo la transaccion
|Destino ID             |String     |destinyId  |ID del Almacen o ID de la Factura (Despacho) que realizo la transaccion
|Productos              |[**_Items_**]|items    |Lista de los stocks a ser alterados en esta transaccion
### Items
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre Producto        |String     |name
|ID Producto            |String     |id
|Cantidad               |String     |quantity   
## Funciones
* Al Crear
> Alterar los stocks de cada producto deacuerdo a la transaccion
# Factura
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Usuario ID             |String     |uid        |ID del Usuario que realizo la transaccion
|Nombre de Usuraio      |String     |name       |Nombre del usuario que realizo la transaccion
|Fecha                  |Timestamp  |date       
|Proveedor              |String     |provider   |Nombre del Proveedor
|Proveedor ID           |String     |providerId |Id Del Proveedor
|Descuento              |Number     |off
|Items                 |[**_Items_**]|items    |Lista de los productos comprados y listados en la factura
|Despachos           |[**_Despachos_**]|dispatches| Lista de los Despachos (Entregas) de productos al almacen
### Items
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre Producto        |String     |name
|Id Producto            |String     |id 
|Precio Unitario        |Number     |unitPrice
|Cantidad               |Number     |quantity   
|Descuento              |Number     |off
### Despachos
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Usuario ID             |String     |uid        |ID del Usuario que realizo la transaccion
|Nombre de Usuraio      |String     |name       |Nombre del usuario que realizo la transaccion
|Fecha                  |Timestamp  |date
|Items                 |[**_ItemsD_**]|items    |Lista de los productos comprados y listados en la factura
### ItemsD
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre Producto        |String     |name
|Id Producto            |String     |id
|Total                  |Number     |total      |Copia de La Cantidad de Items
|Cantidad Acumulada     |Number     |actual     |Cantidad Acumulada hasta ahora de productos
|Cantidad a Anadir      |Number     |quantity   |Cantidad anadida en esta transaccion
## Funciones
* Al Actualizar
> Comparar el anterior con la actualiozacion y crear una transaccion por cada nuevo despacho vinculandolo a esta factura
# Venta
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Usuario                |String     |uid        |Id del Usuario que realizo la venta    
|Nombre Usuario         |String     |name
|Fecha                  |Timestamp  |date       |Puede ser "Efectivo", "Credito", "Otro"
|Tipo                   |String     |type
|Desuento               |Number     |discount
|Verificada             |Bool       |aproved    |Este define si la venta fue o no aprtovada por un supervisor para su aprovacion y que tome efecto
|Total                  |Number     |total
|Items                  |[**_Items_**]|items    
### Items
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre Producto        |String     |name   
|Id Producto            |String     |id
|Cantidad               |Number     |quantity
|Precio unitario        |Number     |price
|Descuento              |Number     |discount
## Funciones
* Al crear
> Si la venta es a Credito crear un registro Credito
> 
* Al autorizar el Supervisor
> Registrar una transaccion de venta al aprovarse la venta

# Credito
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Usuario ID             |String     |uid        |ID del usuario encargado de controlar los pagos
|Nombre de Usuario      |String     |name       |Nombre del Usuario encargado del credito
|Fecha de Creacion      |Timestamp  |date
|Cliente ID             |String     |cid        |ID del Cliente al cual se le realizo la venta
|Cliente Nombre         |String     |cname      |Nombre del Cliente
|Total                  |Number     |total      |Total a pagarse del Credito    
|Pagos                  |[**_Pago_**]|payments  |Histoprial de los pagos de credito
### Pago
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Fecha                  |Timestamp  |date       |
|Usuario ID             |String     |uid        |Id del usuario que realizo el pago (De cambiar el ususario a cargo de una venta a credito quedara constancia de que los primeros pagos los realizo el primer usuario)
|Nombre Usuario         |Striing    |name       |Nombre de usuario que reaalizo el pago
|Monto                  |Number     |amount     |Monto pagado en la transaccion
# Cliente
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|CI/NIT                 |String     |dni        |CI o NIT del cliente (**este sera su ID**)
|Nombre                 |String     |name
|Direccion              |String     |address
|Telefono               |String     |phone
|Asesor de Ventas       |String     |advisorid  |ID de Usuario que tiene asignado este cliente
|Nombre de Asesor       |String     |nameadvisor|Nombre del usuario que tiene asignado a  este cliente
# Gasto
## Modelo
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Usuario ID             |String     |uid        |Id del usuario que registro el Gasto
|Nombre Usuario         |String    |name       |Nombre de usuario que registro el GAsto
|Fecha de Creacion      |Timestamp  |date
|Total                  |String     |total      
|Items                  |[**_Item_**]|items     
### Items
|Atributo               |Tipo       |NombreDB   |Observacion        |
|-----------------------|----------:|-----------|-------------------|
|Nombre                 |String     |name   
|Cantidad               |Number     |quantity
|Subtotal               |Number     |total