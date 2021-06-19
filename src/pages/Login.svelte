<script>
    import {auth, User} from "../firebaseAPI";
    import { replace }  from 'svelte-spa-router'
    import { toast } from '@zerodevx/svelte-toast'
import { onDestroy, onMount } from "svelte";
    let src = "./assets/img/bg-login.jpg"
    let correo = ''
    let pass = ''
    function login(){
        console.log('click')
        auth.signInWithEmailAndPassword(correo, pass).then(
            value => {
                toast.push('Exito')
                
            }, reason => {
                toast.push('Correo o Contraseña incorrectos')
            }
        )
    }
    let usr
    onMount(()=>{
        usr = User.subscribe(u=>{
            if(u){
            replace('/')
            }
        })
    
    })
    onDestroy(()=>{
        usr.unsubscribe()
    })
</script>
<section>
    <div class="img-box">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src="img/bg-login.jpg" alt="Photo by Alexander Isreb from Pexels">
    </div>
    <div class="content-box">
        <div class="form-box">
            <h2>Inicio de Sesion</h2>
            <div>
                <div class="input-box">
                    <span>Correo Electronico</span>
                    <input class="inputt" type="email" name="" bind:value={correo}>
                </div>
                <div class="input-box">
                    <span>Contraseña</span>
                    <input class="inputt" type="password" name="" bind:value={pass} >
                </div>
                <div class="input-box" >
                    <button class="button"name="" on:click={login}>Iniciar Sesion</button>
                </div>
            </div>
        </div>
    </div>
</section>
<style>
    section {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
    }
    .img-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .img-box img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .img-box:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(225deg, #e91e63, #03a9f4);
        z-index: 1;
        mix-blend-mode: screen;
    }
    .content-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .form-box {
        width: 30%;
        padding: 4rem;
        background: #ffffff;
        opacity: 0.9;
        margin: fill;
    }
    .form-box h2 {
        color: var(--bgsecondary);
        font-weight: 600;
        font-size: 1.5em;
        margin-bottom: 1.25rem;
        border-bottom: 4px solid var(--bg-primary);
        display: inline-block;
        letter-spacing: 1px;
    }
    .input-box {
        margin-bottom: 1.25rem;
    }
    .input-box span {
        margin-bottom: 5px;
        display: inline-block;
        color: var(--bgsecondary);
        font-weight: 300;
    }
    :global(.inputt) {
        width: 100%;
        padding: 10px  20px;
        outline: none;
        font-weight: 400;
        border: 1px solid var(--bgsecondary);
        color: var(--bgsecondary);
        background: transparent;
        border-radius: 1.5625rem;
        transition: 600ms ease;
    }
    :global(.button) {
        width: 100%;
        padding: 10px  20px;
        outline: none;
        font-weight: 400;
        border: 1px solid var(--bgsecondary);
        color: var(--bgsecondary);
        background: transparent;
        border-radius: 1.5625rem;
        transition: 600ms ease;
    }
    :global(.button:hover) {
        background: var(--bg-primary);
        color: #fff;
        font-weight: 500;
        cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
        .img-box{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .content-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .form-box {
            width: 80%;
            padding: 4rem;
            background: #ffffff;
            opacity: 0.9;
            margin: fill;
        }
    }
</style>
