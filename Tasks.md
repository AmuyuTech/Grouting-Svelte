# Frontend
Nota: La siguiente lista contiene solo las funciones que se analizaron inicialmente  y por tanto no es fija y puede variar deacuerdo a las especificaciones del cliente


* [ ] Lista con paginacion para la pagina de Transacciones 

> - [ ] Filtrar por intervalos de tiempo
> - [ ] Filtrar por Usuarios

* [ ] Lista con un Bucket para lo Clientes

> - [ ] Filtrar por Nombre
> - [ ] Filtrar por CI
> - [ ] Filtrar por Asesor

* [ ] Lista con un Bucket para lso Usuario

> - [ ] Filtrar por Nombre
> - [ ] Filtrar por CI

* [X] Lista con un Bucket para los Productos
* [ ] Lista con  paginacion para los Creditos

> - [ ] Filtrar por intervalos de tiempo
> - [ ] Filtrar por Clientes
> - [ ] Filtrar por Usuarios
> - [ ] Filtrar por Pendientes de Pago

* [ ] Lista con paginacion para las Factura

> - [ ] Filtrar por intervalos de tiempo
> - [ ] Filtrar por Proveedores

* [ ] Lista con paginacion para los gastos

> - [ ] Filtrar por intervalos de tiempo
> - [ ] Filtrar por Usuario

* [ ] Lista con paginacion para la pagina de ventas
* [ ] Pagina para editar Clientes
* [ ] Pagina para editar Ventas
* [ ] Pagina para editar creditos
* [ ] Ajustar Formulario de Gastos
* [X] Ajustar Formulario de Usuarios
* [X] Ajustar Formulario de Transacciones
* [X] Ajustar Formulario de Productos
* [X] Interfaz para aldministracion de Almacenes
* [ ] Ajustar PDF Catalogo
* [ ] Ajustar PDF Ventas
* [ ] Ajsutar PDF Stocks
* [ ] Ajustar PDF Deudas
* [ ] Pagina para editar Proveedores
* [ ] Pagina para listar Proveedores

> - [ ] Filtrar por Nombre
> - [ ] Filtrar por NIT
 
# Backend


* [X] Bucket Clientes

> - [X] Crear
> - [X] Actualizar
> - [X] Crear un Bucket por usuario

* [X] Bucket Usuarios

> - [X] Crear
> - [X] Actualizar 

* [X] Bucket Produtos

> - [X] Crear
> - [X] Actualizar
> - [X] Crear y Actualizar Bucket de Categiorias

* [X] Bucket Almacenes

> - [X] Crear
> - [X] Actualizar

* [X] Registrar TRansaccion al Validar Venta
* [X] Crear Usuarios
* [X] Actualizar Usuarios
* [X] Alterar Stocks al Crearse una Transaccion
* [X] Bucket Proveedores

> - [X] Crear
> - [X] Actualizar
 
## Anexos

### Bucket

Un **_"Bucket"_** es un tipo de dato especial que utiliza como indice para realizar busquedas rapidas y sencillas en la base de datos al costo de una lectura por modificacion en lugar de realizar **_N_** lecturas de la  base de datos y asi poder reducir lso costos del mantenimiento de la base de datos de manera exponencial. (si no se utiliza los costos de mantenimiento pueden llegar a alcanzar cifras muy altas a futuro)
La limitante es que solo se podran registrar en tre 30000 y 50000 registros en cada Bucket 
Devido a que muy pocas empresas lelgan a contratar a mas de 30000 empleados, tener un surtido de productos de ese tamano, se optimiza asi las busquedas para los campos de autocompletado
Ademas de optimizar en gran medida las busquedas en los campos de autocompletado
