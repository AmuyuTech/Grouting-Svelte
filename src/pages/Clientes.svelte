<script>
	import { Clientes } from './../stores.js';
  import DataTable from './../components/Datatable/src/Datatable.svelte'
import Datatable from './../components/Datatable/src/Datatable.svelte';
import { data, rows } from '../components/Datatable/src/stores/data.js';
  let search = "";
  let rowsPerPage = 10;
  let currentPage = 0;
  let items = [];
 
  let Data = []
  Clientes.subscribe(clientes$ =>  {
    Data = clientes$
    items = Data
  })
  const settings = {
    sortable: true,
    pagination: true,
    scrollY: true,
    rowsPerPage: 10,
    columnFilter: false,
    css: true,
    labels: {
        search: 'Search...',    // search input placeholer
        filter: 'Filter',       // filter inputs placeholder
        noRows: 'Vacio',
        info: 'Mostrando {start} a {end} de {rows} filas',
        previous: 'Anterior',
        next: 'Siguiente',       
    },
    blocks: {
        searchInput: false, 
        paginationButtons: true,
        paginationRowCount: true,
    }
}    
  
  function filterData() {}
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
      bind:value={search}
      on:keyup={filterData}
      class="input text-input"
      placeholder="Buscar..."
    />
  </div>

  <button>Reporte de Stock</button>
  <button>Catalogo</button>
  <button class="button"style="margin-left: auto;">Registrar Producto</button>
</div>


  <Datatable settings={settings} data={Data} s={search}>
    <thead>
      <th data-key="nit">CI/NIT</th>
      <th data-key="nombre">Nombre</th>
      <th data-key="telefono">Telefono</th>
  </thead>
  <tbody>
      {#each $rows as row}
      <tr>
          <td>{row.nit}</td>
          <td>{row.nombre}</td>
          <td>{row.telefono}</td>
      </tr>
      {/each}
  </tbody>
  </Datatable>

<style>
  

</style>