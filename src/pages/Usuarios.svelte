<script>
	import Usuarios from './Usuarios.svelte';
    let search = ''
    function filterData(){}
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

  <button>Reporte de Stock</button>
  <button>Catalogo</button>
  <button class="button"style="margin-left: auto;">Registrar Producto</button>
</div>