<script>
	import { Usuarios } from './../stores.js';
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
  function onSortDate(event) {
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
</script>

<div class="header-row">
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="exchange-alt" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
  class="svg-inline--fa fa-exchange-alt fa-w-16 fa-7x">
 <g class="fa-group">
     <path fill="currentColor"
           d="M128 272v48h360a24 24 0 0 1 24 24v16a24 24 0 0 1-24 24H128v48c0 21.44-25.94 32-41 17L7 369a24 24 0 0 1 0-33.94l80-80c15.14-15.12 41-4.35 41 16.94z"
           class="fa-secondary"></path>
     <path fill="currentColor"
           d="M505 143.05a24 24 0 0 1 0 33.95l-80 80c-15 15-41 4.49-41-17v-48H24a24 24 0 0 1-24-24v-16a24 24 0 0 1 24-24h360V80c0-21.36 25.9-32 41-17z"
           class="fa-primary"></path>
 </g>
</svg>
    <h1 style="margin-left: 1rem;">Almacenes</h1>
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
    <button class="button"style="margin-left: auto;">Registrar Producto</button>
  </div>
  <Table {page} {pageSize} rows={Data} let:rows={rows2} text={search}>
    <thead slot="head">
      <tr>
        <th>
          Fecha
          <Sort key="fecha" on:sort={onSortDate} />
        </th>
        <th>
          Usuario
          <Sort key="usuario" on:sort={onSortString} />
        </th>
        <th>
          Origen
          <Sort key="origen" on:sort={onSortString} />
        </th>
        <th>
          Destino
          <Sort key="destino" on:sort={onSortString} />
        </th>
      </tr>
    </thead>
    <tbody>
      {#each rows2 as row, index (row)}
        <tr {index} on:click={() => onCellClick(row)}>
          <td data-label="Fecha">{row.fecha}</td>
          <td data-label="Usuario">{row.usuario}</td>
          <td data-label="Origen">{row.origen}</td>
          <td data-label="DEstino">{row.destino}</td>
        </tr>
      {/each}
    </tbody>
  </Table>
  