<script>
	import Ventas from './Ventas.svelte';
    let search = ''
    function filterData(){}
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
  
    <button>Reporte de Stock</button>
    <button>Catalogo</button>
    <button class="button"style="margin-left: auto;">Registrar Producto</button>
  </div>