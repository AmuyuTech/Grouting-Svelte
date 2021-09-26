<script>
    import {registrarAlmacen} from "../firebaseAPI";

    let isNew = true
    let nombre = ""
    let direccion = ""
function _onCancel() {

}
function _onOk() {
    registrarAlmacen({nombre, direccion})
}
</script>
<h1>{isNew ? "Nuevo Almacen" : "Editar Almacen"}</h1>
<label>
    Nombre
    <input type="text" bind:value={nombre}>
</label>
<label>
    Direccion
    <textarea name="address" id="address" cols="3" bind:value={direccion}></textarea>
</label>
<div class="row">
    <button class="button" on:click={_onCancel} style="width: auto; justify-self: start">Cancelar</button>
    <button class="button" on:click={_onOk} style="width: auto; margin-left: auto; margin-right: 1rem">Aceptar</button>
</div>
<style>

</style>