<script>
import {
    push
} from "svelte-spa-router";
import Datepicker from "../components/Datepicker/Datepicker.svelte";
import {
    Collection
} from 'sveltefire'
let search = "";
let facturas = [];
let pagesize = 10;
let datefilterStart = "";
let datefilterEnd = "";
let desdeAux = new Date();
let hastaAux = new Date();

function registerGasto() {
    push("/Gastos/New");
}
const ondesdeChange = (d) => {
    datefilterStart = toStr(d.detail);
    desdeAux = d.detail;
};
const onhastaChange = (d) => {
    datefilterEnd = toStr(d.detail);
    hastaAux = d.detail;
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
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="money-check-alt" role="img"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
    class="svg-inline--fa fa-money-check-alt fa-w-20 fa-5x">
   <g class="fa-group">
       <path fill="currentColor"
             d="M608 32H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zM176 327.88V344a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8v-16.29a57.26 57.26 0 0 1-31.37-11.35 8 8 0 0 1-.57-12.14L123.81 293a8.21 8.21 0 0 1 10.13-.73 24.08 24.08 0 0 0 12.82 3.73h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v16.29a57.18 57.18 0 0 1 31.37 11.35 8 8 0 0 1 .57 12.14L196.18 203a8.21 8.21 0 0 1-10.13.73 24 24 0 0 0-12.82-3.73h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312a8 8 0 0 1-8 8H296a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8zm160 0a8 8 0 0 1-8 8h-80a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8zm0-96a8 8 0 0 1-8 8H296a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h272a8 8 0 0 1 8 8z"
             class="fa-secondary"></path>
       <path fill="currentColor"
             d="M144 168.12V152a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v16.29a57.18 57.18 0 0 1 31.37 11.35 8 8 0 0 1 .57 12.14L196.18 203a8.21 8.21 0 0 1-10.13.73 24 24 0 0 0-12.82-3.73h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19 44.44-42.67 45.07V344a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8v-16.29a57.26 57.26 0 0 1-31.37-11.35 8 8 0 0 1-.57-12.14L123.81 293a8.21 8.21 0 0 1 10.13-.73 24.08 24.08 0 0 0 12.82 3.73h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.68-45.07z"
             class="fa-primary"></path>
   </g>
  </svg>
    <h1 style="margin-left: 1rem;">Gastos</h1>
</div>
<div class="controls-row" style="width: 100%;">
    <Datepicker
    on:datechange={ondesdeChange}
    selected={desdeAux}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}/>
    <Datepicker
    on:datechange={onhastaChange}
    selected={hastaAux}
    isAllowed={(date) => {
      const millisecs = date.getTime();
      if (millisecs + 25 * 3600 * 1000 <= Date.now()) return true;
      return false;
    }}/>
  <button class="button" style="margin-left: auto;" on:click={registerGasto}>Registrar Gasto</button>
</div>
  <Collection path={'GASTOS'} {query} let:data let:first let:last>
    <div style="padding: 2rem;">
      <div class="table-container">
        <table class="table-body">

          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Total</th>
          </tr>
          {#each data as fact}
          <tr>
            <td>{fact.fecha}</td>
            <td>{fact.nombre}</td>
            <td style="text-align: right; padding-right: 1rem;">Bs. {parseFloat(fact.total).toFixed(2)}</td>
          </tr>
          {/each}
        </table>

        <div class="table-footer">
          <!-- No implementable??  revirsar p style="margin-left: 2rem;">## de ### </p-->

          <button style="margin-left: auto;" class="footer-button" on:click={firstPage}>
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
          <button class="footer-button" style="margin-right: 2rem;" on:click={lastPage}>
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
