<script>
  let nombre = ''
  let origen = 'elalto'
  let destino = 'elalto'
  let items = []
</script>
<h1>Registro de Transaaccion</h1>
<div class="row">
  <p style="margin-left: 2rem;">Usuario: {nombre}</p>
  <p style="margin-right: auto; margin-left: 2rem;">Fecha: {(new Date()).toLocaleString('es-BO')}</p>
</div>
<div class="row">
  <div class="box">
    <label>
      Origen
      <select bind:value={origen}>
        <option value={'elalto'}>El Alto</option>
        <option value={'sopocachi'}>Sopocachi</option>
        <option value={'zonasur'}>Zona Sur</option>
      </select>
    </label>
    <label>
      Destino 
      <select bind:value={destino}>
        <option value={'elalto'}>El Alto</option>
        <option value={'sopocachi'}>Sopocachi</option>
        <option value={'zonasur'}>Zona Sur</option>
      </select>
    </label>
  </div>
</div>
<div class="row">
  <h3>Items</h3>
  <button class="button" on:click={addItem}>Agregar Item</button>
</div>
{#each items as item}
  <div class="row">
    <label>
      Nombre
      <input type="text" bind:value={items.nombre}>
    </label>
  </div>
{/each}
<div class="row" style="width: 100%; right: 0; bottom: 0;">
    <button
      class="button"
      style="margin-left: auto;"
      on:click={aceptar}>Aceptar</button
    >
    <button class="button" on:click={cancelar}>Cancelar</button>
  </div>
  
  <style>
    .line {
      display: inline-flex;
    }
    .box {
      flex-grow: 1
    }

    </style>