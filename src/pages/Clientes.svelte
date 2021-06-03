<script>
	import { Clientes } from './../stores.js';
  
  import Sort from "./../components/Tabla/Sort.svelte";
  
  import Table from "./../components/Tabla/Table.svelte";
  import { sortNumber, sortString } from "./../components/Tabla/sorting";
  let search = "";
  let items = [];
 
  let Data = []
  Clientes.subscribe(clientes$ =>  {
    Data = clientes$
    items = Data
  })


  let page = 0;
  let pageSize = 10; 

  function onCellClick(row) {
  }

  function onSortString(event) {
    event.detail.rows = sortString(
      event.detail.rows,
      event.detail.dir,
      event.detail.key
    );
  }

  function onSortNumber(event) {
    event.detail.rows = sortNumber(
      event.detail.rows,
      event.detail.dir,
      event.detail.key
    );
  }
  function filterData(){
    const s = search.trim().toLowerCase()
    if(s.length >  0){
      Data = items.filter(v => {
        return Object.values(v).toString().toLowerCase().indexOf(s) !== -1
      })
    }else {
      Data = items
    }
    
  }
  function newCliente(){
    push('/Clientes/New')
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
      bind:value={search}
      on:keyup={filterData}
      class="input text-input"
      placeholder="Buscar..."
    />
  </div>
  <button class="button"style="margin-left: auto;" on:click={newCliente}>Registrar Cliente</button>
</div>


<Table {page} {pageSize} rows={Data} let:rows={rows2} text={search}>
  <thead slot="head">
    <tr>
      <th>
        NIT
        <Sort key="nit" on:sort={onSortString} />
      </th>
      <th>
        Nombre
        <Sort key="nombre" on:sort={onSortString} />
      </th>
      <th>
        Telefono
        <Sort key="nit" on:sort={onSortNumber} />
      </th>
    </tr>
  </thead>
  <tbody>
    {#each rows2 as row, index (row)}
      <tr {index} on:click={() => onCellClick(row)}>
        <td data-label="Name">{row.nit}</td>
        <td data-label="Lastname">{row.nombre}</td>
        <td data-label="Age">{row.telefono}</td>
      </tr>
    {/each}
  </tbody>
</Table>

<style>
  

</style>