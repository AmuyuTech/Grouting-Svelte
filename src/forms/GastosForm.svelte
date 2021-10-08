<script>
  import { getGasto, registrarGasto } from "../firebaseAPI";
  import { pop, replace } from "svelte-spa-router";
  import gastos from "./../assets/gastos.js";
  import { onMount } from "svelte";
  import { getDate, validarGasto } from "./../util.js";
  import { User } from "../stores.js";
  import { toast } from "@zerodevx/svelte-toast";
  export let params = {};

  let nombre = "Cargando";
  let fecha = getDate();
  let disabled = false;
  let usuarioId = ''
  let items = [];
  onMount(async () => {
    if (params.id !== "New") {
      disabled = true;
      getGasto(params.id).then((snp) => {
        const data = snp.data();
        nombre = data.nombre;
        fecha = data.fecha;
        items = data.items;
      });
    } else {
      User.subscribe((u) => {
        nombre = u?.displayName;
        usuarioId = u?.uid
        // console.log({u})
      });
    }
  });
  function aceptar() {
    if (params.id !== "New") {
      return;
    }
    let aux = 0 
    items.forEach(it => aux+=it.total)
    const payload = {
      fecha,
      nombre,
      usuarioId,
      items,
      total: aux,
    };
    console.log({payload});
    const msg = validarGasto(payload);
    console.log({msg});
    if (msg !== "True") {
      toast.push(msg, {
        theme: {
          "--toastBackground": "#F56565",
          "--toastProgressBackground": "#C53030",
        },
      });
      return;
    }
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });

    registrarGasto(payload).then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace("/Gastos/");
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

  function addItem() {
    items = [
      ...items,
      {
        nombre: "",
        cantidad: 0,
        total: 0,
      },
    ];
  }
  function addAll() {
    gastos.forEach((g) => registrarGasto(g));
  }
</script>

<h1>Registrar Gastos</h1>
<div class="row" style="widt: 100%;">
  <p>Usuario: {nombre}</p>
  <p style="margin-left: auto;">Fecha: {fecha}</p>
</div>
<div class="row" style="width: 100%;">
  <h3>Gastos</h3>
  <button
    class="button"
    style="width: auto; margin-left: auto; height: min-content;"
    on:click={addItem}
    {disabled}>Añadir Gasto</button
  >
</div>
{#each items as item, i}
  <div class="row" style="width: 100%;">
    <div class="name-container" style="margin-right: 1rem;">
      <label>
        Nombre
        <input
          type="text"
          bind:value={item.nombre}
          style="margin-right: 1rem;"
          {disabled}
        />
      </label>
    </div>
    <div class="number-container">
      <label>
        Cantidad
        <input type="number" bind:value={item.cantidad} {disabled} />
      </label>
    </div>
    <div class="number-container">
      <label>
        Costo
        <input type="number" bind:value={item.total} {disabled} />
      </label>
    </div>
    <div class="number-container" />
    <button
      class="button"
      style="width: auto; height: min-content;"
      on:click={() => items.splice(i, 1)}
      {disabled}
    >
      X
    </button>
  </div>
{/each}
<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button on:click={addAll}> Agregar Todos</button>
  <button class="button" style="margin-left: auto;" on:click={aceptar}
    >Aceptar</button
  >
  <button class="button" style="margin-left: 1rem;" on:click={cancelar}
    >Cancelar</button
  >
</div>

<style>
  .button {
    width: auto;
  }
  .number-container {
    width: fit-content;
  }
  .number-container label {
    width: auto;
    margin-right: 1rem;
  }
  :global(.row.button) {
    width: auto;
    height: 3rem;
  }
  label input {
    width: 100%;
    border-radius: 8px;
  }
</style>
