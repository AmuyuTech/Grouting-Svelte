<script>
import { onMount } from "svelte";
import { getVenta } from "../firebaseAPI";


  export let params = {};
  let data = {}
  onMount(() => {
      getVenta(params.id).then(snp => {
        data = snp.data()
      })
  })
</script>
<div class="row">
    <p>Numero: {data.numero}</p>
    <p style="margin-left: auto; margin-right: 1rem;">Fecha: {data.fecha}</p>
</div>
<div class="row">
    <p>Asesor: {data.asesor}</p>
    <p style="margin-left: auto; margin-right: 1rem;">Cliente: {data.cliente}</p>
</div>
<p>Items</p>
{#each data.items as item}
    <div class="row">
        <p>{item.cantidad}</p>
        <p>{item.nombre}</p>
        <p style="margin-left: auto;">Bs. {item.precio.toFixed(2)}</p>
        <p>Bs. {item.descuento.toFixed(2)}</p>
        <p>Bs. {((item.precio * item.cantidad) - item.descuento).toFixed(2)}</p>
    </div>
{/each}
<p style="margin-left: auto;">Descuento: {data.decuento}</p>
<p>Observaciones: {data.observaciones}</p>