<script>
  import { Collection } from "sveltefire";
  import {push} from 'svelte-spa-router'
import { registerTestClientes } from "../firebaseAPI";
import { getContext } from "svelte";
const { open } = getContext('simple-modal');
  function registerTest() {
    registerTestClientes()
  }
  function reporte() {
    open(ReportGenerator, {sw: true, nombre: 'Clientes'})
  }
  let search = "";
  let pagesize = 10
  function filterData() {
    const s = search.trim().toLowerCase();
    if (s.length > 0) {
      Data = items.filter((v) => {
        return Object.values(v).toString().toLowerCase().indexOf(s) !== -1;
      });
    } else {
      Data = items;
    }
  }
  function newCliente() {
    push("/Clientes/New");
  }
  let query = (ref) => ref.orderBy("nombre", "desc").limit(pagesize);

  function nextPage(last$) {
    query = (ref) =>
      getQuery(ref)
        .orderBy("nombre", "desc")
        .startAfter(last$["nombre"])
        .limit(pagesize);
  }

  function prevPAge(first$) {
    query = (ref) =>
      getQuery(ref)
        .orderBy("nombre", "desc")
        .endBefore(first$["nombre"])
        .limitToLast(pagesize);
  }
  function firstPage() {
    query = (ref) => getQuery(ref).orderBy("nombre", "desc").limit(pagesize);
  }
  function lastPage() {
    query = (ref) =>
      getQuery(ref).orderBy("nombre", "desc").limitToLast(pagesize);
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
  <!--div class="input-container">
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
      bind:value={search}
      on:keyup={filterData}
      class="input text-input"
      placeholder="Buscar..."
    />
  </div-->
  <button class="button" on:click={reporte}>Reporte de Deudas</button>
  <button on:click={registerTest}>REgistar TEst</button>
  <button class="button" style="margin-left: auto;" on:click={newCliente}
    >Registrar Cliente</button
  >
</div>
<Collection path={"CLIENTES"} {query} let:data let:first let:last>
  <div style="padding: 2rem;">
    <div class="table-container">
      <table class="table-body">
        <tr>
          <th> NIT </th>
          <th> Nombre </th>
          <th> Telefono </th>
        </tr>
        {#each data as row}
          <tr on:click={() => push(`/Clientes/${row.id}`)}>
            <td>{row.nit}</td>
            <td>{row.nombre}</td>
            <td>{row.telefono}</td>
          </tr>
        {/each}
      </table>

      <div class="table-footer">
        <!-- No implementable??  revirsar p style="margin-left: 2rem;">## de ### </p-->

        <button
          style="margin-left: auto;"
          class="footer-button"
          on:click={firstPage}
        >
          <svg viewBox="0 0 24 24" focusable="false" class="footer-icon"
            ><path
              d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
            /></svg
          >
        </button>
        <button class="footer-button" on:click={prevPAge(first)}>
          <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
            ><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg
          >
        </button>
        <button class="footer-button" on:click={nextPage(last)}>
          <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
            ><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg
          >
        </button>
        <button
          class="footer-button"
          style="margin-right: 2rem;"
          on:click={lastPage}
        >
          <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
            ><path
              d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
            /></svg
          >
        </button>
      </div>
    </div>
  </div>
  <span slot="loading">Cargando...</span>
</Collection>
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
  
