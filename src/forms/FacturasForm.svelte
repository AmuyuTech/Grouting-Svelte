<script>
  import { pop, replace } from "svelte-spa-router";
  import { actualizarFactura, registrarFactura } from "../firebaseAPI";
  import facturas from "./../assets/facturas";
  import AutoComplete from "simple-svelte-autocomplete";
  import { ProductosB } from "../stores";
  import { calcularEstado, getDate } from "../util.js"
  import {toast} from '@zerodevx/svelte-toast'
  import {onMount} from "svelte";


  export let params = {};
  let productos = [];
  ProductosB.subscribe((v) => (productos = v));
  let disabled = false;
  $: {
    if (params.id === "New") {
    } else {
      disabled = true;
    }
  }
  let numero = "";
  let proveedor = "";
  let usuario = "";
  let fecha = getDate();
  let items = [];
  let despachos = [];

  function registerAll() {
    facturas.forEach((f) => registrarFactura(f));
  }

  function addItem() {
    items = [
      ...items,
      {
        cantidad: "",
        nombre: "",
        id: "",
        precioUnitario: "",
        descuento: "",
      },
    ];
  }

  function addDespacho() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    let auxdesp = new Array(items.length);
    despachos.forEach((v) => {
      v.items.forEach((x, i) => {
        if (auxdesp[i] === undefined) {
          auxdesp[i] = 0;
        }
        auxdesp[i] += x.add;
      });
    });
    let desp = [];
    items.forEach((i, pos) => {
      desp.push({
        nombre: i.nombre,
        cantidad: i.cantidad,
        pendiente: i.cantidad - (isNaN(auxdesp[pos]) ? 0 : auxdesp[pos]),
        add: 0,
      });
    });
    console.log({ desp, items, auxdesp, despachos });
    despachos = [
      ...despachos,
      {
        nombre: "$Username",
        fecha: `${yyyy}/${mm}/${dd}`,
        items: desp,
      },
    ];
  }

  function cancelar() {
    pop();
  }

  function aceptar() {
    let data = {
      numero,
      usuario: "dd",
      proveedor,
      items: items.map((v) => {
        let aux = v;
        delete aux.tmp;
        return aux;
      }),
      despachos,
      fecha,
    };
    const estado  = calcularEstado(data)
    data.estado = estado
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });
    let promesa;
    if (params.id === "New") {
      promesa = registrarFactura(data);
    } else {
      promesa = actualizarFactura(data, params.id);
    }
    promesa.then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace("/Productos");
      },
      (e) => {
        toast.pop();
        console.error(e);
        toast.push("Error! porfavor intente de nuevo", {
          theme: {
            "--toastBackground": "#F56565",
            "--toastProgressBackground": "#C53030",
          },
        });
      }
    );
  }
</script>

<h1>{params.id === "New" ? "Registrar Factura" : " Registrar Despachos"}</h1>
<div class="gridd">
  <div class="nro">
    <label for="nro">Numero</label>
    <input type="text" name="nro" bind:value={numero} {disabled} />
  </div>
  <div class="data">
    <p>{usuario}</p>
    <p>{fecha}</p>
  </div>
  <div class="proveedor">
    <label for="prov">Proveedor</label>
    <input type="text" name="prov" bind:value={proveedor} {disabled} />
  </div>
  <div class="new-item">
    <button
      class="button"
      style="width: auto; margin-left: auto;"
      on:click={addItem}
      {disabled}
      >Agregar Item
    </button>
  </div>
  <div class="items">
    <h3>Items</h3>
    {#each items as itm, idx}
      <div class="line">
        <div class="number-container">
          <label for="cantidad">Cantidad</label><input
            type="number"
            name="cantidad"
            bind:value={itm.cantidad}
            {disabled}
          />
        </div>
        <div class="name-container">
          Producto
          <AutoComplete
            items={productos}
            title={"Producto"}
            labelFieldName={"nombre"}
            valueFieldName="nombre"
            bind:selectedItem={itm.tmp}
            bind:value={itm.nombre}
          />
          <div style="display: none;">
            <AutoComplete
              items={productos}
              labelFieldName={"nombre"}
              valueFieldName="id"
              bind:selectedItem={itm.tmp}
              bind:value={itm.id}
            />
          </div>
        </div>
        <div class="number-container">
          <label for="pu">Precio Unitaio</label><input
            type="number"
            name="pu"
            bind:value={itm.precioUnitario}
            {disabled}
          />
        </div>
        <div class="number-container">
          <label for="desc">Descuento</label><input
            type="number"
            name="desc"
            bind:value={itm.descuento}
            {disabled}
          />
        </div>
        <div class="number-container">
          <p>Total:</p>
          <p>{itm.cantidad * itm.precioUnitario - itm.descuento}</p>
        </div>
        <button class="button" on:click={items.splice(idx, 1)}>X</button>
      </div>
    {/each}
  </div>
  {#if params.id !== "New"}
    <div class="despachos">
      <div class="line">
        <h3>Despachos</h3>

        <button class="button" style="width: auto" on:click={addDespacho}
          >Registrar Despacho
        </button>
      </div>

      {#each despachos as desp, i}
        <div style="display: flex; width: 100%; margin-left:2rem;">
          <p>Usuario: {desp.nombre}</p>
          <p style="margin-rigth: auto; margin-left: 1rem;">
            {desp.fecha}
          </p>
        </div>
        <div style="margin-left: 3rem; margin-right: 2rem;">
          {#each desp.items as item, i}
            <div class="line">
              <span style="flex-grow: 1;">{item.nombre}</span>
              <span style="flex-grow: 1;">Cantidad: {item.cantidad}</span>
              <span style="flex-grow: 1;">Pendiente: {item.pendiente}</span>
              <div class="number-container">
                <input
                  style="flex-grow: 1;"
                  type="number"
                  placeholder="Agregar..."
                  bind:value={item.add}
                  max={item.pendiente}
                />
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button on:click={registerAll}>REGISTRAR TODO</button>
  <button class="button" style="margin-left: auto;" on:click={aceptar}
    >Aceptar
  </button>
  <button class="button" on:click={cancelar}>Cancelar</button>
</div>

<style>
  .gridd {
    display: grid;
    gap: 2rem;
  }

  @media only screen and (max-width: 600px) {
    .gridd {
      grid-template-columns: 1fr;
      grid-template-areas:
        "data"
        "nro"
        "proveedor"
        "new-item"
        "items"
        "despachos";
    }
  }

  @media only screen and (min-width: 600px) {
    .gridd {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        "nro . data"
        "proveedor proveedor new-item"
        "items items items"
        "despachos despachos despachos";
    }
  }

  .nro {
    grid-area: nro;
  }

  .data {
    grid-area: data;
  }

  .proveedor {
    grid-area: proveedor;
  }

  .new-item {
    grid-area: new-item;
    align-self: self-end;
    margin-left: auto;
  }

  .items {
    grid-area: items;
  }

  .despachos {
    grid-area: despachos;
  }

  :global(.name-container) {
    width: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .number-container {
    width: 8rem;
  }

  .line {
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }

  input {
    width: 100%;
  }

  button {
    width: auto;
  }
</style>
