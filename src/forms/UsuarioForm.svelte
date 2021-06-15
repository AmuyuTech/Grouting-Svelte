<script>
import { registrarUsuario, registerTestUsers } from "../firebaseAPI";


  let nombre = ''
  let ci = ''
  let telefono = ''
  let correo = ''
  let pass = ''
  let repass = ''
  let almacen = ''
  let administrador = false
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
    registrarUsuario({
      nombre, ci, telefono, correo, pass, almacen, admin: administrador
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
  

</script>

<div class="gridd">
  <div class="nombre" >
    <label for="nombre">Nombre</label>  
    <input type="text" bind:value={nombre} name="nombre">
  </div>
  <div class="ci" >
    <label for ="ci">CI</label>
    <input type="text" bind:value={ci} name="ci">
   </div>
  <div class="telefono" >
    <label for="telefono">Telefono</label>
    <input type="text" bind:value={telefono} name="telefono">
  </div>
  <div class="correo" >
    <label for="correo">Correo</label>
    <input type="email" name="correo" bind:value={correo}>
  </div>
  <div class="pass" >
    <label for="pass">Contraseña</label>
    <input type="password" name="pass" bind:value={pass}>
  </div>
  <div class="repass" >
    <label for="repass">Repita Contraseña</label>
    <input type="password" name="repass" bind:value={repass}>
  </div>
  <div class="almacen" >
    <label>
      <input type="radio" bind:group={almacen} value={"elalto"} />
      Almacen El Alto
    </label>
    <label>
      <input type="radio" bind:group={almacen} value={"sopocachi"} />
      Almacen Sopocachi
    </label>
    <label>
      <input type="radio" bind:group={almacen} value={"zonasur"} />
      Almacen Zona Sur
    </label>
  </div>
</div>
<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <label>
    <input type="checkbox" bind:value={administrador}>
  </label>
  <button on:click={registerTestUsers}>
    REgistrar Todo
  </button>
  <button
    class="button"
    style="margin-left: auto;"
    on:click={aceptar}>Aceptar</button
  >
  <button class="button" on:click={cancelar}>Cancelar</button>
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
