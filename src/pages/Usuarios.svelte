<script>
  import { push } from "svelte-spa-router";
  import {
    BucketUsuarios,
    getAlmacenes,
    UsuarioQuery,
  } from "../controller/firebaseAPI";
  import { onMount } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";
  import { roles} from "../models/usuario";
  let usuariosB = [];
  let almacenesB = [];
  let UsuariosInterface = new UsuarioQuery();
  let rol = "";
  let store = "";
  const update = () => {
    UsuariosInterface = UsuariosInterface;
  };
  onMount(() => {
    BucketUsuarios.subscribe((s) => {
      usuariosB = s;
    });
    getAlmacenes().subscribe((d) => {
      almacenesB = d;
    });
    UsuariosInterface.getFirstPage(store, rol).then(update);
  });
  const onSelect = (d = {id: ''}) => {
    if(d && d.id !== '') {
      viewUser(d.id);
    }
  };

  function register() {
    push("/Usuarios/New");
  }

  function nextPage() {
    UsuariosInterface.getNextPage(store, rol).then(update);
  }

  function prevPage() {
    UsuariosInterface.getPrevPage(store, rol).then(update);
  }
  function firstPage() {
    UsuariosInterface.getFirstPage(store, rol).then(update);
  }
  function lastPage() {
    UsuariosInterface.getLastPage(store, rol).then(update);
  }
  function viewUser(id$) {
    if(id$) {
      push(`/Usuarios/${id$}`);
    }
  }
</script>

<div class="header-row">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="users-crown"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    class="svg-inline--fa fa-users-crown fa-w-20 fa-5x"
  >
    <g class="fa-group">
      <path
        fill="currentColor"
        d="M96 224a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm448 0a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm32 32h-64a63.78 63.78 0 0 0-45.07 18.59A146.54 146.54 0 0 1 542.06 384H608a32 32 0 0 0 32-32v-32a64 64 0 0 0-64-64zm-512 0a64 64 0 0 0-64 64v32a32 32 0 0 0 32 32h65.94a146.54 146.54 0 0 1 75.13-109.41A63.78 63.78 0 0 0 128 256zM320 32l-48 24-48-24v80h192V32l-48 24z"
        class="fa-secondary"
      />
      <path
        fill="currentColor"
        d="M320 256a96 96 0 0 0 96-96v-16H224v16a96 96 0 0 0 96 96zm76.8 32h-8.31c-20.84 10-43.89 16-68.49 16s-47.64-6-68.49-16h-8.31A115.2 115.2 0 0 0 128 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.2 115.2 0 0 0 396.8 288z"
        class="fa-primary"
      />
    </g>
  </svg>
  <h1 style="margin-left: 1rem;">Usuarios</h1>
</div>
<div class="controls-row">
  <AutoComplete
    items={usuariosB}
    labelFieldName="name"
    onChange={onSelect}
    placeholder="Buscar..."
  />
  <AutoComplete
    items={almacenesB}
    labelFieldName="name"
    labelFieldValue="id"
    bind:value={store}
    placeholder="Almacen"
    onChange={firstPage}
  />
  <AutoComplete items={roles} bind:value={rol} onChange={firstPage} placeholder="Rol"/>
  <button class="button" style="margin-left: auto;" on:click={register}
    >Registrar Usuario</button
  >
</div>
<div style="padding: 2rem;">
  <div class="table-container">
    <table class="table-body">
      <tr>
        <th>CI</th>
        <th>Nombre</th>
        <th>Almacen</th>
        <th>Telefono</th>
      </tr>
      {#each UsuariosInterface.data as usr}
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
      <button class="footer-button" on:click={prevPage}>
        <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
          ><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg
        >
      </button>
      <button class="footer-button" on:click={nextPage}>
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
