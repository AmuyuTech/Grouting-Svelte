<script>
  import Dropzone from "./../components/Dropzone/Dropzone.svelte";
  import imageCompression from "browser-image-compression";
  import { pop, replace } from "svelte-spa-router";
  import { registerTestProducts, registrarProducto } from "../firebaseAPI";
  import { onMount } from "svelte";
  import { toast } from '@zerodevx/svelte-toast'
  
  export let params = {};
  const IMGBB_KEY = "70fa84e6fd037e5fea9b30d1ab78222a";
  onMount(async () => {
    if (params.id === "new") {
    }
  });
  export let categorias = [];
  export let codigo = "";
  export let codigodebarras = "";
  export let descripcion = "";
  export let descuentoFerreteria = 0;
  export let descuentoObras = 0;
  export let descuentoOficina = 0;
  export let nombre = "";
  export let photourl = "";
  //TODO
  //TODO export let delete_url = "";
  export let precioFerreteria = 0;
  export let precioObras = 0;
  export let precioOficina = 0;
  $:isValid = () => {
    return (
      //categorias.size > 0 &&
      codigo.trim().length() > 0 &&
      nombre.trim().length() > 0 &&
      codigodebarras.trim().length() > 0 &&
      descripcion.trim().length() > 0 &&
      photourl.trim().length() > 0
    );
  }
  function uploadAll(){
    registerTestProducts()
  }
  function aceptar() {
    let data = {
      categorias,
      codigo,
      codigodebarras,
      descripcion,
      descuentoFerreteria,
      descuentoObras,
      descuentoOficina,
      nombre,
      photourl,
      //TODO delete_url,
      precioFerreteria,
      precioObras,
      precioOficina,
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
    registrarProducto(data).then(
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
    pop();
  }
  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    const imageFile = acceptedFiles[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      //const data = await imageCompression.getDataUrlFromFile(compressedFile);
      const formData = new FormData();
      formData.append("image", compressedFile);

      const url = "https://api.imgbb.com/1/upload?key=" + IMGBB_KEY;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      // Update progress (can be used to show progress indicator)
      /* xhr.upload.addEventListener("progress", function (e) {
      updateProgress(i, (e.loaded * 100.0) / e.total || 100);
    }); */
      xhr.addEventListener("readystatechange", function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          //updateProgress(i, 100); // <- Add this
          photourl = JSON.parse(xhr.response).data.display_url;
          console.log({ photourl });
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
          // Error. Inform the user
        }
      });

      xhr.open("POST", url, true);

      xhr.send(formData);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<h1>{params.id === "new" ? "Nuevo Producto" : " Editar Producto"}</h1>
<div class="row">
  <div class="col">
    <div class="input-containerd">
      <label for="nombre">Nombre</label>
      <input type="text" bind:value={nombre} name="nombre" />
    </div>
    <div class="row">
      <div class="input-containerd">
        <label for="codigo">Codigo</label>
        <input type="text" bind:value={codigo} name="codigo" />
      </div>
      <div class="input-containerd">
        <label for="codigodebarras">Codigo de Barras</label>
        <input type="text" bind:value={codigodebarras} name="codigodebarras" />
      </div>
    </div>
    <div class="row">
      <div class="input-containerd">
        <label for="precioFerreteria">Precio Ferreteria</label>
        <input
          type="number"
          bind:value={precioFerreteria}
          name="precioFerreteria"
        />
      </div>
      <div class="input-containerd">
        <label for="precioObras">Precio Obras</label>
        <input type="number" bind:value={precioObras} name="precioObras" />
      </div>
      <div class="input-containerd">
        <label for="precioOficina">Precio Oficina</label>
        <input type="number" bind:value={precioOficina} name="precioOficina" />
      </div>
    </div>
    <div class="row">
      <div class="input-containerd">
        <label for="descuentoFerreteria">Descuento Ferreteria</label>
        <input
          type="number"
          bind:value={descuentoFerreteria}
          name="descuentoFerreteria"
        />
      </div>
      <div class="input-containerd">
        <label for="descuentoObras">Descuento Obras</label>
        <input
          type="number"
          bind:value={descuentoObras}
          name="descuentoObras"
        />
      </div>
      <div class="input-containerd">
        <label for="descuentoOficina">Descuento Oficina</label>
        <input
          type="number"
          bind:value={descuentoOficina}
          name="descuentoOficina"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-containerd">
        <label for="descripcion">Descripcion</label>
        <textarea type="text" bind:value={descripcion} name="descripcion" />
      </div>
    </div>
  </div>
  <div class="file-input">
    <Dropzone
      on:drop={handleFilesSelect}
      containerStyles={photourl.length === 0
        ? ""
        : "background-image: url(" + photourl + ");"}
      multiple={false}
    />
  </div>
</div>

<div class="row" style="width: 100%; right: 0; bottom: 0;">
  <button on:click={uploadAll}>Regitrar Todo</button>
  <button
    class="button"
    style="margin-left: auto;"
    on:click={aceptar}>Aceptar</button
  >
  <button class="button" on:click={cancelar}>Cancelar</button>
</div>

<style>
  :global(.row) {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    margin-top: 1rem;
  }
  :global(.col) {
    flex: 2;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    min-width: 30rem;
  }
  .file-input {
    margin-left: auto;
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  :global(.input-containerd) {
    flex: 1;
    flex-grow: 1;
    margin-left: 2rem;
    position: relative;
    height: auto;
    width: auto;
  }
  .button {
    width: 10rem;
    margin: 1rem;
  }
  input {
    width: 100%;
    padding-left: 1rem;
    border-radius: 0.75rem;
  }
  textarea {
    width: 100%;
    padding-left: 1rem;
    border-radius: 0.75rem;
  }
</style>
