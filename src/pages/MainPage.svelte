<script>
    import Navbar from "../components/Navbar.svelte";
    import Router, { replace } from 'svelte-spa-router'
    import routes from "../routes";
    import { onDestroy, onMount } from "svelte";
import { User } from "../firebaseAPI";
    let prefix = ''
    let usr
    onMount(()=>{
        usr = User.subscribe(u=>{
            if(!u){
            replace('/Login')
            }
        })
    
    })
    onDestroy(()=>{
        usr.unsubscribe()
    })
</script>
<Navbar/>
<main>
    <Router {routes} {prefix}/>
</main>
