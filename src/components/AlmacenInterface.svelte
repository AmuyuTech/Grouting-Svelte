<script>
    import AutoComplete from 'simple-svelte-autocomplete'
    import { getContext } from 'svelte';
    import { getAlmacenes, registrarAlmacen, actualizarAlmacen } from '../controller/firebaseAPI';

    let almacenes = []
      // generamos un id unico para un nuevo almacen en base a un nuemro aleatorio
      const uuid = Math.random().toString(36).substr(2,8)
      getAlmacenes().subscribe((c) => {almacenes = [{name: "Nuevo Almacen", id: uuid}, ...c]})
      export let cat = {}
    const { close } = getContext('simple-modal');
    function _onCancel() {
        close()
    }
    function _onOk(){
        let pr = (cat.id === uuid) ? registrarAlmacen(cat.name) : actualizarAlmacen(cat.id, cat.name)
        pr.then(() =>  {
            close()
          })
    }
</script>
<h2>
    Administrar Almacenes
</h2>
<div style="margin-bottom: 2rem;">
    Seleccione Almacen
    <AutoComplete
            items={almacenes}
        labelFieldName="name"
            bind:selectedItem={cat}
    />
</div>
<div>
    <label>
        Nuevo Almacen
        <input type="text" bind:value={cat.name}>
    </label>
</div>
<div class="row">
    <button class="button" on:click={_onCancel} style="width: auto; justify-self: start">Cancelar</button>
    <button class="button" on:click={_onOk} style="width: auto; margin-left: auto; margin-right: 1rem">Aceptar</button>
</div>
