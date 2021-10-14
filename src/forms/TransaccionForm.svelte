<script>
  import { pop, replace } from "svelte-spa-router";
  import { ProductosB, User } from "../stores";
  import { onMount, onDestroy } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";
  import { toast } from "@zerodevx/svelte-toast";
  import {
    BucketProducts,
    getAlmacenes,
    getTransaccion,
    registrarTransaction,
  } from "../controller/firebaseAPI";
  import { Transaccion } from "../models/transaccion";

  let payload = new Transaccion();
  let productos = [];
  let almacenes = [];
  export let params = {};
  onMount(() => {
    BucketProducts.subscribe((b) => {
      productos = b;
    });
    getAlmacenes().subscribe((d) => {
      almacenes = d;
    });

    if (params.id !== "New") {
      getTransaccion(params.id).then((snp) => {
        payload = snp;
      });
    } else {
      User.subscribe((value) => {
        if (value) {
          payload.uid = value?.uid;
          payload.name = value?.displayName;
        }
      });
    }
  });

  function addItem() {
    payload.addItem();
    payload = payload;
  }

  function aceptar() {
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });
    registrarTransaction(payload).then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace("/Almacenes");
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

  function cancelar() {
    pop();
  }

  let auxa = { name: "", id: "" };
  let auxb = { name: "", id: "" };
  $: {
    if (auxa !== undefined) {
      payload.setOrigen(auxa);
    }
    if (auxb !== undefined) {
      payload.setDestino(auxb);
    }

    payload = payload;
  }
</script>

<h1>Registro de Transaccion</h1>
<div class="row" style="width: 100%;">
  <p style="margin-left: 1rem;">Usuario: {payload.name}</p>
  <p style="margin-right: 1rem; margin-left: auto;">
    Fecha: {(new Date(payload.date)).toLocaleString("es-BO")}
  </p>
</div>
<div class="row">
  <div class="box">
    <label>
      Origen
      <AutoComplete items={almacenes} labelFieldName="name" bind:value={auxa} />
    </label>
  </div>
  <div class="box">
    <label>
      Destino
      <AutoComplete items={almacenes} labelFieldName="name" bind:value={auxb} />
    </label>
  </div>
</div>
<div class="row" style="width: 100%;">
  <h3>Items</h3>
  <button class="button" on:click={addItem}>Agregar Item</button>
</div>
{#each payload.productos as item, i}
  <div class="row" style="width: 100%; align-items: center;">
    Nombre
    <AutoComplete
      items={productos}
      labelFieldName="name"
      onChange={(o) => {
        item.setProducto(o ? o : { name: "", id: "" });
        return true;
      }}
    />
    <label style="align-items: center;">
      Cantidad
      <input type="number" bind:value={item.quantity} />
    </label>
    <button
      class="button"
      on:click={() => {
        payload.productos.splice(i, 1);
      }}
      >X
    </button>
  </div>
{/each}
<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button class="button" style="margin-left: auto;" on:click={aceptar}
    >Aceptar
  </button>
  <button class="button" on:click={cancelar}>Cancelar</button>
</div>

<style>
  .box {
    flex-grow: 1;
  }

  .button {
    width: auto;
    margin: 1rem;
  }

  .row {
    align-items: center;
    gap: 1rem;
  }

  :global(.autocomplete) {
    flex-grow: 1;
  }
</style>
