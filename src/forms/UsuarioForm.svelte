<script>
  import { Usuario, roles } from "../models/usuario";
  import { onMount } from "svelte";
  import {
    getUsuario,
    registrarUsuario,
    actualizarUsuario,
    getAlmacenes, User,
  } from "../controller/firebaseAPI";
  import AutoComplete from "simple-svelte-autocomplete";
  import { replace, pop } from "svelte-spa-router";
  import { toast } from "@zerodevx/svelte-toast";

  export let params = {};
  let disable = false;
  let payload = new Usuario();
  const is_new = params.id === "New";
  let almacenes = [];
  let repass = "";
  getAlmacenes().subscribe((s) => {
    almacenes = s;
  });

  onMount(() => {
    if (params.id !== "New") {
      disable = true;
      getUsuario(params.id).then((s) => {
        payload = s;
      });
    }
  });
  function aceptar() {
    if (payload.pass !== repass) {
      toast.push("Error las  contrasenas no coiciden", {
        theme: {
          "--toastBackground": "#F56565",
          "--toastProgressBackground": "#C53030",
        },
      });
        return
    }
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });
    const promise = is_new
      ? registrarUsuario(payload)
      : actualizarUsuario(payload, params.id);
    promise.then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace("/Usuarios");
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
    pop();
  }
</script>

<h1>{is_new ? "Nuevo Usuario" : "Editar Usuario"}</h1>
<div class="gridd">
  <div class="nombre input-containerd">
    <label for="nombre">Nombre</label>
    <input
      type="text"
      bind:value={payload.name}
      name="nombre"
      disabled={!is_new}
    />
  </div>
  <div class="ci input-containerd">
    <label for="ci">CI</label>
    <input type="text" bind:value={payload.dni} name="ci" disabled={disable} />
  </div>
  <div class="telefono input-containerd">
    <label for="telefono">Telefono</label>
    <input type="text" bind:value={payload.phone} name="telefono" />
  </div>
  <div class="correo input-containerd">
    <label for="correo">Correo</label>
    <input type="email" name="correo" bind:value={payload.mail} />
  </div>
  <div class="pass input-containerd">
    <label for="pass">{disable ? "Nueva " : ""}Contraseña</label>
    <input type="password" name="pass" bind:value={payload.pass} />
  </div>
  <div class="repass input-containerd">
    <label for="repass">Repita {disable ? "Nueva " : ""}Contraseña</label>
    <input type="password" name="repass" bind:value={repass} />
  </div>
  <div class="almacen input-containerd">
    <label for="almacen"> Almacen </label>
    <AutoComplete
      items={almacenes}
      labelFieldName="name"
      valueFieldName="id"
      bind:selectedItem={payload.store}
      name="almacen"
    />
    <label for="permisos">Permisos</label>
    <AutoComplete
      items={roles}
      bind:selectedItem={payload.role}
      name={"permisos"}
    />
  </div>
</div>
<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button
    class="button"
    style="margin-left: auto; width: auto;"
    on:click={aceptar}>Aceptar</button
  >
  <button
    class="button"
    style="width: auto; margin-left: 1rem;"
    on:click={cancelar}>Cancelar</button
  >
</div>

<style>
  .gridd {
    display: grid;
  }
  @media only screen and (max-width: 600px) {
    .gridd {
      grid-template-columns: 1fr;
      grid-template-areas:
        "ci"
        "nombre"
        "correo"
        "telefono"
        "almacen"
        "pass"
        "repass";
    }
  }
  @media only screen and (min-width: 600px) {
    .gridd {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        "nombre nombre ci"
        "correo correo telefono"
        "pass pass almacen"
        "repass repass almacen";
    }
  }
  .nombre {
    grid-area: nombre;
  }
  .ci {
    grid-area: ci;
  }
  .correo {
    grid-area: correo;
  }
  .telefono {
    grid-area: telefono;
  }
  .pass {
    grid-area: pass;
  }
  .repass {
    grid-area: repass;
  }
  .almacen {
    grid-area: almacen;
  }
</style>
