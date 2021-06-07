<script>

import { auth, registrarGasto } from "../firebaseAPI";
  import {pop, replace} from 'svelte-spa-router'
  const _ = require('lodash')

  let username = auth.currentUser.displayName
  let fecha = new Date()
  let items = []

  function aceptar() {
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });
    registrarGasto({
      fecha,
      nombre: username,
      items,
      total: items.reduce((a, b)=> a.costo + b.costo, 0)
    }).then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace('/Productos');
      },
      (e) => {
        toast.pop();
        console.error(e);
        toast.push("Error! porfavor intente de nuevo", {
          theme: {
            "--toastBackground": "#F56565",
            "--toastProgressBackground": "#C53030",
          },
        });
      }
    );
    
  }
  function cancelar() {
    pop()
  }
  
  function addItem() {
    items.push({
      nombre: '',
      cantidad: 0,
      costo: 0
    })
  }
</script>
<h1>Registrar Gastos</h1>
<div class="row" style="widt: 100%;">
  <p>Usuario: {username}</p>
  <p style="margin-left: auto;">Fecha: {fecha}</p>
</div>
<div class="row" style="width: 100%;">
  <h3>Gastos</h3>
  <button class="button" style="width: auto;">Añadir Gasto</button>
</div>
{#each items as item}
  <div class="row" style="width: 100%;"> 
    <label>
      Nombre
      <input type="text" bind:value={item.nombre}>
    </label>
    <label>
      Cantidad
      <input type="text" bind:value={item.cantidad}>
    </label>
    <label>
      Costo
      <input type="text" bind:value={item.costo}>
    </label>
  </div>
{/each}
<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button class="button" style="margin-left: auto;" on:click={aceptar}
    >Aceptar</button
  >
  <button class="button" on:click={cancelar}>Cancelar</button>
</div>
