<script>
    import AutoComplete from 'simple-svelte-autocomplete'
    import { getContext } from 'svelte';
    import {Categorias} from "../stores";
    let categorias = []
    Categorias.subscribe(c => categorias = c)
    export let cat = ''
    export let onOk = () => {}
    const { close } = getContext('simple-modal');
    function _onCancel() {
        close()
    }
    function _onOk(){
        onOk(cat)
        close()
    }
</script>
<div style="margin-bottom: 2rem;">
    Seleccione categoria
    <AutoComplete
            items={categorias}
            bind:selectedItem={cat}
    />
</div>
<div>
    <label>
        Nueva Categoria
        <input type="text" bind:value={cat}>
    </label>
</div>
<div class="row">
    <button class="button" on:click={_onCancel} style="width: auto; justify-self: start">Cancelar</button>
    <button class="button" on:click={_onOk} style="width: auto; margin-left: auto; margin-right: 1rem">Aceptar</button>
</div>
