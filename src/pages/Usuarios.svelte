<script>
	import Usuarios from './Usuarios.svelte';
  import { Collection } from "sveltefire"
import { push } from "svelte-spa-router";
import { UsuarioColection } from '../controller/firebaseConst';
    let search = ''
    function filterData(){}
let pagesize = 10
function register() {
  push('/Usuarios/New')
}
function getQuery(ref$) {
  return ref$
}
let query = ref => getQuery(ref).orderBy('name', 'desc').limit(pagesize)

function nextPage(last$) {
    query = ref => getQuery(ref).orderBy('name', 'desc').startAfter(last$['name']).limit(pagesize)
}

function prevPAge(first$) {
    query = ref => getQuery(ref).orderBy('name', 'desc').endBefore(first$['name']).limitToLast(pagesize)
}
function firstPage() {
  query = ref => getQuery(ref).orderBy('name', 'desc').limit(pagesize)
}
function lastPage() {
  query = ref => getQuery(ref).orderBy('name', 'desc').limitToLast(pagesize)
}
function viewUser(id$) {
  push(`/Usuarios/${id$}`)
}
</script>

<div class="header-row">
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="users-crown" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                     class="svg-inline--fa fa-users-crown fa-w-20 fa-5x">
                    <g class="fa-group">
                        <path fill="currentColor"
                              d="M96 224a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm448 0a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm32 32h-64a63.78 63.78 0 0 0-45.07 18.59A146.54 146.54 0 0 1 542.06 384H608a32 32 0 0 0 32-32v-32a64 64 0 0 0-64-64zm-512 0a64 64 0 0 0-64 64v32a32 32 0 0 0 32 32h65.94a146.54 146.54 0 0 1 75.13-109.41A63.78 63.78 0 0 0 128 256zM320 32l-48 24-48-24v80h192V32l-48 24z"
                              class="fa-secondary"></path>
                        <path fill="currentColor"
                              d="M320 256a96 96 0 0 0 96-96v-16H224v16a96 96 0 0 0 96 96zm76.8 32h-8.31c-20.84 10-43.89 16-68.49 16s-47.64-6-68.49-16h-8.31A115.2 115.2 0 0 0 128 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.2 115.2 0 0 0 396.8 288z"
                              class="fa-primary"></path>
                    </g>
                </svg>
  <h1 style="margin-left: 1rem;">Usuarios</h1>
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
    <input  bind:value={search} on:keyup={filterData} class="text-input input" placeholder="Buscar...">
  </div>
  <button class="button"style="margin-left: auto;" on:click={register}>Registrar Usuario</button>
</div>
<Collection path={UsuarioColection} {query} let:data let:first let:last>
    <div style="padding: 2rem;">
      <div class="table-container">
        <table class="table-body">
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Almacen</th>
            <th>Telefono</th>
          </tr>
          {#each data as usr}
          <tr on:click={() => viewUser(usr.id)}>
            <td>{usr.dni}</td>
            <td>{usr.name}</td>
            <td>{usr.store.name}</td>
            <td>{usr.phone}</td>
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
  
