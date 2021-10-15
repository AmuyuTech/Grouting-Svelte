<script>
  import { Collection } from "sveltefire";
  import { push } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import ReportGenerator from "../components/ReportGenerator.svelte";
  import {BucketClientes, BucketUsuarios, UserBucketclientes} from "../controller/firebaseAPI";
  import AutoComplete from "simple-svelte-autocomplete";
  const { open } = getContext("simple-modal");

  function reporte() {
    open(ReportGenerator, { sw: true, nombre: "Clientes" });
  }

  function newCliente() {
    push("/Clientes/New");
  }

  let clientes = [];

  let selection = {};

  let lista = [];

  let busqueda = "";

  let asesores = []

  const todos = {name: 'Todos', id: null}

  let uns
  onMount(() => {
    uns = BucketClientes.subscribe((s) => {
      clientes = s;
      lista = s;
    });
    BucketUsuarios.subscribe((s) => {
      asesores = [todos, s]
    })
  });

  $: () => {
    if (busqueda.length > 0) {
      lista = clientes.filter((s) => {
        return s.dni === busqueda || s.name === busqueda;
      });
    } else {
      lista = clientes;
    }
  };

  const onSelectionChange = (s) => {
    try {
      uns()
    }catch (e) {

    }
    if(!s) {
      return
    }
    if (s === todos) {
      uns = BucketClientes.subscribe((ss) => {
        clientes = ss
        lista = clientes
      })
    } else {
      UserBucketclientes(s.id).then((dd) => {
        clientes = dd
        lista = clientes
      })
    }
  }
</script>

<div class="header-row">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="users"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    class="svg-inline--fa fa-users fa-w-20 fa-5x"
  >
    <g class="fa-group">
      <path
        fill="currentColor"
        d="M96 224a64 64 0 1 0-64-64 64.06 64.06 0 0 0 64 64zm480 32h-64a63.81 63.81 0 0 0-45.1 18.6A146.27 146.27 0 0 1 542 384h66a32 32 0 0 0 32-32v-32a64.06 64.06 0 0 0-64-64zm-512 0a64.06 64.06 0 0 0-64 64v32a32 32 0 0 0 32 32h65.9a146.64 146.64 0 0 1 75.2-109.4A63.81 63.81 0 0 0 128 256zm480-32a64 64 0 1 0-64-64 64.06 64.06 0 0 0 64 64z"
        class="fa-secondary"
      />
      <path
        fill="currentColor"
        d="M396.8 288h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 128 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 396.8 288zM320 256a112 112 0 1 0-112-112 111.94 111.94 0 0 0 112 112z"
        class="fa-primary"
      />
    </g>
  </svg>
  <h1 style="margin-left: 1rem;">Clientes</h1>
</div>
<div class="controls-row">
  <div class="input-container">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="search"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="input-icon"
      ><g class="fa-group"
        ><path
          fill="currentColor"
          d="M208 80a128 128 0 1 1-90.51 37.49A127.15 127.15 0 0 1 208 80m0-80C93.12 0 0 93.12 0 208s93.12 208 208 208 208-93.12 208-208S322.88 0 208 0z"
          class="fa-secondary"
        /><path
          fill="currentColor"
          d="M504.9 476.7L476.6 505a23.9 23.9 0 0 1-33.9 0L343 405.3a24 24 0 0 1-7-17V372l36-36h16.3a24 24 0 0 1 17 7l99.7 99.7a24.11 24.11 0 0 1-.1 34z"
          class="fa-primary"
        /></g
      ></svg
    >
    <input
      bind:value={busqueda}
      class="input text-input"
      placeholder="Buscar..."
    />
  </div>
  <label>Asesor
  <AutoComplete
    items={asesores}
    labelFieldName="name"
    onChange={onSelectionChange}
    />
  </label>
  <button class="button" on:click={reporte}>Reporte de Deudas</button>
  <button class="button" style="margin-left: auto;" on:click={newCliente}
    >Registrar Cliente</button
  >
</div>
  <div style="padding: 2rem;">
    <div class="table-container">
      <table class="table-body">
        <tr>
          <th> NIT </th>
          <th> Nombre </th>
        </tr>
        {#each lista as row}
          <tr on:click={() => push(`/Clientes/${row.id}`)}>
            <td>{row.dni}</td>
            <td>{row.name}</td>
          </tr>
        {/each}
      </table>

    </div>
  </div>

<style>
  .table-container {
    border-radius: 1rem;
    overflow: hidden;
    overflow-x: auto;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
    width: 100%;
  }

  table {
    border-collapse: collapse;

    width: 100%;
  }

  th {
    font-family: Lato-Bold;
    font-size: 18px;
    color: #fff;
    line-height: 1.4;
    background-color: #6c7ae0;
  }

  tr:nth-child(even) {
    background-color: #f8f6ff;
  }

  td {
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  th {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .table-footer {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }

  .footer-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: transparent;
    border-color: transparent;
  }
</style>
