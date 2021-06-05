<script>
import { registrarCliente } from "../firebaseAPI";
import { toast } from '@zerodevx/svelte-toast'

  export let params = {};
  $: {
    if (params.id === "new") {
    }
  }
  String.prototype.hashCode = function () {
    var hash = 0,
      i,
      chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
  let direccion = "";
  let id = "";
  let nit = "";
  let nombre = "";
  let telefono = "";
  let zona = "";
  let asesor = "";
  function aceptar() {
    let data = {
      direccion,
      id,
      nit,
      nombre,
      telefono,
      zona,
      asesor
    };
    toast.push("Subiendo", {
      initial: 0,
      progress: 0,
      dismissable: false,
      theme: {
        "--toastBackground": "#ffeb3b",
        "--toastProgressBackground": " #f4d03f ",
      },
    });
    registrarCliente(data).then(
      (s) => {
        toast.pop();
        toast.push("Exito!", {
          theme: {
            "--toastBackground": "#48BB78",
            "--toastProgressBackground": "#2F855A",
          },
        });
        replace("/Clientes");
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

<h1>{params.id === "New" ? "Nuevo Cliente" : "Editar Cliente"}</h1>
<div class="gridd">
  <div class="nombre">
    <label for="nombre">Nombre</label><input
      type="text"
      bind:value={nombre}
      id="nombre"
    />
  </div>
  <div class="nit">
    <label for="nit">Nit</label><input type="text" bind:value={nit} id="nit" />
  </div>
  <div class="telefono">
    <label for="telefono">Telefono</label><input
      type="text"
      bind:value={telefono}
      id="telefono"
    />
  </div>
  <div class="asesor">
    <label for="asesor">Asesor</label><input
      type="text"
      bind:value={asesor}
      id="asesor"
    />
  </div>
  <div class="direccion">
    <label for="direccion">Direccion</label><textarea
      type="text"
      bind:value={direccion}
      id="direccion"
    />
  </div>
  <div class="zona">
    <label>
      <input type="radio" bind:group={zona} value={"ea"} />
      El Alto
    </label>
    <label>
      <input type="radio" bind:group={zona} value={"zc"} />
      Zona Centro
    </label>
    <label>
      <input type="radio" bind:group={zona} value={"zs"} />
      Zona Sur
    </label>
    <label>
      <input type="radio" bind:group={zona} value={"or"} />
      Oruro
    </label>
    <label>
      <input type="radio" bind:group={zona} value={"ot"} />
      Otros
    </label>
  </div>
</div>

<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button
    class="button"
    style="margin-left: auto;"
    on:click={aceptar}>Aceptar</button
  >
  <button class="button" on:click={cancelar} style="margin-left: 2rem;">Cancelar</button>
</div>

<style>
  .gridd {
    display: grid;
    gap: 2rem;
  }
  @media only screen and (max-width: 600px) {
    .gridd {
      grid-template-columns: 1fr;
      grid-template-areas:
        "nit"
        "nombre"
        "telefono"
        "asesor"
        "direccion"
        "zona";
    }
  }
  @media only screen and (min-width: 600px) {
    .gridd {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        "nit . ."
        "nombre nombre telefono"
        "asesor asesor zona"
        "direccion direccion zona";
    }
  }
  .nombre {
    grid-area: nombre;
  }
  .nit {
    grid-area: nit;
  }
  .telefono {
    grid-area: telefono;
  }
  .asesor {
    grid-area: asesor;
  }
  .direccion {
    grid-area: direccion;
  }
  .zona {
    grid-area: zona;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  input {
    width: 100%;
    padding-left: 1rem;
    border-radius: 0.75rem;
  }
  label input {
    width: auto;
  }

  textarea {
    width: 100%;
    padding-left: 1rem;
    border-radius: 0.75rem;
  }
  button {
    width: 10rem;
  }
</style>
