<script>
	import { push } from "svelte-spa-router";
  import Datepicker from "../components/Datepicker/Datepicker.svelte";
  import { Collection } from "sveltefire";
  import {registerTestVentas} from "../firebaseAPI";
  let search = "";

  let page = 0;
  let pageSize = 10;

  let pagesize = 10;
  let datefilterStart = "";
  let datefilterEnd = "";
  let desdeAux = new Date();
  let hastaAux = new Date();

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
  const registerAll = () => {
    registerTestVentas()
  }

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
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="cash-register" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
  class="svg-inline--fa fa-cash-register fa-w-16 fa-7x">
 <g class="fa-group">
     <path fill="currentColor"
           d="M296.1 232a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm-48 128h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16zm-16-112a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16zm-96 0a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16zm48 96v-16a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16zm160 88h-176a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm16-120h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm48-80h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM144 192l64 .1v-64h96a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h96zM82 84V44h188v40z"
           class="fa-secondary"></path>
     <path fill="currentColor"
           d="M511.2 378.8l-26.7-160a32 32 0 0 0-31.6-26.7L208 192v.06l-47.54-.06H59.2a32.09 32.09 0 0 0-31.6 26.7L.9 378.7a62 62 0 0 0-.9 10.5V480a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32v-90.7a53.09 53.09 0 0 0-.8-10.5zM280.1 248a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16zm-32 64h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16zm-64-64a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16zm-64 32h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16zm16 64v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16zm216 112a8 8 0 0 1-8 8h-176a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8zm24-112a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16zm48-80a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z"
           class="fa-primary"></path>
 </g>
</svg>
    <h1 style="margin-left: 1rem;">Ventas</h1>
  </div>
  <div class="controls-row">
  <Datepicker
    on:datechange={ondesdeChange}
    selected={desdeAux}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}
  />
  <Datepicker
    on:datechange={onhastaChange}
    selected={hastaAux}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}
  />
  <button
    class="button"
    style="margin-left: auto;"
    on:click={registerAll}>Registrar Transaccion</button
  >
</div>
<Collection path={"REGISTROSVENTAS"} {query} let:data let:first let:last>
  <div style="padding: 2rem;">
    <div class="table-container">
      <table class="table-body">
        <tr>
          <th>Fecha</th>
          <th>Asesor</th>
          <th>Cliente</th>
          <th>Tipo</th>
        </tr>
        {#each data as fact}
          <tr>
            <td>{fact.fecha}</td>
            <td>{fact.asesor}</td>
            <td>{fact.nombre}</td>
            <td>{fact.tipo === 1 ? 'Efectivo': (fact.tipo === 2 ? 'Credito' : 'Otro')}</td>
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