<script>
  import AutoComplete from "simple-svelte-autocomplete";
  import { getContext, onDestroy, onMount } from "svelte";
  import { GenerarReporte } from "../firebaseAPI.js";
  import { Clientes, Usuarios } from "../stores.js";
  import { pdf_venta } from "../pdfUtils.js";
  import { isValidDate } from "../util.js";
  import { toast } from "@zerodevx/svelte-toast";

  const { close } = getContext("simple-modal");
  export let sw = false;
  export let nombre = "";
  let ll, dd;
  let clientesB = [];
  let usuariosB = [];
  onMount(() => {
    ll = Clientes.subscribe((d) => (clientesB = d));
    dd = Usuarios.subscribe((d) => (usuariosB = d));
  });
  onDestroy(() => {
    ll();
    dd();
  });

  let clienteId = "";
  let usuarioId = "";
  let desde = "";
  let hasta = "";
  const aceptar = async () => {
    if (!isValidDate(desde) || !isValidDate(hasta)) {
      toast.push("ingrese las fechas en formas yyyy/mm/dd");
      console.log("invalida Date", { desde, hasta });
      return;
    }
    await GenerarReporte({
      desde,
      hasta,
      asesor: usuarioId,
      cliente: clienteId,
    }).then((d) => pdf_venta(d.data.payload));
    close();
  };
  const cancelar = () => {
    close();
  };
</script>

<h1>Generar Reporte de {nombre}</h1>
{#if sw}
  <p>Cliente</p>
  <AutoComplete
    items={clientesB}
    bind:value={clienteId}
    labelFieldName={"nombre"}
    valueFieldName={"nit"}
    name={"Cliente"}
  />
  <br />
  <p>Asesor</p>
  <AutoComplete
    items={usuariosB}
    bind:value={usuarioId}
    labelFieldName={"nombre"}
    valueFieldName={"id"}
    name={"Asesor"}
  />
  <br />
{/if}
<label>
  Desde
  <input type="text" bind:value={desde} placeholder="aaaa/mm/dd" />
</label>
<br />
<label>
  Hasta
  <input type="text" bind:value={hasta} placeholder="aaaa/mm/dd" />
</label>

<div class="row">
  <button
    class="button"
    style="margin-left: auto; width: auto;"
    on:click={aceptar}>Cancelar</button
  >
  <button
    class="button"
    style="margin-left: 1rem; width: auto;"
    on:click={cancelar}>Aceptar</button
  >
</div>
