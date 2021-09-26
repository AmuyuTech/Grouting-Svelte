<script>
  import { pop, replace } from "svelte-spa-router";
  import { registrarTransaccion} from "../firebaseAPI";
  import { ProductosB, User } from "../stores";
  import { onMount, onDestroy } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";
  import { toast } from '@zerodevx/svelte-toast'
  let unsub;
  let productos = [];
  onMount(() => {
    unsub = ProductosB.subscribe((p) => {
      console.log({p})
      productos = [...p];
    });
  });
  onDestroy(() => unsub());
  let nombre = "test";
  let origen = "elalto";
  let destino = "elalto";
  let items = [];
  //!  User.subscribe((s) => (nombre = s ? 'test' :s.displayName));
  function fecha () {
    const today = new Date();
    return `${today.getFullYear()}/${
      today.getMonth() + 1 >= 10
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)
    }/${today.getDate > 10 ? today.getDate() : "0" + today.getDate()}`;
  };
  function addItem() {
    items = [...items, {
      p: {},
      cantidad: "",
    }];
  }
  function aceptar() {
    items = items.map(it => ({
      nombre: it.p.nombre,
      id: it.p.id,
      cantidad: it.cantidad
    }))
    let data = {
      nombre,
      origen,
      destino,
      items,
      fecha: "" + fecha(),
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
    registrarTransaccion(data).then(
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
</script>

<h1>Registro de Transaaccion</h1>
<div class="row" style="width: 100%;">
  <p style="margin-left: 1rem;">Usuario: {nombre}</p>
  <p style="margin-right: auto; margin-left: 1rem;">
    Fecha: {new Date().toLocaleString("es-BO")}
  </p>
</div>
<div class="row">
  <div class="box">
    <label>
      Origen
      <select bind:value={origen}>
        <option value={"elalto"}>El Alto</option>
        <option value={"sopocachi"}>Sopocachi</option>
        <option value={"zonasur"}>Zona Sur</option>
      </select>
    </label>
  </div>
  <div class="box">
    <label>
      Destino
      <select bind:value={destino}>
        <option value={"elalto"}>El Alto</option>
        <option value={"sopocachi"}>Sopocachi</option>
        <option value={"zonasur"}>Zona Sur</option>
      </select>
    </label>
  </div>
</div>
<div class="row" style="width: 100%;">
  <h3>Items</h3>
  <button class="button" on:click={addItem}>Agregar Item</button>
</div>
{#each items as item, i}
  <div class="row" style="width: 100%; align-items: center;">
      Nombre
      <AutoComplete
        items={productos}
        bind:selectedItem={item.p}
        labelFieldName={"nombre"}
        valueFieldName={"id"}
        />
        <label style="align-items: center;">
          Cantidad
          <input type="number" bind:value={item.cantidad}>
        </label>
        <button class="button" on:click={() => {items.splice(i, 1); items = items}}>X</button>
  </div>
{/each}
<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button class="button" style="margin-left: auto;" on:click={aceptar}
    >Aceptar</button
  >
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
