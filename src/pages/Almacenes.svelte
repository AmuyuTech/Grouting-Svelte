<script>
  import { push } from "svelte-spa-router";
  import Datepicker from "../components/Datepicker/Datepicker.svelte";
  import { getContext, onMount } from "svelte";
  import AlmacenInterface from "../components/AlmacenInterface.svelte";
  import { BucketUsuarios, TransaccionQuery } from "../controller/firebaseAPI";
  import AutoComplete from "simple-svelte-autocomplete";
  const { open } = getContext("simple-modal");

  let TransaccionInterface = new TransaccionQuery();

  let desde = new Date();

  let hasta = new Date();

  let locale = window.navigator.userLanguage || window.navigator.language;

  let usuario = {};

  let usuarios = [];
  onMount(() => {
    TransaccionInterface.getFirstPage(desde, hasta, usuario).then((s) => {
      TransaccionInterface = TransaccionInterface;
    });

    BucketUsuarios.subscribe((s) => {
      usuarios = [{name: 'Todos', id: null}, ...s];
    });
  });

  const openStoreManager = () => {
    open(AlmacenInterface, {});
  };

  const ondesdeChange = (d) => {
    desde = d.detail;
    TransaccionInterface.getFirstPage(desde, hasta, usuario).then(() => {
      TransaccionInterface = TransaccionInterface;
    });
  };
  const onhastaChange = (d) => {
    hasta = d.detail;
    TransaccionInterface.getFirstPage(desde, hasta, usuario).then(() => {
      TransaccionInterface = TransaccionInterface;
    });
  };
  const onUserChange = (u) => {
    usuario = u;
    TransaccionInterface.getFirstPage(desde, hasta, usuario).then(() => {
      TransaccionInterface = TransaccionInterface;
    });
  };

  function beforeToday(date$) {
    return date$.getTime() + 25 * 36000000 <= Date.now();
  }

  const firstPage = () => {
    TransaccionInterface.getFirstPage(desde, hasta, usuario).then((s) => {
      TransaccionInterface = TransaccionInterface;
    });
  };
  const lastPage = () => {
    TransaccionInterface.getLastPage(desde, hasta, usuario).then((s) => {
      TransaccionInterface = TransaccionInterface;
    });
  };
  const nextPage = () => {
    TransaccionInterface.getNextPage(desde, hasta, usuario).then((s) => {
      TransaccionInterface = TransaccionInterface;
    });
  };
  const prevPage = () => {
    TransaccionInterface.getPrevPage(desde, hasta, usuario).then((s) => {
      TransaccionInterface = TransaccionInterface;
    });
  };
</script>

<div class="header-row">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="exchange-alt"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="svg-inline--fa fa-exchange-alt fa-w-16 fa-7x"
  >
    <g class="fa-group">
      <path
        fill="currentColor"
        d="M128 272v48h360a24 24 0 0 1 24 24v16a24 24 0 0 1-24 24H128v48c0 21.44-25.94 32-41 17L7 369a24 24 0 0 1 0-33.94l80-80c15.14-15.12 41-4.35 41 16.94z"
        class="fa-secondary"
      />
      <path
        fill="currentColor"
        d="M505 143.05a24 24 0 0 1 0 33.95l-80 80c-15 15-41 4.49-41-17v-48H24a24 24 0 0 1-24-24v-16a24 24 0 0 1 24-24h360V80c0-21.36 25.9-32 41-17z"
        class="fa-primary"
      />
    </g>
  </svg>
  <h1 style="margin-left: 1rem;">Almacenes</h1>
</div>
<div class="controls-row">
  <Datepicker
    on:datechange={ondesdeChange}
    selected={desde}
    label={"Desde"}
    isAllowed={beforeToday}
  />
  <Datepicker
    on:datechange={onhastaChange}
    selected={hasta}
    label={"Hasta"}
    isAllowed={beforeToday}
  />
  <label>
    Usuario
    <AutoComplete
      items={usuarios}
      bind:value={usuario}
      labelFieldName="name"
      name="user"
      onChange={onUserChange}
    />
  </label>
  <button class="button" on:click={openStoreManager}>
    Administrar Almacenes
  </button>
  <button
    class="button"
    style="margin-left: auto;"
    on:click={() => {
      push("/Almacenes/New");
    }}>Registrar Transaccion</button
  >
</div>
<!------------------------------------------------------------------------------>
<div style="padding: 2rem;">
  <div class="table-container">
    <table class="table-body">
      <tr>
        <th>Fecha</th>
        <th>Nombre</th>
        <th>Origen</th>
        <th>Destino</th>
      </tr>
      {#each TransaccionInterface.data as tr}
        <tr>
          <td>{new Date(tr.date).toLocaleString(locale)}</td>
          <td>{tr.name}</td>
          <td>{tr.origin}</td>
          <td>{tr.destiny}</td>
        </tr>
      {/each}
    </table>

    <div class="table-footer">
      <!-- No implementable??  revirsar p style="margin-left: 2rem;">## de ### </p-->

      <button
        style="margin-left: auto;"
        class="footer-button"
        on:click={firstPage}
      >
        <svg viewBox="0 0 24 24" focusable="false" class="footer-icon"
          ><path
            d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
          /></svg
        >
      </button>
      <button class="footer-button" on:click={prevPage}>
        <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
          ><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg
        >
      </button>
      <button class="footer-button" on:click={nextPage}>
        <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
          ><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg
        >
      </button>
      <button
        class="footer-button"
        style="margin-right: 2rem;"
        on:click={lastPage}
      >
        <svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
          ><path
            d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
          /></svg
        >
      </button>
    </div>
  </div>
</div>

<!------------------------------------------------------------------------------------->
<style>
  .table-container {
    border-radius: 1rem;
    overflow: hidden;
    overflow-x: auto;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
    width: 100%;
  }

  table {
    border-collapse: collapse;

    width: 100%;
  }

  th {
    font-family: Lato-Bold, sans-serif;
    font-size: 18px;
    color: #fff;
    line-height: 1.4;
    background-color: #6c7ae0;
  }

  tr:nth-child(even) {
    background-color: #f8f6ff;
  }

  td {
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  th {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .table-footer {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }

  .footer-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: transparent;
    border-color: transparent;
  }
</style>
