<script>
  import { push } from "svelte-spa-router";
  import Datepicker from "../components/Datepicker/Datepicker.svelte";
  import { Collection } from "sveltefire";
  let search = "";
  let facturas = [];
  let pagesize = 10;
  let datefilterStart = "";
  let datefilterEnd = "";
  let desdeAux = new Date();
  let hastaAux = new Date();

  function registerFact() {
    push("/Facturas/New");
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
    let aux = ref$
    if (datefilterStart !== '') {
        aux = aux.where('fecha', '>=', datefilterStart)
    }
    if (datefilterEnd !== '') {
        aux = aux.where('fecha', '<=', datefilterEnd)
    }
    return aux
}
let query = ref => getQuery(ref).orderBy('fecha', 'desc').limit(pagesize)

function nextPage(last$) {
    query = ref => getQuery(ref).orderBy('fecha', 'desc').startAfter(last$['fecha']).limit(pagesize)
}

function prevPAge(first$) {
    query = ref => getQuery(ref).orderBy('fecha', 'desc').endBefore(first$['fecha']).limitToLast(pagesize)
}
function firstPage() {
  query = ref => getQuery(ref).orderBy('fecha', 'desc').limit(pagesize)
}
function lastPage() {
  query = ref => getQuery(ref).orderBy('fecha', 'desc').limitToLast(pagesize)
}
</script>

<div class="header-row">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="file-invoice"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    class="svg-inline--fa fa-file-invoice fa-w-12 fa-5x"
  >
    <g class="fa-group">
      <path
        fill="currentColor"
        d="M96 320h192v-64H96zm288-192H272a16 16 0 0 1-16-16V0H24A23.94 23.94 0 0 0 0 23.88V488a23.94 23.94 0 0 0 23.88 24H360a23.94 23.94 0 0 0 24-23.88V128zM64 72a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8zm0 64a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8zm256 304a8 8 0 0 1-8 8h-80a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8zm0-104a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h224a16 16 0 0 1 16 16z"
        class="fa-secondary"
      />
      <path
        fill="currentColor"
        d="M377 105L279.1 7a24 24 0 0 0-17-7H256v112a16 16 0 0 0 16 16h112v-6.1a23.9 23.9 0 0 0-7-16.9zm-73 119H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16zm-16 96H96v-64h192zm24 96h-80a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"
        class="fa-primary"
      />
    </g>
  </svg>
  <h1 style="margin-left: 1rem;">Facturas</h1>
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
    <!--input  bind:value={search} on:keyup={filterData} class="text-input input" placeholder="Buscar...">
    <Datepicker
      on:datechange={ondesdeChange}
      selected={desdeAux}
      isAllowed={(date) => {
        const millisecs = date.getTime();
        if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
        return false;
      }}
    />
  </div-->
  <Datepicker
    on:datechange={ondesdeChange}
    selected={desdeAux}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}
  /><Datepicker
    on:datechange={onhastaChange}
    selected={hastaAux}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}
  />
  <button class="button" style="margin-left: auto;" on:click={registerFact}
    >Registrar Factura</button
  >
</div>
<Collection path={"FACTURAS"} {query} let:data let:first let:last let:error>
  <div style="padding: 2rem;">
    <div class="table-container">
      <table class="table-body">
        <tr>
          <th>Fecha</th>
          <th>Proveedor</th>
          <th>Estado</th>
        </tr>
        {#each data as fact}
          <tr>
            <td>{fact.fecha}</td>
            <td>{fact.proveedor}</td>
            <td>{fact.estado}</td>
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
  <span slot="fallback">Error: {error}</span>
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
