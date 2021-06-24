<script>
	import { Productos } from './../stores.js';
  import {push} from 'svelte-spa-router'
import { GenerarCatalogo, GenerarStocks } from '../firebaseAPI.js';
import {getCatalogo, getStocks} from '../pdfUtils.js'
  let Data = []
  let filterdedData = []
  Productos.subscribe(productos$ =>  {
    Data = productos$
    filterdedData = Data
  })
  let search = ""
  function filterData() {
    const s  = search.trim().toLowerCase()
    filterdedData = s.length === 0 ? Data : Data.filter(p => p.nombre.toLowerCase().includes(s));
  }
  function newProd() {
    push('/Productos/New')
  }
  function catalogo() {
    GenerarCatalogo().then(d => getCatalogo(d.data.payload))
  }
  function stocks() {
    GenerarStocks().then(d => getStocks(d.data.payload))
  }
</script>

<div class="header-row">
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="warehouse-alt" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                     class="svg-inline--fa fa-warehouse-alt fa-w-20 fa-5x" style="font-size: 3rem;">
                    <g class="fa-group">
                        <path fill="currentColor"
                              d="M304 416H144a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-128H144a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm192 128H368a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16z"
                              class="fa-secondary"></path>
                        <path fill="currentColor"
                              d="M640 161.28V504a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8V208a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v296a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V161.28A48.11 48.11 0 0 1 29.5 117l272-113.3a48.06 48.06 0 0 1 36.9 0L610.5 117a48.11 48.11 0 0 1 29.5 44.28z"
                              class="fa-primary"></path>
                    </g>
                </svg>
  <h1 style="margin-left: 1rem;">Productos</h1>
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

  <button class="button" on:click={stocks}>Reporte de Stock</button>
  <button class="button" on:click={catalogo}>Catalogo</button>
  <button class="button" style="margin-left: auto;" on:click={newProd}>Registrar Producto</button>
</div>

<div class="grid">
  {#each filterdedData as p}
    
 
  <div class="cardContainer" on:click={push(`/Productos/${p.id}`)}>
    <div class="card front">
      <div
        class="img"
        style="background-image: url({p.photourl});"></div>
      <div class="info">
        <p>
          {p.nombre}
        </p>
      </div>
    </div>
  </div>
  {/each}
</div>

<style>
  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: scale(0.3);
      filter: hue-rotate(180deg);
    }
    to {
      opacity: 1;
      transform: scale(1);
      filter: hue-rotate(0deg);
    }
  }

  .cardContainer {
    animation: cardEntrance 600ms ease-out;
    animation-fill-mode: backwards;
    width: 100%;
    height: auto;
  }

  .card {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 5px;
    background-color: white;
  }

  .card:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
      rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.05);
  }

  .card .info {
    padding: 16px;
  }

  .front .img {
    background-color: #dadce2;
    background-position: center;
    background-size: cover;
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 15vw;
  }
  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  :global(.input-container) {
    position: relative;
    height: auto;
    width: auto;
  }
  :global(.input-icon) {
    position: absolute;
    top: 25%;
    left: 1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  :global(.input-container svg) {
    display: inline-block;
    height: 1em;
    font-size: 1rem;
  }

  :global(.input-container input) {
    width: 15rem;
    padding-left: 3rem;
    margin: 0;
  }
  :global(.controls-row) {
    display: inline-flex; gap: 1rem; margin-bottom: 2rem; width: 100%; flex-wrap: wrap;
  }

  :global(.controls-row button) {
    width: auto;
    min-width: 10rem;
    margin: 0;
  }
  :global(.header-row) {
    display: flex; 
    align-items: center;
  }
  :global(.header-row svg) {
    font-size: 3rem;
    height: 3rem;
    width: 3rem;
  }
</style>
