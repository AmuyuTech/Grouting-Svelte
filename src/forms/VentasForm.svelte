<script>
import { onMount } from "svelte";
import { getVenta } from "../firebaseAPI";


  export let params = {};
  onMount(() => {
      getVenta
  })
</script>
