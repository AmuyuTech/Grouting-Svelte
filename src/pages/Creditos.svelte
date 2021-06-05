<script>
    let search = ''
    function filterData(){}
</script>

<div class="header-row">
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="receipt" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
  class="svg-inline--fa fa-receipt fa-w-12 fa-5x">
 <g class="fa-group">
     <path fill="currentColor"
           d="M358.4 3.23L320 48 265.6 3.23a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.23a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.23A16 16 0 0 0 0 16v480a16 16 0 0 0 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8A16 16 0 0 0 384 496V16a16 16 0 0 0-25.6-12.77zM320 360a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h240a8 8 0 0 1 8 8zm0-96a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h240a8 8 0 0 1 8 8zm0-96a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h240a8 8 0 0 1 8 8z"
           class="fa-secondary"></path>
     <path fill="currentColor"
           d="M312 144H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 96H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 96H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"
           class="fa-primary"></path>
 </g>
</svg>
    <h1 style="margin-left: 1rem;">Creditos</h1>
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