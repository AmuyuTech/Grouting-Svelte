<script>
  import { push } from "svelte-spa-router";
  import Datepicker from "../components/Datepicker/Datepicker.svelte";
  import { Collection } from "sveltefire";
  import {getContext} from 'svelte'
  import AlmacenInterface from "../components/AlmacenInterface.svelte"
    const {open} = getContext('simple-modal')
  let search = "";

  let page = 0;
  let pageSize = 10;

  let pagesize = 10;
  let datefilterStart = "";
  let datefilterEnd = "";
  let desdeAux = new Date();
  let hastaAux = new Date();

  const openStoreManager = () => {
      open(AlmacenInterface, {})
    }
  const ondesdeChange = (d) => {
    datefilterStart = toStr(d.detail);
    desdeAux = d.detail;
    query = query;

  };
  const onhastaChange = (d) => {
    datefilterEnd = toStr(d.detail);
    hastaAux = d.detail;
    query = query;
  };

  function toStr(d) {
    var dd = d.getDate();

    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${yyyy}/${mm}/${dd}`;
  }

  function getQuery(ref$) {
    let aux = ref$;
    if (datefilterStart !== "") {
      aux = aux.where("fecha", ">=", datefilterStart);
    }
    if (datefilterEnd !== "") {
      aux = aux.where("fecha", "<=", datefilterEnd);
    }
    return aux;
  }
  let query = (ref) => getQuery(ref).orderBy("fecha", "desc").limit(pagesize);

  function nextPage(last$) {
    query = (ref) =>
      getQuery(ref)
        .orderBy("fecha", "desc")
        .startAfter(last$["fecha"])
        .limit(pagesize);
  }

  function prevPAge(first$) {
    query = (ref) =>
      getQuery(ref)
        .orderBy("fecha", "desc")
        .endBefore(first$["fecha"])
        .limitToLast(pagesize);
  }
  function firstPage() {
    query = (ref) => getQuery(ref).orderBy("fecha", "desc").limit(pagesize);
  }
  function lastPage() {
    query = (ref) =>
      getQuery(ref).orderBy("fecha", "desc").limitToLast(pagesize);
  }
</script>

<div class="header-row">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="exchange-alt"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="svg-inline--fa fa-exchange-alt fa-w-16 fa-7x"
  >
    <g class="fa-group">
      <path
        fill="currentColor"
        d="M128 272v48h360a24 24 0 0 1 24 24v16a24 24 0 0 1-24 24H128v48c0 21.44-25.94 32-41 17L7 369a24 24 0 0 1 0-33.94l80-80c15.14-15.12 41-4.35 41 16.94z"
        class="fa-secondary"
      />
      <path
        fill="currentColor"
        d="M505 143.05a24 24 0 0 1 0 33.95l-80 80c-15 15-41 4.49-41-17v-48H24a24 24 0 0 1-24-24v-16a24 24 0 0 1 24-24h360V80c0-21.36 25.9-32 41-17z"
        class="fa-primary"
      />
    </g>
  </svg>
  <h1 style="margin-left: 1rem;">Almacenes</h1>
</div>
<div class="controls-row">
  <Datepicker
    on:datechange={ondesdeChange}
    selected={desdeAux}
    label={'Desde'}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}
  />
  <Datepicker
    on:datechange={onhastaChange}
    selected={hastaAux}
    label={'Hasta'}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}
  />
  <button
    class="button"
    on:click={openStoreManager}
    >
    Administrar Almacenes
  </button>
  <button
    class="button"
    style="margin-left: auto;"
    on:click={() => {
      push("/Almacenes/New");
    }}>Registrar Transaccion</button
  >
</div>
<Collection path={"TRANSACCIONES"} {query} let:data let:first let:last>
  <div style="padding: 2rem;">
    <div class="table-container">
      <table class="table-body">
        <tr>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Origen</th>
          <th>Destino</th>
        </tr>
        {#each data as fact}
          <tr>
            <td>{fact.fecha}</td>
            <td>{fact.nombre}</td>
            <td>{fact.origen}</td>
            <td>{fact.destino}</td>
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
  
