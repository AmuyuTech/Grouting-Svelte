<script>
  import { onMount } from "svelte";
  import {
    registrarUsuario,
    registerTestUsers,
    actualizarUsuario,
    getUsuario,
  } from "../firebaseAPI";

  export let params = {};
  let disable = false;
  onMount(() => {
    if (params.id !== "New") {
      disable = true
      getUsuario(params.id).then((s) => {
        const u = s.data();
        nombre = u.nombre
        ci = u.ci
        telefono = u.telefono
        correo = u.correo
        repass = u.repass
        tipo = u.tipo
      });
    }
  });
  let nombre = "";
  let ci = "";
  let telefono = "";
  let correo = "";
  let pass = "";
  let repass = "";
  let tipo = "";
 
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
    const data = {
      nombre,
      ci,
      telefono,
      correo,
      pass,
      tipo,
      admin: tipo,
    };
    const payload =
      params.id === "New"
        ? registrarUsuario(data)
        : actualizarUsuario(data, params.id);
    payload.then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace("/Productos");
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

<div class="gridd">
  <div class="nombre">
    <label for="nombre">Nombre</label>
    <input type="text" bind:value={nombre} name="nombre" />
  </div>
  <div class="ci">
    <label for="ci">CI</label>
    <input type="text" bind:value={ci} name="ci" disabled={disable}/>
  </div>
  <div class="telefono">
    <label for="telefono">Telefono</label>
    <input type="text" bind:value={telefono} name="telefono" />
  </div>
  <div class="correo">
    <label for="correo">Correo</label>
    <input type="email" name="correo" bind:value={correo} />
  </div>
  <div class="pass">
    <label for="pass">{disable ? 'Nueva ' : ''}Contraseña</label>
    <input type="password" name="pass" bind:value={pass} />
  </div>
  <div class="repass">
    <label for="repass">Repita {disable ? 'Nueva ' : ''}Contraseña</label>
    <input type="password" name="repass" bind:value={repass} />
  </div>
  <div class="tipo">
    <label>
      <input type="radio" bind:group={tipo} value={"administrador"} />
      Administrador
    </label>
    <label>
      <input type="radio" bind:group={tipo} value={"responsable"} />
      Responsable
    </label>
    <label>
      <input type="radio" bind:group={tipo} value={"vendedor"} />
      Vendedor
    </label>
  </div>
</div>
<div class="row" style="width: 100%; right: 0; bottom: 0;">
 
  <button on:click={registerTestUsers}> REgistrar Todo </button>
  <button class="button" style="margin-left: auto; width: auto;" on:click={aceptar}
    >Aceptar</button
  >
  <button class="button" style="width: auto; margin-left: 1rem;" on:click={cancelar}>Cancelar</button>
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
        "tipo"
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
        "pass pass tipo"
        "repass repass tipo";
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
  .tipo {
    grid-area: tipo;
  }
</style>
