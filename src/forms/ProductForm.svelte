<script>
    import Dropzone from "./../components/Dropzone/Dropzone.svelte";
    import imageCompression from "browser-image-compression";
    import {pop, replace} from "svelte-spa-router";
    import {onMount} from "svelte";
    import {toast} from '@zerodevx/svelte-toast'
    import { getContext } from 'svelte';
    import CategoriasSelector from './../components/CategoriasSelector.svelte'
    import {actualizarProveedor, getProducto, registrarProducto, actualizarProducto} from "../controller/firebaseAPI";
import { Producto } from "../models/producto";

    const { open } = getContext('simple-modal');

    let payload = new Producto()
    const onOk = (c) => payload.cats = [...payload.cats, c]
    const showCat = () => {
        open(CategoriasSelector, { onOk });
    };
    export let params = {};
    onMount(async () => {
        if (params.id !== "New") {
            getProducto(params.id).then(d => {
                payload = d
            })
        }
    });


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
        const prom =  params.id === 'New' ? registrarProducto(payload) : actualizarProducto(payload, params.id)
        prom.then(
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
        const {acceptedFiles, fileRejections} = e.detail;
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
            //const data = await imageCompression.getDataUrlFromFile(compressedFile);
            const formData = new FormData();
            formData.append("image", compressedFile);

            const url = "https://api.imgbb.com/1/upload?key=" + process.env.IMGBB_API_KEY;

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
                    payload.url = JSON.parse(xhr.response).data.display_url;
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
            <input type="text" bind:value={payload.name} name="nombre"/>
        </div>
        <div class="row">
            <div class="input-containerd">
                <label for="codigo">Codigo</label>
                <input type="text" bind:value={payload.code} name="codigo"/>
            </div>
            <div class="input-containerd">
                <label for="codigodebarras">Codigo de Barras</label>
                <input type="text" bind:value={payload.barcode} name="codigodebarras"/>
            </div>
        </div>
        <div class="row">
            <div class="input-containerd">
                <label for="precioFactura">Precio Factura</label>
                <input
                        type="number"
                        bind:value={payload.pcf}
                        name="precioFactura"
                />
            </div>
            <div class="input-containerd">
                <label for="preciosinFactura">Precio sin Factura</label>
                <input type="number" bind:value={payload.psf} name="preciosin Factura"/>
            </div>
        </div>
        <div class="row">
            <div class="input-containerd">
                <label for="descuentoFactura">Descuento Factura</label>
                <input
                        type="number"
                        bind:value={payload.dcf}
                        name="descuentoFactura"
                />
            </div>
            <div class="input-containerd">
                <label for="descuentosin Factura">Descuento sin Factura</label>
                <input
                        type="number"
                        bind:value={payload.dsf}
                        name="descuentosin Factura"
                />
            </div>
        </div>
        <div class="row">
            <div class="input-containerd">
                <label for="descripcion">Descripcion</label>
                <textarea bind:value={payload.desc} name="descripcion"></textarea>
            </div>
        </div>
    </div>
    <div class="file-input">
        <Dropzone
                on:drop={handleFilesSelect}
                containerStyles={payload.url.length === 0
        ? ""
        : "background-image: url(" + payload.url + ");"}
                multiple={false}
        />
    </div>
</div>
        Categorias
<div class="row">
    <div>
        <button class="button" style="width: auto;" on:click={showCat}>
            Añadir categoria
        </button>
    </div>
    {#each payload.cats as c, i}
        <div class="chip">
            <div class="chip-head">{c[0]}</div>
            <div class="chip-content">{c}</div>
            <div class="chip-close" on:click={() => {payload.cats.splice(i, 1)}}>
                <svg class="chip-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
            </div>
        </div>
    {/each}
</div>
<div class="row" style="width: 100%; right: 0; bottom: 0;">
    <button
            class="button"
            style="margin-left: auto;"
            on:click={aceptar}>Aceptar
    </button
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

    :global(input) {
        width: 100%;
        padding-left: 1rem;
        border-radius: 0.75rem;
    }

    :global(textarea) {
        width: 100%;
        padding-left: 1rem;
        border-radius: 0.75rem;
    }

    .chip {
        display: inline-flex;
        flex-direction: row;
        background-color: #e5e5e5;
        border: none;
        cursor: default;
        height: 36px;
        outline: none;
        padding: 0;
        font-size: 14px;
        font-color: #333333;
        font-family: "Open Sans", sans-serif;
        white-space: nowrap;
        align-items: center;
        border-radius: 16px;
        vertical-align: middle;
        text-decoration: none;
        justify-content: center;
    }

    .chip-head {
        display: flex;
        position: relative;
        overflow: hidden;
        background-color: #32C5D2;
        font-size: 1.25rem;
        flex-shrink: 0;
        align-items: center;
        user-select: none;
        border-radius: 50%;
        justify-content: center;
        width: 36px;
        color: #fff;
        height: 36px;
        margin-right: -4px;
    }

    .chip-content {
        cursor: inherit;
        display: flex;
        align-items: center;
        user-select: none;
        white-space: nowrap;
        padding-left: 12px;
        padding-right: 12px;
    }

    .chip-svg {
        color: #999999;
        cursor: pointer;
        height: auto;
        margin: 4px 4px 0 -8px;
        fill: currentColor;
        width: 1em;
        height: 1em;
        display: inline-block;
        font-size: 24px;
        transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        user-select: none;
        flex-shrink: 0;
    }

    .chip-svg:hover {
        color: #666666;
    }
</style>
