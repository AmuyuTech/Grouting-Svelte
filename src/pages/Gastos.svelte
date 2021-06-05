<script>
    let search = ''
    function filterData(){}
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