<script>
    import {pop, replace} from 'svelte-spa-router'
import { actualizarFactura, registrarFactura } from '../firebaseAPI';
import facturas from './../assets/facturas'
    export let params = {};
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
    let fecha = "";
    let items = [];
    let despachos = [];

    function registerAll() {
        facturas.forEach(f => registrarFactura(f))
    }

    function addItem() {
        items = [
            ...items,
            {
                cantidad: "",
                nombre: "",
                precioUnitario: "",
                descuento: "",
            },
        ];
    }
    function addDespacho() {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
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
                    auxdesp = 0;
                }
                auxdesp[i] += x.add;
            });
        });
        let desp = [];
        items.forEach((i, pos) => {
            desp.push({
                nombre: i.nombre,
                cantidad: i.cantidad,
                pendiente: auxdesp[pos],
                add: 0,
            });
        });
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
        pop()
    }
    function aceptar() {
    let data = {
      numero,
      estado: calcularEstado(),
      usuario: 'dd',
      proveedor,
      items,
      despachos
    };
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });
    let promesa
    if(params.id === 'New') {
        promesa = registrarFactura(data)
    }else {
        promesa = actualizarFactura(data, params.id)
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
        replace('/Productos');
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
            {disabled}>Agregar Item</button
        >
    </div>
    <div class="items">
        <h3>Items</h3>
        {#each items as it, i}
            <div class="line">
                <div class="number-container">
                    <label for="cantidad">Cantidad</label><input
                        type="number"
                        name="cantidad"
                        bind:value={items[i].cantidad}
                        {disabled}
                    />
                </div>
                <div class="name-container">
                    <label for="nm">Nombre</label><input
                        type="text"
                        name="nm"
                        bind:value={items[i].nombre}
                        {disabled}
                    />
                </div>
                <div class="number-container">
                    <label for="pu">Precio Unitaio</label><input
                        type="number"
                        name="pu"
                        bind:value={it.precioUnitario}
                        {disabled}
                    />
                </div>
                <div class="number-container">
                    <label for="desc">Descuento</label><input
                        type="number"
                        name="desc"
                        bind:value={it.descuento}
                        {disabled}
                    />
                </div>
                <div class="number-container">
                    <p>Total:</p>
                    <p>{it.cantidad * it.precioUnitario - it.descuento}</p>
                </div>
                <button class="button" on:click={items.splice(i, 1)}>X</button>
            </div>
        {/each}
    </div>
    <div class="despachos">
        <div class="line">
            <h3>Despachos</h3>

            <button class="button" style="width: auto" on:click={addDespacho}
                >Registrar Despacho</button
            >
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
                        <span style="flex-grow: 1;"
                            >Cantidad: {item.cantidad}</span
                        >
                        <span style="flex-grow: 1;"
                            >Pendiente: {item.pendiente}</span
                        >
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
</div>
<div class="row" style="width: 100%; right: 0; bottom: 0;">
    <button on:click={registerAll}>REGISTRAR TODO</button>
    <button
      class="button"
      style="margin-left: auto;"
      on:click={aceptar}>Aceptar</button
    >
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
    .name-container {
        width: auto;
        flex-grow: 1;
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
