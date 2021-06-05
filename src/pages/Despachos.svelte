<script>
    let search = ''
    function filterData(){}
</script>

<div class="header-row">
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="truck-loading" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
  class="svg-inline--fa fa-truck-loading fa-w-20 fa-5x">
 <g class="fa-group">
     <path fill="currentColor"
           d="M247.8 123.8a16 16 0 0 0-19.6-11.3L151 133.3l24.8 92.7-61.8 16.5-24.8-92.7-77.3 20.7A16 16 0 0 0 .6 190.1l49.6 185.5a16 16 0 0 0 19.6 11.3l216.4-58a16 16 0 0 0 11.3-19.6zM544 320a96 96 0 1 0 96 96 96 96 0 0 0-96-96z"
           class="fa-secondary"></path>
     <path fill="currentColor"
           d="M384 0a32 32 0 0 0-32 32v323.6L5.9 450a8 8 0 0 0-5.6 9.8l12.6 46.3a8 8 0 0 0 9.8 5.6l393.7-107.4c0 .33 0 .66.05 1C421.91 339.7 477 288 544 288a127.71 127.71 0 0 1 96 43.44V0zM175.8 226L151 133.3l-61.8 16.5 24.8 92.7z"
           class="fa-primary"></path>
 </g>
</svg>
    <h1 style="margin-left: 1rem;">Despachos</h1>
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