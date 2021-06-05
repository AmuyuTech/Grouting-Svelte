import Productos from "./pages/Productos.svelte";
import Almacenes from "./pages/Almacenes.svelte";
import Clientes from "./pages/Clientes.svelte";
import Creditos from "./pages/Creditos.svelte";
import Despachos from "./pages/Despachos.svelte";
import Facturas from "./pages/Facturas.svelte";
import Gastos from "./pages/Gastos.svelte";
import Login from "./pages/Login.svelte";
import Usuarios from "./pages/Usuarios.svelte";
import Ventas from "./pages/Ventas.svelte";
import NotFound from "./pages/NotFound.svelte";
import MainPage from "./pages/MainPage.svelte";
import ProductForm from "./forms/ProductForm.svelte";
import ClientesForm from "./forms/ClientesForm.svelte";

export default {
  // Exact path
  "/": Productos,
  "/Productos": Productos,
  "/Almacenes": Almacenes,
  "/Clientes": Clientes,
  "/Creditos": Creditos,
  "/Despachos": Despachos,
  "/Facturas": Facturas,
  "/Gastos": Gastos,
  "/Usuarios": Usuarios,
  "/Ventas": Ventas,
  "/Productos/:id": ProductForm,
  "/Clientes/:id": ClientesForm,
  //'':,

  // Using named parameters, with last being optional
  //'/author/:first/:last?': Author,

  // Wildcard parameter
  //'/book/*': Book,

  // Catch-all
  // This is optional, but if present it must be the last
  // '*': NotFound,
};
export const root = {
  "/": MainPage,
  "/*": MainPage,
  "/login": Login,
  "*": NotFound,
  //'/':,
};